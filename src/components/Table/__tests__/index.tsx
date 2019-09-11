import * as React from 'react'
import { shallow } from 'enzyme'
import { Table } from '../index'
import toJson from 'enzyme-to-json'
import { makeData } from '../makeData'

describe('Table', () => {
  it('should match a snapshot', () => {
    const data = [{ firstName: 'a', middleName: 'b', lastName: 'c' }]
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
    expect(toJson(shallow(<Table data={data} columns={columns} />))).toMatchSnapshot()
  })
})
