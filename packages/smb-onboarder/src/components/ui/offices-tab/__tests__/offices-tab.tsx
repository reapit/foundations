import * as React from 'react'
import { mount, shallow } from 'enzyme'
import { MAX_ENTITIES_FETCHABLE_AT_ONE_TIME } from '@/constants/paginators'
import { MockedProvider } from '@apollo/react-testing'
import { BrowserRouter as Router } from 'react-router-dom'
import {
  OfficesTab,
  renderContent,
  RenderContentParams,
  getDataTable,
  tableHeaders,
  handleChangePage,
  prepareUpdateOfficeParams,
  prepareCreateOfficeParams,
  validate,
  handleAfterCellChange,
  convertUploadedCellToTableCell,
  createDownLoadButtonOnClickFn,
  CreateDownLoadButtonOnClickFnParams,
  CustomDownButton,
} from '../offices-tab'
import GET_OFFICES from '../gql/get-offices.graphql'
import CREATE_OFFICE from '../gql/create-office.graphql'
import UPDATE_OFFICE from '../gql/update-office.graphql'
import {
  offices,
  office,
  mockCreateOfficeParams,
  mockUpdateOfficeParams,
  mockChangeCellsForCreateCase,
  mockChangeCellsForUpdateCase,
} from '../__mocks__/offices'
import { error } from '@/graphql/__mocks__/error'
import { Cell } from '@reapit/elements'

const mockQueries = {
  request: {
    query: GET_OFFICES,
    variables: { pageSize: 100, pageNumber: 1 },
  },
  result: {
    data: offices,
  },
}

const mockCreateMutation = {
  request: {
    query: CREATE_OFFICE,
    variables: mockCreateOfficeParams,
    result: { data: office },
  },
}

const mockUpdateMutation = {
  request: {
    query: UPDATE_OFFICE,
    variables: mockUpdateOfficeParams,
    result: { data: office },
  },
}

describe('OfficesTab', () => {
  describe('CustomDownButton', () => {
    it('should match a snapshot', () => {
      const wrapper = mount(
        <Router>
          <MockedProvider mocks={[mockQueries, mockCreateMutation, mockUpdateMutation]} addTypename={false}>
            <CustomDownButton setErrorServer={jest.fn} totalCount={0} />
          </MockedProvider>
        </Router>,
      )
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('OfficesTab', () => {
    it('should match a snapshot', () => {
      const wrapper = mount(
        <Router>
          <MockedProvider mocks={[mockQueries, mockCreateMutation, mockUpdateMutation]} addTypename={false}>
            <OfficesTab />
          </MockedProvider>
        </Router>,
      )
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('createDownLoadButtonOnClickFn', () => {
    it('should call getDataTable and handleDownloadCsv if fetch successfully', done => {
      const mockedParams = ({
        client: {
          query: jest.fn(
            () =>
              new Promise((_, reject) => {
                reject('error')
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
    it('should call setErrorServer when error is received during fetching', done => {
      const mockedParams = ({
        client: {
          query: jest.fn(
            () =>
              new Promise((_, reject) => {
                reject(new Error('error'))
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
        expect(mockedParams.setErrorServer).toHaveBeenCalledWith({ type: 'SERVER', message: 'error' })
        done()
      }, 1)
    })
    it('should setIsDownloading correctly', done => {
      const mockedParams = ({
        client: {
          query: jest.fn(
            () =>
              new Promise(resolve => {
                resolve(offices)
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
                resolve(offices)
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
        query: GET_OFFICES,
        variables: {
          pageSize: MAX_ENTITIES_FETCHABLE_AT_ONE_TIME,
          pageNumber: 1,
        },
      })
      expect(mockedParams.client.query).toHaveBeenNthCalledWith(2, {
        query: GET_OFFICES,
        variables: {
          pageSize: MAX_ENTITIES_FETCHABLE_AT_ONE_TIME,
          pageNumber: 2,
        },
      })
    })
  })

  describe('renderContent', () => {
    it('should match snapshot', () => {
      const mockParams: RenderContentParams = {
        loading: true,
        error: undefined,
        handleChangePage: jest.fn(),
        afterCellsChanged: jest.fn(),
        handleAfterUpload: jest.fn(),
        dataTable: [],
        setErrorServer: jest.fn(),
      }
      const wrapper = shallow(<div>{renderContent(mockParams)}</div>)
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot', () => {
      const mockParams: RenderContentParams = {
        loading: false,
        error,
        handleChangePage: jest.fn(),
        afterCellsChanged: jest.fn(),
        handleAfterUpload: jest.fn(),
        dataTable: [],
        setErrorServer: jest.fn(),
      }
      const wrapper = shallow(<div>{renderContent(mockParams)}</div>)
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot', () => {
      const mockParams: RenderContentParams = {
        loading: false,
        error: undefined,
        handleChangePage: jest.fn(),
        afterCellsChanged: jest.fn(),
        handleAfterUpload: jest.fn(),
        dataTable: getDataTable(offices),
        setErrorServer: jest.fn(),
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

  describe('prepareCreateOfficeParams', () => {
    it('should run correctly', () => {
      const result = {
        name: 'Reapit',
        address: {
          buildingName: '',
          buildingNumber: '15',
          line1: 'Example street',
          line2: 'Solihull',
          line3: 'West Midlands',
          line4: '',
          postcode: 'B91 2XX',
        },
        workPhone: '01234 567890',
        email: 'example@email.com',
      }
      const dataTable = getDataTable(offices)
      expect(prepareCreateOfficeParams(mockChangeCellsForCreateCase, dataTable)).toEqual(result)
    })
  })

  describe('prepareUpdateOfficeParams', () => {
    it('should run correctly', () => {
      const result = {
        name: 'Reapit new name',
        _eTag: '"104F6D31FAFEB3B1DE6BB9CF8E071094"',
        id: 'REA',
      }
      const dataTable = getDataTable(offices)
      expect(prepareUpdateOfficeParams(mockChangeCellsForUpdateCase, dataTable)).toEqual(result)
    })
  })

  describe('validate', () => {
    it('should run correctly', () => {
      const result = [
        [true, true, true, true, true, true, true, true, true, true, true, true],
        [true, true, true, true, true, true, true, true, true, true, true, true],
        [true, true, true, true, true, true, true, true, true, true, false, true],
        [true, true, true, true, true, true, true, true, true, true, false, true],
      ]
      const dataTable = getDataTable(offices)
      expect(validate(dataTable)).toEqual(result)
    })
  })

  describe('handleAfterCellChange', () => {
    const createFuntion = jest.fn()
    const updateFuntion = jest.fn()
    const dataTable = getDataTable(offices)

    it('should run create function', () => {
      const preparedRow = [
        { value: '', key: 'id', isValidated: true },
        { value: '', key: '_eTag', isValidated: true },
        { value: '', key: 'name', isValidated: true },
        { value: '', key: 'address.buildingName', isValidated: true },
        { value: '', key: 'address.buildingNumber', isValidated: true },
        { value: 'London road', key: 'address.line1', isValidated: true },
        { value: '', key: 'address.line2', isValidated: true },
        { value: '', key: 'address.line3', isValidated: true },
        { value: '', key: 'address.line4', isValidated: true },
        { value: 'GP GXX', key: 'address.postcode', isValidated: true },
        { value: '0987654321', key: 'workPhone', isValidated: true },
        { value: 'tester@reapit.com', key: 'email', isValidated: true },
      ]
      dataTable.push(preparedRow)
      handleAfterCellChange(createFuntion, updateFuntion)(
        [{ ...mockChangeCellsForCreateCase[0], row: dataTable.length - 1 }],
        dataTable,
      )
      expect(createFuntion).toHaveBeenCalled()
    })

    it('should run update function', () => {
      handleAfterCellChange(createFuntion, updateFuntion)(mockChangeCellsForUpdateCase, dataTable)
      expect(updateFuntion).toHaveBeenCalled()
    })
  })

  describe('convertUploadedCellToTableCell', () => {
    const uploadedCell: Cell[] = [{ value: '' }, { value: '' }, { value: 'Office name' }, { value: 'Building name' }]
    const expectCell: Cell[] = [
      { value: '', key: 'id', readOnly: true, className: 'hidden-cell' },
      { value: '', key: '_eTag', readOnly: true, className: 'hidden-cell' },
      { value: 'Office name' },
      { value: 'Building name' },
    ]
    expect(convertUploadedCellToTableCell(uploadedCell)).toEqual(expectCell)
  })
})
