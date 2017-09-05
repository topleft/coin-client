import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import fetch from 'isomorphic-fetch';

import './index.css';

import { Login } from './components/login/Login'
import { Register } from './components/register/Register'
import { CurrentUser } from './components/currentUser/CurrentUser'
import { GetLowestRate } from './components/getLowestRate/GetLowestRate'
import { FullPageLoading } from './layouts/FullPageLoading'

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
    .catch(console.err)

  }

  checkAuthenticated(component) {
    let token = localStorage.getItem('token')
    return new Promise((resolve, reject) => {
      if (token) {
        fetch('/auth/current_user', {
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
          console.log('fetch err:', err);
          reject(err)
        })
      } else {
        resolve(false)
      }
    })
  }

  register(user) {
    return new Promise((resolve, reject) => {
      fetch('/auth/register', {
        method: 'post',
        credentials: 'include', //pass cookies, for authentication
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({user})
      })
      .then((res) => {
        res.json().then( (json) => {
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
        console.log('fetch err:', err);
        reject('We encoutered an error while registering your user.')
      })
    })
  }

  login(user) {

    return new Promise((resolve, reject) => {

      fetch('/auth/login', {
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
          this.props.history.push('/current_user');
          resolve(true)
        } else {
          resolve(false)
        }
      })
      .catch((err) => {
        console.log('fetch err', err)
        reject(false)
      })

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
    return (
      <MuiThemeProvider >
        <div>
          <div className="container">
            {this.renderApp()}
          </div>
        </div>
      </MuiThemeProvider>
    )
  }

}

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route path='/' component={ AppLayout }/>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);
