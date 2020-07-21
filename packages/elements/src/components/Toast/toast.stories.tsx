import React, { useState } from 'react'

import { storiesOf } from '@storybook/react'
import { Toast } from '.'
import { Button } from '../Button'
import { Section } from '@/components/Layout'

const DEFAULT_SERVER_ERROR = {
  type: 'SERVER',
  message: 'Something went wrong fetching data',
}
const DEFAULT_COMPONENT_ERROR = {
  type: 'COMPONENT',
  message: 'Something went wrong with this component',
}

const stories = storiesOf('Toast', module)

const Usage = () => {
  const [serverError, setErrorServer] = useState()
  const [componentError, setErrorComponent] = useState()

  const errorClearedComponent = () => {
    setErrorComponent(null)
  }

  const errorClearedServer = () => {
    setErrorServer(null)
  }

  return (
    <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
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
    </Section>
  )
}

stories.add('Error', () => <Usage />)
