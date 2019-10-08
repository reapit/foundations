import React from 'react'
import { storiesOf } from '@storybook/react'
import { Alert } from './index'

storiesOf('Alert', module)
  .add('Success', () => <Alert message="success" type="success" />)
  .add('Primary', () => <Alert message="primary" type="primary" />)
  .add('Info', () => <Alert message="info" type="info" />)
  .add('Danger', () => <Alert message="danger" type="danger" />)
