import React, { Component } from 'react'

// components
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton'

// appearance
import Radium from 'radium'

export class CurrencyCard extends Component {

  render() {

      const headerStyle = {
        float: 'left',
        width: '50%',
        marginTop: '20px',
        marginLeft: '20px'
      }

      const cardStyle = {
        fontSize: '15px'
      }

      return (
        <Card>
          <CardHeader
            title={this.props.currencyCode}
            subtitle={this.props.name}
            avatar={`/images/${this.props.currencyCode}.jpg`}
            style={headerStyle}
          />
          <CardText style={cardStyle}>
            <p>
              USD: {(this.props.USDValueInPennies / 100).toFixed(2)}
            </p>
            <p>
              Source: {this.props.source}
            </p>
          </CardText>
        </Card>
      );

    }

}

CurrencyCard = Radium(CurrencyCard)
