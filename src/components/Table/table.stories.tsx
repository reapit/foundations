import React from 'react'
import { makeData } from './make-data'
import { Table } from '.'
import { storiesOf } from '@storybook/react'

storiesOf('Table', module).add('Primary', () => {
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

  return <Table columns={columns} data={data} loading={false} />
})

storiesOf('Table', module).add('Responsive', () => {
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

  return <Table scrollable columns={columns} data={data} loading={false} />
})

storiesOf('Table', module).add('IsLoading', () => {
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

  return <Table columns={columns} data={data} loading />
})
