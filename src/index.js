import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import './index.css';

// import AppLayout from './layouts/AppLayout'
import { Login } from './components/login/Login'
import { Register } from './components/register/Register'
import { CurrentUser } from './components/currentUser/CurrentUser'


// material-ui requires the importing of a theme

// needed for touch devices
// import injectTapEventPlugin from 'react-tap-event-plugin'

// // init the touch event handler
// injectTapEventPlugin()

// ok for this to be stateless
const AppLayout = () => {

  return (
    <MuiThemeProvider >
      <div>
        <div className="container">
          <Switch>
            <Route path='/login' component={ Login }/>
            <Route path='/register' component={ Register }/>
            <Route path='/current_user' component={ CurrentUser }/>
            <Route path='*' component={ Login }/>
          </Switch>
        </div>
      </div>
    </MuiThemeProvider>
  )
}



ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route path='/' component={ AppLayout }/>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);
