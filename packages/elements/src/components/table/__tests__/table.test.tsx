import React from 'react'
import { render } from '../../../tests/react-testing'
import { Table, handleToggleExpandedRow } from '../'
import { elSpan2 } from '../../grid'

describe('Table Component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<Table />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot with varied number columns', () => {
    const wrapper = render(<Table numberColumns={4} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot with full props and expandable content', () => {
    const wrapper = render(
      <Table
        numberColumns={9}
        indexExpandedRow={0}
        setIndexExpandedRow={jest.fn()}
        rows={[
          {
            cells: [
              {
                label: 'Property',
                value: 'Mt Ash Jacket, Brassey Road',
                className: elSpan2,
                icon: 'homeSystem',
                cellHasDarkText: true,
                narrowTable: { showLabel: true },
              },
              {
                label: 'Customer',
                value: 'Mr Johnny Corrigan',
                icon: 'usernameSystem',
                narrowTable: { showLabel: true },
              },
              {
                label: 'Client A/C',
                value: 'Alternate Lettings Client Acc',
              },
              {
                label: 'Description',
                value: 'Tenant Payment Request',
              },
              {
                label: 'Request Date',
                value: '19 Apr 2021',
                narrowTable: { showLabel: true },
              },
              {
                label: 'Amount',
                value: '£50.00',
                cellHasDarkText: true,
              },
              {
                label: 'Payment Status',
                value: 'Not Requested',
                statusCircleIntent: 'danger',
              },
            ],
            expandableContent: {
              content: <p>I am the content that is only visible when expanded</p>,
            },
          },
        ]}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot for expandable content alternate settings', () => {
    const wrapper = render(
      <Table
        rows={[
          {
            cells: [],
            expandableContent: {
              content: <p>I am the content that is only visible when expanded</p>,
              headerContent: 'Some Content',
              onClick: jest.fn(),
              className: 'foo-bar',
              icon: 'homeSystem',
            },
          },
        ]}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot with full props and cta content', () => {
    const wrapper = render(
      <Table
        numberColumns={9}
        indexExpandedRow={0}
        setIndexExpandedRow={jest.fn()}
        rows={[
          {
            cells: [
              {
                label: 'Property',
                value: 'Mt Ash Jacket, Brassey Road',
                className: elSpan2,
                icon: 'homeSystem',
                cellHasDarkText: true,
                narrowTable: { showLabel: true },
              },
              {
                label: 'Customer',
                value: 'Mr Johnny Corrigan',
                icon: 'usernameSystem',
                narrowTable: { showLabel: true },
              },
              {
                label: 'Client A/C',
                value: 'Alternate Lettings Client Acc',
              },
              {
                label: 'Description',
                value: 'Tenant Payment Request',
              },
              {
                label: 'Request Date',
                value: '19 Apr 2021',
                narrowTable: { showLabel: true },
              },
              {
                label: 'Amount',
                value: '£50.00',
                cellHasDarkText: true,
              },
              {
                label: 'Payment Status',
                value: 'Not Requested',
                statusCircleIntent: 'danger',
              },
            ],
            ctaContent: {
              headerContent: 'Some Action',
              onClick: jest.fn(),
              className: 'foo-bar',
              icon: 'homeSystem',
            },
          },
        ]}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot for cta content alternate settings', () => {
    const wrapper = render(
      <Table
        rows={[
          {
            cells: [],
            ctaContent: {
              onClick: jest.fn(),
              className: 'foo-bar',
              icon: 'homeSystem',
            },
          },
        ]}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should handleToggleExpandedRow to close a row with the default behaviour', () => {
    const setExpandedRow = jest.fn()
    const curried = handleToggleExpandedRow(1, 1, setExpandedRow)
    curried()
    expect(setExpandedRow).toHaveBeenCalledWith(null)
  })

  it('should handleToggleExpandedRow to open a row with the default behaviour', () => {
    const setExpandedRow = jest.fn()
    const curried = handleToggleExpandedRow(null, 1, setExpandedRow)
    curried()
    expect(setExpandedRow).toHaveBeenCalledWith(null)
  })

  it('should handleToggleExpandedRow to close a row with the override behaviour', () => {
    const setIndexExpandedRow = jest.fn()
    const setExpandedRow = jest.fn()
    const curried = handleToggleExpandedRow(1, 1, setExpandedRow, 1, setIndexExpandedRow)
    curried()
    expect(setExpandedRow).not.toHaveBeenCalled()
    expect(setIndexExpandedRow).toHaveBeenCalledWith(null)
  })

  it('should handleToggleExpandedRow to open a row with the override behaviour', () => {
    const setIndexExpandedRow = jest.fn()
    const setExpandedRow = jest.fn()
    const curried = handleToggleExpandedRow(1, 1, setExpandedRow, null, setIndexExpandedRow)
    curried()
    expect(setExpandedRow).not.toHaveBeenCalled()
    expect(setIndexExpandedRow).toHaveBeenCalledWith(1)
  })
})
