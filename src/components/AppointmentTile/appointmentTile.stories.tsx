import React from 'react'
import { storiesOf } from '@storybook/react'
import { AppointmentTile } from '.'

storiesOf('AppointmentTile', module).add('Primary', () => (
  <AppointmentTile heading="Title">
    <div>City</div>
    <div>Country</div>
    <div>PostalCode</div>
    <div>contactPerson</div>
  </AppointmentTile>
))

storiesOf('AppointmentTile', module).add('Hightlight', () => (
  <AppointmentTile hightlight heading="Title">
    <div>City</div>
    <div>Country</div>
    <div>PostalCode</div>
    <div>contactPerson</div>
  </AppointmentTile>
))
