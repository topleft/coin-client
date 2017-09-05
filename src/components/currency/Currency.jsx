import React, { Component } from 'react';

import Radium from 'radium'

export class Currency extends Component {

  render() {
    const containerStyle = {
      width: '50%',
      marginTop: '50px',
      marginLeft: 'auto',
      marginRight: 'auto'
    }

    return (
      <div style={containerStyle}>
        <div><h3>{this.props.name}</h3></div>
        <div><h3>{this.props.USDValueInPennies / 100}</h3></div>
        <div><h3>{this.props.source}</h3></div>
      </div>
    )
  }
};

Currency = Radium(Currency)
