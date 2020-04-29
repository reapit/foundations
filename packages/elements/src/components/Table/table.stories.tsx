import React from 'react'
import { Table } from '.'
import { storiesOf } from '@storybook/react'

interface Person {
  firstName: string
  middleName: string
  lastName: string
  subRows?: Person[]
}

export const randomChar = () => {
  let r = Math.random()
    .toString(36)
    .substring(7)
  return r
}

export const newPerson = (): Person => {
  return {
    firstName: randomChar(),
    middleName: randomChar(),
    lastName: randomChar(),
  }
}

export const makeData = (length: number) => {
  const data: Person[] = []
  for (let i = 0; i < length; i++) {
    const person = newPerson()
    data.push(person)
  }
  return data
}

export const makeDataWithSubRows = (length: number) => {
  const data: Person[] = []
  for (let i = 0; i < length; i++) {
    const person = newPerson()
    const familyMembers: Person[] = []
    for (let j = 0; j < length / 2; j++) {
      const member = newPerson()
      familyMembers.push(member)
    }
    person.subRows = familyMembers
    data.push(person)
  }

  return data
}

storiesOf('Table', module).add('Primary', () => {
  const data = makeData(10)
  const columns = [
    {
      Header: 'First Name',
      accessor: 'firstName',
    },
    {
      Header: 'Middle Name',
      accessor: 'middleName',
    },
    {
      Header: 'Last Name',
      accessor: 'lastName',
    },
  ]

  return <Table columns={columns} data={data} loading={false} />
})

storiesOf('Table', module).add('Responsive', () => {
  const data = makeData(10)
  const columns = [
    {
      Header: 'First Name',
      accessor: 'firstName',
    },
    {
      Header: 'Middle Name',
      accessor: 'middleName',
    },
    {
      Header: 'Last Name',
      accessor: 'lastName',
    },
  ]

  return <Table scrollable columns={columns} data={data} loading={false} />
})

storiesOf('Table', module).add('IsLoading', () => {
  const data = makeData(10)
  const columns = [
    {
      Header: 'First Name',
      accessor: 'firstName',
    },
    {
      Header: 'Middle Name',
      accessor: 'middleName',
    },
    {
      Header: 'Last Name',
      accessor: 'lastName',
    },
  ]

  return <Table columns={columns} data={data} loading />
})

storiesOf('Table', module).add('Expandable Rows', () => {
  const data = makeDataWithSubRows(10)
  const columns = [
    {
      Header: 'First Name',
      accessor: 'firstName',
    },
    {
      Header: 'Middle Name',
      accessor: 'middleName',
    },
    {
      Header: 'Last Name',
      accessor: 'lastName',
    },
  ]

  return <Table expandable columns={columns} data={data} />
})
