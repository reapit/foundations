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
import { GetNegotiators, UpdateNegotiator, CreateNegotiator } from '../negotiators.graphql'
import { negotiators, updateNegotiatorParams, createNegotiatorParams, negotiatorDetail } from '../__mocks__/negotiators'
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

const mockUpdateMutation = {
  request: {
    query: UpdateNegotiator,
    variables: updateNegotiatorParams,
    result: { data: '' },
  },
}

const mockCreateMutation = {
  request: {
    query: CreateNegotiator,
    variables: createNegotiatorParams,
    result: { data: negotiatorDetail },
  },
}

describe('NegotiatorList', () => {
  describe('NegotiatorList', () => {
    it('should match a snapshot', () => {
      const mockProps: NegotiatorListProps = getMockRouterProps({ params: {}, search: '?page=1' })
      const wrapper = mount(
        <Router>
          <MockedProvider mocks={[mockQueries, mockUpdateMutation, mockCreateMutation]} addTypename={false}>
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
        createNegotiator: jest.fn(),
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
        createNegotiator: jest.fn(),
      }
      const wrapper = shallow(<div>{renderNegotiatorList(mockParams)}</div>)
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot', () => {
      const mockUpdateNegotiator = jest.fn()
      const mockCreateNegotiator = jest.fn()
      const mockParams: RenderNegotiatorListParams = {
        loading: false,
        error: undefined,
        handleChangePage: jest.fn(),
        updateNegotiator: jest.fn(),
        createNegotiator: jest.fn(),
        dataTable: getDataTable(negotiators, mockUpdateNegotiator, mockCreateNegotiator),
      }
      const wrapper = shallow(<div>{renderNegotiatorList(mockParams)}</div>)
      expect(wrapper).toMatchSnapshot()
    })

    describe('getDataTable', () => {
      const mockUpdateNegotiator = jest.fn()
      const mockCreateNegotiator = jest.fn()
      it('should run correctly', () => {
        const dataTable = getDataTable(negotiators, mockUpdateNegotiator, mockCreateNegotiator)
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
