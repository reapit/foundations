import * as React from 'react'
import { MAX_ENTITIES_FETCHABLE_AT_ONE_TIME } from '@/constants/paginators'
import { mount, shallow } from 'enzyme'
import { MockedProvider } from '@apollo/react-testing'
import { Cell } from '@reapit/elements'
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
  CreateDownLoadButtonOnClickFnParams,
  createDownLoadButtonOnClickFn,
  CustomDownButton,
} from '../negotiators-list'
import GET_NEGOTIATORS from '../gql/get-negotiators.graphql'
import UPDATE_NEGOTIATOR from '../gql/update-negotiator.graphql'
import CREATE_NEGOTIATOR from '../gql/create-negotiator.graphql'
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

const mockQueries = {
  request: {
    query: GET_NEGOTIATORS,
    variables: { pageSize: 100, pageNumber: 1 },
  },
  result: {
    data: negotiators,
  },
}

const mockUpdateMutation = {
  request: {
    query: UPDATE_NEGOTIATOR,
    variables: updateNegotiatorParams,
    result: { data: '' },
  },
}

const mockCreateMutation = {
  request: {
    query: CREATE_NEGOTIATOR,
    variables: createNegotiatorParams,
    result: { data: negotiatorDetail },
  },
}

describe('NegotiatorList', () => {
  describe('CustomDownButton', () => {
    it('should match a snapshot', () => {
      const wrapper = mount(
        <Router>
          <MockedProvider mocks={[mockQueries, mockCreateMutation, mockUpdateMutation]} addTypename={false}>
            <CustomDownButton
              updateNegotiatorLoading={false}
              updateNegotiator={jest.fn}
              createNegotiator={jest.fn}
              totalCount={0}
            />
          </MockedProvider>
        </Router>,
      )
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('createDownLoadButtonOnClickFn', () => {
    window.URL.createObjectURL = jest.fn(() => 'test')
    it('should call getDataTable and handleDownloadCsv if fetch successfully', done => {
      const mockedParams = ({
        client: {
          query: jest.fn(
            () =>
              new Promise(reslove => {
                reslove('reslove')
              }),
          ),
        },
        setErrorServer: jest.fn(),
        totalCount: 200,
        setIsDownloading: jest.fn(),
      } as unknown) as CreateDownLoadButtonOnClickFnParams
      const fn = createDownLoadButtonOnClickFn(mockedParams)
      fn()
      setTimeout(() => {
        done()
      }, 1)
    })
    it('should setIsDownloading correctly', done => {
      const mockedParams = ({
        client: {
          query: jest.fn(
            () =>
              new Promise(resolve => {
                resolve(negotiators)
              }),
          ),
        },
        setErrorServer: jest.fn(),
        totalCount: 200,
        setIsDownloading: jest.fn(),
      } as unknown) as CreateDownLoadButtonOnClickFnParams
      const fn = createDownLoadButtonOnClickFn(mockedParams)
      fn()
      expect(mockedParams.setIsDownloading).toHaveBeenNthCalledWith(1, true)
      setTimeout(() => {
        expect(mockedParams.setIsDownloading).toHaveBeenNthCalledWith(2, false)
        done()
      }, 1)
    })
    it('should call runQuery correctly', () => {
      const mockedParams = ({
        client: {
          query: jest.fn(
            () =>
              new Promise(resolve => {
                resolve(negotiators)
              }),
          ),
        },
        setErrorServer: jest.fn(),
        totalCount: 200,
        setIsDownloading: jest.fn(),
      } as unknown) as CreateDownLoadButtonOnClickFnParams
      const fn = createDownLoadButtonOnClickFn(mockedParams)
      fn()
      expect(mockedParams.client.query).toHaveBeenNthCalledWith(1, {
        query: GET_NEGOTIATORS,
        variables: {
          pageSize: MAX_ENTITIES_FETCHABLE_AT_ONE_TIME,
          pageNumber: 1,
          embed: ['office'],
        },
      })
      expect(mockedParams.client.query).toHaveBeenNthCalledWith(2, {
        query: GET_NEGOTIATORS,
        variables: {
          pageSize: MAX_ENTITIES_FETCHABLE_AT_ONE_TIME,
          pageNumber: 2,
          embed: ['office'],
        },
      })
    })
  })

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
        updateNegotiatorLoading: false,
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
        updateNegotiatorLoading: false,
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
        updateNegotiatorLoading: false,
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
