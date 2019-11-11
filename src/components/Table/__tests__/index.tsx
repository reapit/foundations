import * as React from 'react'
import { shallow } from 'enzyme'
import { Table } from '../index'
import toJson from 'enzyme-to-json'

describe('Table', () => {
  it('should match a snapshot when LOADING false', () => {
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
    expect(toJson(shallow(<Table data={data} columns={columns} loading={false} />))).toMatchSnapshot()
  })
  it('should match a snapshot when LOADING true', () => {
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
    expect(toJson(shallow(<Table data={data} columns={columns} loading />))).toMatchSnapshot()
  })
  it('should match a snapshot when table is scrollable', () => {
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
    expect(toJson(shallow(<Table scrollable data={data} columns={columns} loading={false} />))).toMatchSnapshot()
  })
})
