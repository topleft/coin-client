import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
// components
import { FullPageForm } from '../../layouts/FullPageForm'
// appearance
import Radium from 'radium'

export class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }
  }

  // no need to e.preventDefault b/c event is on button onClick
  // not form onSubmit (button type)
  handleSubmit() {
    const user = {
      username: this.state.username,
      password: this.state.password
    }
    let data = new FormData(JSON.stringify({user}));
    data.append('json', JSON.stringify({user}));

    fetch('/auth/login', {
      method: 'post',
      credentials: 'include', //pass cookies, for authentication
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user})
    })
    .then((res) => {
      // not catching an err
      res.json().then( json => {
        console.log('res', json)
        localStorage.setItem('token', json.token);
      })
    })
    .catch((err) => {
      console.log('fetch err', err)
      return false
    })

    this.setState({
      username: '',
      password: ''
    })
  }

  getInputs() {
    return [
      {
        key: 1,
        value: this.state.username,
        type: 'text',
        placeholder: 'username',
        onChange: (e) => this.setState({username: e.target.value})
      },
      {
        key: 2,
        value: this.state.password,
        type: 'password',
        placeholder: 'password',
        onChange: (e) => this.setState({password: e.target.value})
      }
    ]
  }

  render() {
    const containerStyle = {
      width: '50%',
      marginTop: '20px',
      marginLeft: 'auto',
      marginRight: 'auto'
    }

    return(
      <div style={ containerStyle }>
        <FullPageForm
          header='Login'
          onSubmit={ this.handleSubmit.bind(this) }
          inputs={ this.getInputs() }
        />
      </div>
    )
  }
}

Login = Radium(Login)
