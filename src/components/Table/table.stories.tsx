import React from 'react'
import { makeData } from './makeData'
import { Table } from '.'
import { storiesOf } from '@storybook/react'

storiesOf('Table', module).add('Normal Table', () => {
  const data = makeData(10)
  const columns = [
    {
      Header: 'First Name',
      accessor: 'firstName'
    },
    {
      Header: 'Middle Name',
      accessor: 'middleName'
    },
    {
      Header: 'Last Name',
      accessor: 'lastName'
    }
  ]

  return <Table columns={columns} data={data} />
})
