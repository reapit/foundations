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
  validate,
  prepareUpdateNegeotiatorParams,
  prepareCreateNegeotiatorParams,
  handleAfterCellsChanged,
  handleErrorMessageUseEffect,
} from '../negotiators-list'
import { GetNegotiators, UpdateNegotiator, CreateNegotiator } from '../negotiators.graphql'
import {
  negotiators,
  updateNegotiatorParams,
  createNegotiatorParams,
  negotiatorDetail,
  mockChangeCellsForUpdateCase,
  mockSpreadSheetDataForUpdateCase,
  mockSpreadSheetDataForCreateCase,
  mockChangeCellsForCreateCase,
} from '../__mocks__/negotiators'
import { error } from '@/graphql/__mocks__/error'
import { getMockRouterProps } from '@/core/__mocks__/mock-router'
import { Cell } from '@reapit/elements'
import { ApolloError } from 'apollo-boost'

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

  describe('handleErrorMessageUseEffect', () => {
    it('should run correctly', () => {
      const mockFunction = jest.fn()
      const mockCreateNegotiatorError: ApolloError = {
        message: 'Create Negotiator Error',
        graphQLErrors: [],
        extraInfo: null,
        name: '',
        networkError: null,
      }
      const mockUpdateNegotiatorError: ApolloError = {
        message: 'Update Negotiator Error',
        graphQLErrors: [],
        extraInfo: null,
        name: '',
        networkError: null,
      }
      const fn = handleErrorMessageUseEffect(mockCreateNegotiatorError, mockUpdateNegotiatorError, mockFunction)
      fn()
      if (mockCreateNegotiatorError || mockUpdateNegotiatorError) {
        expect(mockFunction).toBeCalled()
      }
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
      const mockUpdateNegotiatorLoading = false
      const mockParams: RenderNegotiatorListParams = {
        loading: false,
        error: undefined,
        handleChangePage: jest.fn(),
        updateNegotiator: jest.fn(),
        createNegotiator: jest.fn(),
        dataTable: getDataTable(negotiators, mockUpdateNegotiator, mockUpdateNegotiatorLoading, mockCreateNegotiator),
      }
      const wrapper = shallow(<div>{renderNegotiatorList(mockParams)}</div>)
      expect(wrapper).toMatchSnapshot()
    })

    describe('getDataTable', () => {
      const mockUpdateNegotiator = jest.fn()
      const mockCreateNegotiator = jest.fn()
      const mockUpdateNegotiatorLoading = false
      it('should run correctly', () => {
        const dataTable = getDataTable(
          negotiators,
          mockUpdateNegotiator,
          mockUpdateNegotiatorLoading,
          mockCreateNegotiator,
        )
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

    describe('validate spreadsheet', () => {
      it('should run correctly', () => {
        const mockUpdateNegotiator = jest.fn()
        const mockCreateNegotiator = jest.fn()
        const mockUpdateNegotiatorLoading = false
        const dataTable = getDataTable(
          negotiators,
          mockUpdateNegotiator,
          mockUpdateNegotiatorLoading,
          mockCreateNegotiator,
        )
        expect(validate(dataTable as Cell[][])).toEqual([
          [true, true, true, true, true, true],
          [true, true, true, true, true, true, true, true],
          [true, true, true, true, true, true, true, true],
          [true, true, true, true, true, true, true, true],
        ])
      })
    })

    describe('prepareUpdateNegeotiatorParams', () => {
      it('should run correctly', () => {
        const mockRowIndex = 1
        const mockUpdateNegotiator = jest.fn()
        const mockCreateNegotiator = jest.fn()
        const mockUpdateNegotiatorLoading = false
        const dataTable = getDataTable(
          negotiators,
          mockUpdateNegotiator,
          mockUpdateNegotiatorLoading,
          mockCreateNegotiator,
        )
        expect(prepareUpdateNegeotiatorParams(dataTable as Cell[][], mockRowIndex)).toEqual({
          id: 'MGL',
          name: 'Abel Robertson',
          jobTitle: undefined,
          active: true,
          email: 'abel.robertson@reapitestates.net',
          mobilePhone: '9481221233',
          _eTag: '"10109C0209C684789B72FFC53730E31C"',
        })
      })
    })

    describe('prepareCreateNegeotiatorParams', () => {
      it('should run correctly', () => {
        const mockRowIndex = 1
        const mockUpdateNegotiator = jest.fn()
        const mockCreateNegotiator = jest.fn()
        const mockUpdateNegotiatorLoading = false
        const dataTable = getDataTable(
          negotiators,
          mockUpdateNegotiator,
          mockUpdateNegotiatorLoading,
          mockCreateNegotiator,
        )
        expect(prepareCreateNegeotiatorParams(dataTable as Cell[][], mockRowIndex)).toEqual({
          name: 'Abel Robertson',
          jobTitle: undefined,
          active: true,
          officeId: 'River Town',
          mobilePhone: '9481221233',
          email: 'abel.robertson@reapitestates.net',
        })
      })
    })

    describe('handleAfterCellsChanged', () => {
      const mockUpdateNegotiator = jest.fn()
      const mockCreateNegotiator = jest.fn()
      it('should run update function once', () => {
        const fn = (updateNegotiator, createNegotiator) => {
          return handleAfterCellsChanged(updateNegotiator, createNegotiator)(
            mockChangeCellsForUpdateCase,
            mockSpreadSheetDataForUpdateCase,
          )
        }

        fn(mockUpdateNegotiator, mockCreateNegotiator)

        expect(mockUpdateNegotiator).toBeCalled()
      })

      it('should run create function once', () => {
        const fn = (updateNegotiator, createNegotiator) => {
          return handleAfterCellsChanged(updateNegotiator, createNegotiator)(
            mockChangeCellsForCreateCase,
            mockSpreadSheetDataForCreateCase,
          )
        }

        fn(mockUpdateNegotiator, mockCreateNegotiator)

        expect(mockCreateNegotiator).toBeCalled()
      })
    })
  })
})
