import React from 'react'
import { storiesOf } from '@storybook/react'
import { Spreadsheet } from './index'

const data = [
  [
    {
      readOnly: true,
      component: <div>adad</div>,
      forceComponent: true,
      value: 'Office Name'
    },
    { readOnly: true, value: 'Building Name' },
    { readOnly: true, value: 'Building No.' },
    { readOnly: true, value: 'Address 1' },
    { readOnly: true, value: 'Address 2' },
    { readOnly: true, value: 'Address 3' },
    { readOnly: true, value: 'Address 4' },
    { readOnly: true, value: 'Post Code' },
    { readOnly: true, value: 'Telephone' },
    { readOnly: true, value: 'Fax' },
    { readOnly: true, value: 'Email' }
  ],
  [
    {
      value: '',
      component: <div>adad</div>,
      forceComponent: true
    },
    { value: 'Building Name' },
    { value: 'Building No.' },
    { value: 'Address 1' },
    { value: 'Address 2' },
    { value: 'Address 3' },
    { value: 'Address 4' },
    { value: 'Post Code' },
    { value: 'Telephone' },
    { value: 'Fax' },
    { value: 'Email' }
  ]
]
const SpreadSheetBasic = () => {
  return (
    <Spreadsheet
      data={data}
      description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
    />
  )
}

storiesOf('Spreadsheet', module).add('Spreadsheet', SpreadSheetBasic)
