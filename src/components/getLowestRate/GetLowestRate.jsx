import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'
// components
import { FullPageForm } from '../../layouts/FullPageForm'
import { Currency } from '../currency/Currency'
import Snackbar from 'material-ui/Snackbar'
// appearance
import Radium from 'radium'


export class GetLowestRate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currencies: [],
      isOpen: false,
      errMsg: ''
    }
  }

  getInputs() {
    return [
      {
        key: 1,
        value: this.state.currencyCode,
        type: 'select',
        options: ['ETH', 'LTC', 'DASH', 'BTC'],
        placeholder: 'Currency',
        onChange: (event, index, value) => this.setState({currencyCode: value})
      }
    ]
  }

  handleSubmit() {
    const currencyCode = this.state.currencyCode
    let token = localStorage.getItem('token')

    fetch(`/currency/getLowestRate/${currencyCode}`, {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((res) => {
      return res.json()
    })
    .then((json) => {
      this.setState({currencies: json.data})
    })
    .catch((err) => {console.log('fetch err:', err);})

    this.setState({
      currencyCode: null,
    })
  }

  resetSnackBar() {
    this.setState({
      isOpen: false,
      errMsg: ''
    })
  }

  renderCurrencies() {
    if (this.state.currencies.length) {
      let currencies = this.state.currencies.map((c, i) =>
        <Currency
          key={ i }
          name={c.name}
          USDValueInPennies={c.USDValueInPennies}
          source={c.source}
        />
      )
      return currencies
    }
  }

  render() {
    const containerStyle = {
      width: '50%',
      marginTop: '40px',
      marginLeft: 'auto',
      marginRight: 'auto'
    }

    const errSnackBarStyle = {
      backgroundColor: 'red'
    }

    const errSnackBarContentStyle = {
      color: 'white'
    }

    return (
      <div style={ containerStyle }>
        <FullPageForm
          header='Get Lowest Rate'
          onSubmit={ this.handleSubmit.bind(this) }
          inputs={ this.getInputs() }
        />
        <Snackbar
          open={ this.state.isOpen }
          message={ this.state.errMsg }
          autoHideDuration={ 4000 }
          bodyStyle={ errSnackBarStyle }
          contentStyle={ errSnackBarContentStyle }
          onRequestClose={ this.resetSnackBar.bind(this) }
        />
        {this.renderCurrencies()}
      </div>
    )
  }
}

GetLowestRate = Radium(GetLowestRate)
