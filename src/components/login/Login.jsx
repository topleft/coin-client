import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as errorActions from '../../actions/errorActions';

import { FullPageForm } from '../../layouts/FullPageForm';

import Radium from 'radium';

class Login extends Component {

  constructor(props) {

    super(props)

    this.state = {
      username: '',
      password: ''
    }

  }

  handleSubmit() {

    const user = {
      username: this.state.username,
      password: this.state.password
    }

    this.props.handleSubmit(user)
    .catch((err) => {
      this.props.errorActions.setError('Login Failed');
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

// DO I NEED PROPTYPES? 
// stuffList.propTypes = {
//   stuffActions: PropTypes.object,
//   stuffs: PropTypes.array
// };

function mapStateToProps(state) {
  return {
    stuffs: state.error
  };
}
function mapDispatchToProps(dispatch) {
  return {
    errorActions: bindActionCreators(errorActions, dispatch)
  };
}

Login = Radium(Login)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
