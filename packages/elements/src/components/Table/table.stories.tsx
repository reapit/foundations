import React from 'react'
import { Table, TableProps } from '.'
import { Story } from '@storybook/react/types-6-0'

interface Person {
  firstName: string
  middleName: string
  lastName: string
  subRows?: Person[]
}

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

const randomChar = () => {
  const r = Math.random().toString(36).substring(7)
  return r
}

const newPerson = (): Person => {
  return {
    firstName: randomChar(),
    middleName: randomChar(),
    lastName: randomChar(),
  }
}

const makeData = (length: number) => {
  const data: Person[] = []
  for (let i = 0; i < length; i++) {
    const person = newPerson()
    data.push(person)
  }
  return data
}

const makeDataWithSubRows = (length: number) => {
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

export default {
  title: 'Components/Table',
  component: Table,
}

export const Primary: Story<TableProps> = (args) => <Table {...args} />
Primary.args = {
  columns,
  data: makeData(10),
  loading: false,
}

export const IsLoading: Story<TableProps> = (args) => <Table {...args} />
IsLoading.args = {
  columns,
  data: makeData(10),
  loading: true,
}

export const ExpandableRows: Story<TableProps> = (args) => <Table {...args} />
ExpandableRows.args = {
  columns,
  data: makeDataWithSubRows(10),
  loading: false,
  expandable: true,
}
