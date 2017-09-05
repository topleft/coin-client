import React, { Component } from 'react'

// components
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton'

// appearance
import Radium from 'radium'

export class CustomToolbar extends Component {

  handleLogout() {

    this.props.logout();

  }

  renderButtons() {

    let buttons;
    let isAuthenticated = this.props.isAuthenticated

    isAuthenticated ?
    buttons = (
      <div>
        <FlatButton label="Rates" primary={true} href="/get_lowest_rate"/>
        <FlatButton label="Logout" primary={true} onClick={this.handleLogout.bind(this)}/>
      </div>
    )
    :
    buttons = (
      <div>
        <FlatButton label="Rates" primary={true} href="/get_lowest_rate"/>
        <FlatButton label="Login" primary={true} href="/login"/>
        <FlatButton label="Register" primary={true} href="/register"/>
      </div>
    )

    return buttons

  }

  render() {

      return (
        <Toolbar>
          <ToolbarTitle text="Coin" />
          <ToolbarGroup firstChild={true}>
            {this.renderButtons()}
          </ToolbarGroup>
        </Toolbar>
      );

    }

}

CustomToolbar = Radium(CustomToolbar)
