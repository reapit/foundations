import * as React from 'react'
import { mount, shallow } from 'enzyme'
import { MockedProvider } from '@apollo/react-testing'
import { BrowserRouter as Router } from 'react-router-dom'
import {
  OfficesTab,
  OfficesTabProps,
  renderContent,
  RenderContentParams,
  getDataTable,
  tableHeaders,
  handleChangePage,
} from '../offices-tab'
import { OFFICES } from '../offices-tab.graphql'
import { offices } from '../__mocks__/offices'
import { error } from '@/graphql/__mocks__/error'
import { getMockRouterProps } from '@/core/__mocks__/mock-router'

const mockQueries = {
  request: {
    query: OFFICES,
    variables: { pageSize: 100, pageNumber: 1 },
  },
  result: {
    data: offices,
  },
}

describe('OfficesTab', () => {
  describe('OfficesTab', () => {
    it('should match a snapshot', () => {
      const mockProps: OfficesTabProps = getMockRouterProps({ params: {}, search: '?page=1' })
      const wrapper = mount(
        <Router>
          <MockedProvider mocks={[mockQueries]} addTypename={false}>
            <OfficesTab {...mockProps} />
          </MockedProvider>
        </Router>,
      )
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('renderContent', () => {
    it('should match snapshot', () => {
      const mockParams: RenderContentParams = {
        loading: true,
        error: undefined,
        handleChangePage: jest.fn(),
        dataTable: [],
      }
      const wrapper = shallow(<div>{renderContent(mockParams)}</div>)
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot', () => {
      const mockParams: RenderContentParams = {
        loading: false,
        error,
        handleChangePage: jest.fn(),
        dataTable: [],
      }
      const wrapper = shallow(<div>{renderContent(mockParams)}</div>)
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot', () => {
      const mockParams: RenderContentParams = {
        loading: false,
        error: undefined,
        handleChangePage: jest.fn(),
        dataTable: getDataTable(offices),
      }
      const wrapper = shallow(<div>{renderContent(mockParams)}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('getDataTable', () => {
    it('should run correctly', () => {
      const dataTable = getDataTable(offices)
      expect(Array.isArray(dataTable)).toBe(true)
      expect(dataTable.length).toBe(4)
      expect(dataTable[0]).toEqual(tableHeaders)
    })
  })

  describe('handleChangePage', () => {
    it('should run correctly', () => {
      const mockParams = { history: { push: jest.fn() } }
      const fn = handleChangePage(mockParams)
      fn(2)
      expect(mockParams.history.push).toBeCalledWith({ search: 'page=2' })
    })
  })
})
