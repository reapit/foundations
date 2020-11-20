import React, { useState } from 'react'

import { storiesOf } from '@storybook/react'
import { ErrorData, Toast } from '.'
import { Button } from '../Button'
import { Section } from '@/components/Layout'

const DEFAULT_SERVER_ERROR = {
  type: 'SERVER',
  message: 'Something went wrong fetching data',
} as ErrorData
const DEFAULT_COMPONENT_ERROR = {
  type: 'COMPONENT',
  message: 'Something went wrong with this component',
} as ErrorData

const stories = storiesOf('Toast', module)

const Usage = () => {
  const [serverError, setErrorServer] = useState<ErrorData | null>(null)
  const [componentError, setErrorComponent] = useState<ErrorData | null>(null)

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
