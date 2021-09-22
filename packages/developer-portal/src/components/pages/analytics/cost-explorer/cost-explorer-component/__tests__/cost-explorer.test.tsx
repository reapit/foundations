import * as React from 'react'
import { shallow } from 'enzyme'
import CostExplorer, {
  prepareFilterFormInitialValues,
  CostFilterFormValues,
  handleOnSave,
  handleFetchMonthlyBilling,
  prepareTableData,
  convertTableDataToArray,
  recursiveFlattenTableRows,
} from '../cost-explorer'
import { fetchMonthlyBilling } from '@/actions/developer'
import * as ReactRedux from 'react-redux'
import configureStore from 'redux-mock-store'
import { developerState } from '@/sagas/__stubs__/developer'
import { ReduxState } from '@/types/core'
import { monthlyBillingData, tableData } from '@/sagas/__stubs__/monthly-billing'

const mockState = {
  developer: developerState,
} as ReduxState

describe('CostCalculator', () => {
  const mockCreatedMonth = '2020-04'
  const mockStore = configureStore()
  const store = mockStore(mockState)

  it('should match a snapshot', () => {
    expect(
      shallow(
        <ReactRedux.Provider store={store}>
          <CostExplorer />
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  describe('prepareInitialValues', () => {
    it('should run correctly', () => {
      const fn = prepareFilterFormInitialValues(mockCreatedMonth)
      const formValues: CostFilterFormValues = fn()
      expect(formValues).toEqual({
        createdMonth: mockCreatedMonth,
      })
    })
  })

  describe('handleOnSave', () => {
    it('should run correctly', () => {
      const setCreatedMonth = jest.fn()
      const dispatch = jest.fn()
      const mockFormValues: CostFilterFormValues = {
        createdMonth: mockCreatedMonth,
      }
      const developerId = 'developerId'
      const fn = handleOnSave({ setCreatedMonth, dispatch, developerId })
      fn(mockFormValues)
      expect(setCreatedMonth).toBeCalledWith(mockCreatedMonth)
      expect(dispatch).toBeCalledWith(fetchMonthlyBilling({ month: mockCreatedMonth, developerId }))
    })
  })

  describe('handleFetchMonthlyBilling', () => {
    it('should run correctly', () => {
      const month = '2020-05'
      const developerId = 'developerId'
      const dispatch = jest.fn()

      const fn = handleFetchMonthlyBilling({ dispatch, month, developerId })
      fn()
      expect(dispatch).toBeCalledWith(fetchMonthlyBilling({ month, developerId }))
    })
  })
})

describe('prepareTableData', () => {
  it('should run correctly', () => {
    const { services = [] } = monthlyBillingData
    expect(prepareTableData(services)).toEqual(tableData)
  })

  it('should return correct data', () => {
    const { services = [] } = monthlyBillingData
    const input = [
      ...services,
      {
        cost: 7.975,
        itemCount: 7,
        amount: 638,
        items: [{ name: 'contacts', amount: 157, cost: 1.9625, itemCount: 2 }],
        name: 'TEST',
      },
    ]

    const expected = [
      {
        amount: 638,
        cost: 7.975,
        itemCount: 7,
        name: 'API Requests',
        subRows: [{ name: 'contacts', amount: 157, cost: 1.9625, itemCount: 2, subRows: [] }],
      },
      {
        cost: 7.975,
        itemCount: null,
        amount: 638,
        subRows: [{ name: 'contacts', amount: 157, cost: 1.9625, itemCount: null, subRows: [] }],
        name: 'TEST',
      },
    ]

    expect(prepareTableData(input)).toEqual(expected)
  })
})

describe('convertTableDataToArray', () => {
  it('should return correctly', () => {
    const tableData = [
      {
        name: 'API Requests',
        amount: 0,
        cost: 0,
        itemCount: null,
        subRows: [],
      },
      {
        name: 'Reapit Connect',
        amount: 0,
        cost: 0,
        itemCount: null,
        subRows: [],
      },
      {
        name: 'Application Listing',
        amount: 1,
        cost: 49.5,
        itemCount: null,
        subRows: [
          {
            name: 'Application listing for TestApp',
            amount: 1,
            cost: 49.5,
            itemCount: null,
            subRows: [],
          },
        ],
      },
      {
        name: 'Developer Edition',
        amount: 22,
        cost: 3900,
        itemCount: null,
        subRows: [
          {
            name: 'Developer edition license for cbryan@reapit.com',
            amount: 22,
            cost: 3900,
            itemCount: null,
            subRows: [],
          },
        ],
      },
    ]
    const columns = [
      {
        Header: 'Services',
      },
      {
        Header: 'Endpoints',
      },
      {
        Header: 'Amount',
      },
      {
        Header: 'Cost',
      },
    ]

    const result = convertTableDataToArray(tableData, columns, 3949)
    const expected = [
      ['Services', 'Endpoints', 'Amount', 'Cost'],
      ['API Requests', null, 0, 0],
      ['Reapit Connect', null, 0, 0],
      ['Application Listing', null, 1, 49.5],
      ['Application listing for TestApp', null, 1, 49.5],
      ['Developer Edition', null, 22, 3900],
      ['Developer edition license for cbryan@reapit.com', null, 22, 3900],
      ['Total', null, null, 3949],
    ]
    expect(result).toEqual(expected)
  })
})

describe('recursiveFlattenTableData', () => {
  it('should return correctly', () => {
    const tableData = [
      {
        name: 'API Requests',
        amount: 0,
        cost: 0,
        itemCount: null,
        subRows: [],
      },
      {
        name: 'Reapit Connect',
        amount: 0,
        cost: 0,
        itemCount: null,
        subRows: [],
      },
      {
        name: 'Application Listing',
        amount: 1,
        cost: 49.5,
        itemCount: null,
        subRows: [
          {
            name: 'Application listing for TestApp',
            amount: 1,
            cost: 49.5,
            itemCount: null,
            subRows: [],
          },
        ],
      },
      {
        name: 'Developer Edition',
        amount: 22,
        cost: 3900,
        itemCount: null,
        subRows: [
          {
            name: 'Developer edition license for cbryan@reapit.com',
            amount: 22,
            cost: 3900,
            itemCount: null,
            subRows: [],
          },
        ],
      },
    ]

    const result = recursiveFlattenTableRows(tableData)
    const expected = [
      ['API Requests', null, 0, 0],
      ['Reapit Connect', null, 0, 0],
      ['Application Listing', null, 1, 49.5],
      ['Application listing for TestApp', null, 1, 49.5],
      ['Developer Edition', null, 22, 3900],
      ['Developer edition license for cbryan@reapit.com', null, 22, 3900],
    ]
    expect(result).toEqual(expected)
  })
})
