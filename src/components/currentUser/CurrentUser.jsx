import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
// components
import RaisedButton from 'material-ui/RaisedButton'

// appearance
import Radium from 'radium'

export class CurrentUser extends Component {
  constructor(props) {
    super(props)

    this.state = {
      message: '',
      username: '',
      userId: '',
    }
  }

  handleClick() {
    let token = localStorage.getItem('token')

    if (token) {
      fetch('/auth/current_user', {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      .then((res) => {
        res.json().then( (json) => {
          this.setState({
            message: 'You have a valid token in local storage',
            username: json.data.username,
            userId: json.data._id
          })
        })
      })
      .catch((err) => {console.log('fetch err:', err);})
    } else {
      this.setState({message: 'You must log in first'})
    }
  }

  render() {
    const containerStyle = {
      width: '50%',
      marginTop: '50px',
      marginLeft: 'auto',
      marginRight: 'auto'
    }

    let userInfo = null;
    if (this.state.username) {
      userInfo = <div>
          <h3>username: {this.state.username}</h3>
          <h3>User Id: {this.state.userId}</h3>
        </div>
    } else {

    }

    return (
      <div style={containerStyle}>
        <RaisedButton onClick={ this.handleClick.bind(this) }>Get Current User</RaisedButton>
        <div><h3>{ this.state.message }</h3></div>
        <div>{ userInfo }</div>
      </div>
    )
  }

};
