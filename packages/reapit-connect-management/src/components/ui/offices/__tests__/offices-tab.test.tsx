import * as React from 'react'
import { shallow } from 'enzyme'
import OfficesTab, { OfficesContent, onPageChangeHandler } from '../offices-tab'
import { createBrowserHistory } from 'history'
import Routes from '@/constants/routes'

const locationMock = { pathname: '/offices' }

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLocation: jest.fn(() => locationMock),
}))

const data = {
  _embedded: [
    {
      id: 'OXF',
      created: '2018-12-12T12:30:23.0000000Z',
      modified: '2019-01-08T12:30:34.0000000Z',
      name: 'Reapit',
      manager: 'Mr John Smith',
      address: {
        buildingName: '',
        buildingNumber: '15',
        line1: 'Example street',
        line2: 'Solihull',
        line3: 'West Midlands',
        line4: '',
        postcode: 'B91 2XX',
        countryId: 'GB',
      },
      workPhone: '01234 567890',
      email: 'example@email.com',
      metadata: {
        CustomField1: 'CustomValue1',
        CustomField2: true,
      },
    },
  ],
  pageNumber: 1,
  pageSize: 1,
  pageCount: 1,
  totalPageCount: 1,
  totalCount: 25,
  _links: {
    self: {
      href: '/offices/?PageNumber=1&PageSize=1',
    },
    first: {
      href: '/offices/?PageNumber=1&PageSize=1',
    },
    next: {
      href: '/offices/?PageNumber=2&PageSize=1',
    },
    last: {
      href: '/offices/?PageNumber=25&PageSize=1',
    },
  },
}

jest.mock('swr', () =>
  jest.fn(() => ({
    data,
  })),
)

describe('OfficesTab', () => {
  it('should match a snapshot', () => {
    expect(shallow(<OfficesTab />)).toMatchSnapshot()
  })
})

describe('OfficesContent', () => {
  it('should match a snapshot', () => {
    const columns = [
      { Header: 'Office Name', accessor: 'name' },
      { Header: 'Address', accessor: 'address' },
      { Header: 'Last Updated', accessor: 'description' },
    ]
    expect(shallow(<OfficesContent data={data} columns={columns} onPageChange={jest.fn} />)).toMatchSnapshot()
  })
})

describe('onPageChangeHandler', () => {
  it('should return a function when executing', () => {
    const history = createBrowserHistory()
    jest.spyOn(history, 'push')
    const onPageChangeHandlerFn = onPageChangeHandler(history, { name: 'reapit' })
    expect(onPageChangeHandlerFn).toBeDefined()

    onPageChangeHandlerFn(2)
    expect(history.push).toHaveBeenLastCalledWith(`${Routes.OFFICES}?pageNumber=2&name=reapit`)
  })
})
