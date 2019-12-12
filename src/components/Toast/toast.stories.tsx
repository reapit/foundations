import React, { useState } from 'react'

import { storiesOf } from '@storybook/react'
import { Toast } from '.'
import { Button } from '../Button'

const DEFAULT_SERVER_ERROR = {
  type: 'SERVER',
  message: 'Something went wrong fetching data'
}
const DEFAULT_COMPONENT_ERROR = {
  type: 'COMPONENT',
  message: 'Something went wrong with this component'
}

const stories = storiesOf('Toast', module)

const Usage = () => {
  const [serverError, setErrorServer] = useState<any>()
  const [componentError, setErrorComponent] = useState<any>()

  const errorClearedComponent = () => {
    setErrorComponent(undefined)
  }

  const errorClearedServer = () => {
    setErrorServer(undefined)
  }

  return (
    <section className="section">
      <Button variant="primary" type="button" onClick={() => setErrorServer(DEFAULT_SERVER_ERROR)}>
        Toast error server
      </Button>
      <br />
      <br />
      <Button variant="primary" type="button" onClick={() => setErrorComponent(DEFAULT_COMPONENT_ERROR)}>
        Toast error component
      </Button>
      <Toast
        componentError={componentError}
        serverError={serverError}
        errorClearedComponent={errorClearedComponent}
        errorClearedServer={errorClearedServer}
      />
    </section>
  )
}

stories
  .add('Error', () => <Usage />)
  .add('Info', () => (
    <Toast
      componentError={{
        type: 'INFO',
        message: 'success'
      }}
      serverError={null}
      errorClearedComponent={() => {
        // do some stuff
      }}
      errorClearedServer={() => {
        // do some stuff
      }}
    />
  ))
