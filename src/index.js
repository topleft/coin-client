import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import fetch from 'isomorphic-fetch';
import { Provider } from 'react-redux'
import Snackbar from 'material-ui/Snackbar'

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as errorActions from './actions/errorActions';
// console.log('errorActions', errorActions)

import './index.css';

import Login from './components/login/Login'
import { Register } from './components/register/Register'
import { CurrentUser } from './components/currentUser/CurrentUser'
import { GetLowestRate } from './components/getLowestRate/GetLowestRate'
import { FullPageLoading } from './layouts/FullPageLoading'
import { CustomToolbar } from './layouts/CustomToolbar'

import configureStore from './store/configureStore';
const store = configureStore();

class AppLayout extends Component {

  constructor(props) {

    super(props)
    this.state = {}

    this.checkAuthenticated()
    .then((result) => {
      this.setState({
        isAuthenticated: result
      })
      if (result) this.props.history.push('/get_lowest_rate')
    })
    .catch(console.error)

  }

  checkAuthenticated(component) {

    let token = localStorage.getItem('token')

    return new Promise((resolve, reject) => {

      if (!token) {
        resolve(false)
      } else {
        fetch('/api/auth/current_user', {
          method: 'get',
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })
        .then((res) => {
          return res.status === 200 ? res.json() : resolve(false)
        })
        .then( (json) => {
          if (json.data._id) resolve(true)
        })
        .catch((err) => {
          reject(err)
        })
      }

    })

  }

  register(user) {

    return new Promise((resolve, reject) => {

      fetch('/api/auth/register', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({user})
      })
      .then((res) => {
        res.json()
        .then((json) => {
          if (res.status === 200 && json.token) {
            this.setState({isAuthenticated: true})
            localStorage.setItem('token', json.token);
            this.props.history.push('/get_lowest_rate')
            resolve(true)
          } else {
            reject(json.message)
          }
        })
      })
      .catch((err) => {
        console.error(err);
        reject('We encoutered an error while registering your user.')
      })

    })

  }

  login(user) {

    return new Promise((resolve, reject) => {

      fetch('/api/auth/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({user})
      })
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        if (json.token) {
          localStorage.setItem('token', json.token)
          this.setState({isAuthenticated: true})
          this.props.history.push('/get_lowest_rate');
          resolve(true)
        } else {
          reject(false)
        }
      })
      .catch((err) => {
        console.error(err)
        reject(false)
      })

    })

  }

  logout() {

    localStorage.clear()
    this.setState({
      isAuthenticated: false
    })

  }

  loginComponent(props) {

    return (
      <Login
        handleSubmit={this.login.bind(this)}
        {...props}
      />
    )

  }

  registerComponent(props) {

    return (
      <Register
        handleSubmit={this.register.bind(this)}
        {...props}
      />
    )

  }

  renderApp() {

    const isAuthenticated = this.state.isAuthenticated

    const app = (
      <Switch>
        <Route path='/login' render={ this.loginComponent.bind(this) }/>
        <Route path='/register' render={ this.registerComponent.bind(this) }/>
        <Route path='/current_user' render={ () => this.state.isAuthenticated ? <CurrentUser/> : <Redirect to='/login'/> }/>
        <Route path='/get_lowest_rate' render={ () => this.state.isAuthenticated ? <GetLowestRate/> : <Redirect to='/login'/> }/>
        <Route path='*' render={ this.loginComponent.bind(this) }/>
      </Switch>
    )

    const loading = (<FullPageLoading/>)

    return isAuthenticated === undefined ? loading : app
  }

  
  render () {
    
    const errSnackBarStyle = {
      backgroundColor: 'red'
    }
  
    const errSnackBarContentStyle = {
      color: 'white'
    }
    
    return (
      <MuiThemeProvider>
        <div>
          <div className="container">
            <CustomToolbar logout={this.logout.bind(this)} isAuthenticated={this.state.isAuthenticated}/>
            {this.renderApp()}
            <Snackbar
              open={this.props.error.isOpen}
              message={this.props.error.errMsg}
              autoHideDuration={4000}
              bodyStyle={errSnackBarStyle}
              contentStyle={errSnackBarContentStyle}
              onRequestClose={this.props.errorActions.resetError.bind(this)}
            />
          </div>
        </div>
      </MuiThemeProvider>
    )

  }

}

function mapStateToProps(state) {
  return {
    error: state.error
  };
}
function mapDispatchToProps(dispatch) {
  return {
    errorActions: bindActionCreators(errorActions, dispatch)
  };
}

AppLayout = connect(  
  mapStateToProps,
  mapDispatchToProps
)(AppLayout)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route path='/' component={ AppLayout }/>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

