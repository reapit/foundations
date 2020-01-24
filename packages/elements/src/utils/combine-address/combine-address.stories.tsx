import React from 'react'

import { storiesOf } from '@storybook/react'
import { combineAddress } from './combine-address'

export const address = {
  type: 'primary',
  buildingName: 'Tilbrook Farm',
  buildingNumber: '',
  line1: 'Station Road',
  line2: 'Bow Brickhill',
  line3: 'Milton Keynes',
  line4: 'Buckinghamshire',
  postcode: 'MK17 9JU'
}

storiesOf('CombineAddress', module).add(
  'Primary',
  () => {
    return <div>Result: {combineAddress(address)}</div>
  },
  { notes: 'Funtion combine address' }
)
