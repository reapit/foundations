import * as React from 'react'
import { mount, shallow } from 'enzyme'
import { MockedProvider } from '@apollo/react-testing'
import { BrowserRouter as Router } from 'react-router-dom'
import {
  NegotiatorList,
  NegotiatorListProps,
  renderNegotiatorList,
  RenderNegotiatorListParams,
  getDataTable,
  tableHeaders,
  handleChangePage,
} from '../negotiators-list'
import { GetNegotiators } from '../negotiators.graphql'
import { negotiators } from '../__mocks__/negotiators'
import { error } from '@/graphql/__mocks__/error'
import { getMockRouterProps } from '@/core/__mocks__/mock-router'

const mockQueries = {
  request: {
    query: GetNegotiators,
    variables: { pageSize: 100, pageNumber: 1 },
  },
  result: {
    data: negotiators,
  },
}

describe('NegotiatorList', () => {
  describe('NegotiatorList', () => {
    it('should match a snapshot', () => {
      const mockProps: NegotiatorListProps = getMockRouterProps({ params: {}, search: '?page=1' })
      const wrapper = mount(
        <Router>
          <MockedProvider mocks={[mockQueries]} addTypename={false}>
            <NegotiatorList {...mockProps} />
          </MockedProvider>
        </Router>,
      )
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('renderNegotiatorList', () => {
    it('should match snapshot', () => {
      const mockParams: RenderNegotiatorListParams = {
        loading: true,
        error: undefined,
        handleChangePage: jest.fn(),
        dataTable: [],
        updateNegotiator: jest.fn(),
        updatedNegotiator: undefined,
      }
      const wrapper = shallow(<div>{renderNegotiatorList(mockParams)}</div>)
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot', () => {
      const mockParams: RenderNegotiatorListParams = {
        loading: false,
        error,
        handleChangePage: jest.fn(),
        dataTable: [],
        updateNegotiator: jest.fn(),
        updatedNegotiator: undefined,
      }
      const wrapper = shallow(<div>{renderNegotiatorList(mockParams)}</div>)
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot', () => {
      const mockParams: RenderNegotiatorListParams = {
        loading: false,
        error: undefined,
        handleChangePage: jest.fn(),
        dataTable: getDataTable(negotiators),
        updateNegotiator: jest.fn(),
        updatedNegotiator: undefined,
      }
      const wrapper = shallow(<div>{renderNegotiatorList(mockParams)}</div>)
      expect(wrapper).toMatchSnapshot()
    })

    describe('getDataTable', () => {
      it('should run correctly', () => {
        const dataTable = getDataTable(negotiators)
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
})
