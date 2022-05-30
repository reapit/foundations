import * as React from 'react'
import { render } from '../../../tests/react-testing'
import { Table, expanderColumn, addExpandableColumnToColumnsIfExpandableIsTrue } from '../index'
import toJson from 'enzyme-to-json'

describe('Table', () => {
  describe('addExpandableColumnToColumnsIfExpandableIsTrue', () => {
    it('should return new columns with expanderColumn if expandable is true', () => {
      expect(
        addExpandableColumnToColumnsIfExpandableIsTrue({
          columns: [],
          expandable: true,
        }),
      ).toEqual([expanderColumn])
    })
    it('should return original columns if expandable is false', () => {
      expect(
        addExpandableColumnToColumnsIfExpandableIsTrue({
          columns: [],
          expandable: false,
        }),
      ).toEqual([])
    })
  })
  it('should match a snapshot when LOADING false', () => {
    const data = [{ firstName: 'a', middleName: 'b', lastName: 'c' }]
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
    expect(toJson(render(<Table data={data} columns={columns} loading={false} />))).toMatchSnapshot()
  })
  it('should match a snapshot when LOADING true', () => {
    const data = [{ firstName: 'a', middleName: 'b', lastName: 'c' }]
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
    expect(toJson(render(<Table data={data} columns={columns} loading />))).toMatchSnapshot()
  })
  it('should match a snapshot when table is scrollable', () => {
    const data = [{ firstName: 'a', middleName: 'b', lastName: 'c' }]
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
    expect(toJson(render(<Table scrollable data={data} columns={columns} loading={false} />))).toMatchSnapshot()
  })
})
