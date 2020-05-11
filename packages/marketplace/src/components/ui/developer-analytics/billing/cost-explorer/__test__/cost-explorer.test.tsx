import * as React from 'react'
import { shallow } from 'enzyme'
import CostExplorer, {
  prepareFilterFormInitialValues,
  CostFilterFormValues,
  handleOnSave,
  handleFetchMonthlyBilling,
} from '../cost-explorer'
import { fetchMonthlyBilling } from '@/actions/developer'
import * as ReactRedux from 'react-redux'
import configureStore from 'redux-mock-store'
import { developerState } from '@/sagas/__stubs__/developer'
import { ReduxState } from '@/types/core'

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
      const myAppIds = ['']
      const fn = handleOnSave({ setCreatedMonth, dispatch, myAppIds })
      fn(mockFormValues)
      expect(setCreatedMonth).toBeCalledWith(mockCreatedMonth)
      expect(dispatch).toBeCalledWith(fetchMonthlyBilling({ month: mockCreatedMonth, applicationId: myAppIds }))
    })
  })

  describe('handleFetchMonthlyBilling', () => {
    it('should run correctly', () => {
      const month = '2020-05'
      const applicationId = ['applicationId']
      const dispatch = jest.fn()

      const fn = handleFetchMonthlyBilling({ dispatch, month, applicationId })
      fn()
      expect(dispatch).toBeCalledWith(fetchMonthlyBilling({ month, applicationId }))
    })
  })
})
