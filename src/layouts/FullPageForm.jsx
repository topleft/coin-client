import React, { Component } from 'react'
// components
import { TextField, SelectField, MenuItem } from 'material-ui'
import RaisedButton from 'material-ui/RaisedButton'
// appearance
import Radium from 'radium'
import { colors } from '../colors'

export class FullPageForm extends Component {

  renderInputs() {

    const floatingLabelShrinkStyle = {
      color: colors.blue
    }

    const underlineFocusStyle = {
      borderColor: colors.blue
    }

    return this.props.inputs.map((input) => {

      let field;

      switch (input.type) {
        case 'text':
        case 'password':
          field = (
            <TextField
              key={ input.key }
              onChange={ input.onChange }
              value={ input.value }
              type={ input.type }
              floatingLabelText={ input.placeholder }
              floatingLabelShrinkStyle={ floatingLabelShrinkStyle }
              underlineFocusStyle={ underlineFocusStyle }
              fullWidth={ true }
            />
          )
          break
        case 'select':
        default:
          input.options = input.options || []
          let options = input.options.map((option, i) =>
            <MenuItem key={ i } value={ option } primaryText={ option } />
          )
          field = (
            <SelectField
              key={ input.key }
              onChange={ input.onChange }
              value={ input.value }
              type={ input.type }
              floatingLabelText={ input.placeholder }
              floatingLabelShrinkStyle={ floatingLabelShrinkStyle }
              underlineFocusStyle={ underlineFocusStyle }
              fullWidth={ true }
            >
              {options}
            </SelectField>
          )
          break
        }

        return field

      })
      
    }

  submitForm() {

    this.props.onSubmit()

  }

  render() {

    const submitStyle = {
      marginTop: '20px',
    }

    return (
      <div>
        <h1>{ this.props.header }</h1>
        <form>
          { this.renderInputs() }
          <div>
            <RaisedButton
              label='Submit'
              style={ submitStyle }
              fullWidth={ true }
              onClick={ this.submitForm.bind(this) }
            />
          </div>
        </form>
      </div>
    )

  }

}

FullPageForm = Radium(FullPageForm)
