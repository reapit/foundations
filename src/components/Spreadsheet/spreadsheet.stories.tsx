import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { Spreadsheet } from './index'

const SpreadSheetBasic = () => {
  const [data, setData] = useState([
    [
      { readOnly: true, value: '' },
      { value: 'A', readOnly: true },
      { value: 'B', readOnly: true },
      { value: 'C', readOnly: true },
      { value: 'D', readOnly: true }
    ],
    [{ readOnly: true, value: '1' }, { value: '1' }, { value: '3' }, { value: '3' }, { value: '3' }],
    [{ readOnly: true, value: '2' }, { value: '2' }, { value: '4' }, { value: '4' }, { value: '4' }],
    [{ readOnly: true, value: '3' }, { value: '1' }, { value: '3' }, { value: '3' }, { value: '3' }],
    [{ readOnly: true, value: '4' }, { value: '2' }, { value: '4' }, { value: '4' }, { value: '4' }]
  ])
  return (
    <Spreadsheet
      data={data}
      valueRenderer={cell => cell.value}
      overflow="wrap"
      onCellsChanged={changes => {
        setData(prev => {
          const newData = prev.map(row => [...row])
          changes.forEach(({ row, col, value }) => {
            newData[row][col] = { ...newData[row][col], value: value as string }
          })
          return newData
        })
      }}
    />
  )
}

storiesOf('Spreadsheet', module).add('Spreadsheet', SpreadSheetBasic)
