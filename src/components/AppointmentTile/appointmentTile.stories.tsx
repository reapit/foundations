import React from 'react'
import { storiesOf } from '@storybook/react'
import { AppointmentTile } from '.'

storiesOf('AppointmentTile', module).add('Primary', () => (
  <AppointmentTile
    address="Address"
    city="City"
    country="Country"
    postalCode="PostalCode"
    contactPerson="contactPerson"
  />
))
