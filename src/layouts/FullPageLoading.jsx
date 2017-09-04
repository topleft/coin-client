import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import { colors } from '../colors'

export const FullPageLoading = () => {
  const flexContainer = {
    display: 'flex',
    alignItems: 'center',
    height: '100vh'
  }

  const containerStyle = {
    margin: 'auto',
    width: '60px'
  }

  return (
    <div style={ flexContainer }>
      <div style={ containerStyle }>
        <CircularProgress
          color={ colors.blue }
          size={ 60 }
          thickness={ 7 }
        />
      </div>
    </div>
  )
}
