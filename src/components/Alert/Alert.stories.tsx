import React from 'react'
import { storiesOf } from '@storybook/react'
import { Alert } from './index'

storiesOf('Alert', module)
  .add('success', () => <Alert message="success" type="success" />)
  .add('primary', () => <Alert message="primary" type="primary" />)
  .add('info', () => <Alert message="info" type="info" />)
  .add('danger', () => <Alert message="danger" type="danger" />)
