import React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { combineAddress } from './combine-address'

export default {
  title: 'Utils/CombineAddress',
  component: <div />,
}

export const Usage: Story = args => {
  return <div>{combineAddress(args)}</div>
}
Usage.args = {
  type: 'primary',
  buildingName: 'Tilbrook Farm',
  buildingNumber: '',
  line1: 'Station Road',
  line2: 'Bow Brickhill',
  line3: 'Milton Keynes',
  line4: 'Buckinghamshire',
  postcode: 'MK17 9JU',
}
