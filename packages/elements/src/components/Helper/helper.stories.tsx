import React from 'react'
import { storiesOf } from '@storybook/react'
import { Helper } from './index'

storiesOf('Helper', module)
  .add('Info', () => <Helper variant="info">Helper variant info</Helper>)
  .add('Warning', () => <Helper variant="warning">Helper variant warning</Helper>)
  .add('With close button', () => (
    <Helper variant="info" closeButton={true} onCloseClick={() => console.log('clicked')}>
      Helper with closeButton
    </Helper>
  ))
