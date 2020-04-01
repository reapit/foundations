import * as React from 'react'
import * as ReactRedux from 'react-redux'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import MockDate from 'mockdate'
import {
  DefaultFilterGroup,
  DefaultFilterGroupProps,
  prepareDefaultFilterDateParams,
  handleFilter,
  handleFilterButtonClick,
  FilterType,
  renderFiterButtons,
  filterButtons,
} from '../default-filter-group'
import { appUsageStatsRequestData } from '@/actions/app-usage-stats'
import { appInstallationsRequestData } from '@/actions/app-installations'
import { GET_ALL_PAGE_SIZE } from '@/constants/paginator'

const mockProps: DefaultFilterGroupProps = {
  appIds: ['09043eb8-9e5e-4650-b7f1-f0cb62699027', '261da083-cee2-4f5c-a18f-8f9375f1f5af'],
  clientIds: ['DXX'],
  setDateFrom: jest.fn(),
  setDateTo: jest.fn(),
}

describe('FilterBar', () => {
  let store
  let spyDispatch
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore({})
    /* mocking useDispatch on our mock store  */
    spyDispatch = jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(() => store.dispatch)
  })
  it('should match a snapshot', () => {
    expect(
      shallow(
        <ReactRedux.Provider store={store}>
          <DefaultFilterGroup {...mockProps} />
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  describe('handleFilter', () => {
    it('should run correctly', () => {
      const mockDateParams = {
        dateFrom: '2020-03-31',
        dateTo: '2020-04-01',
      }
      const { appIds, clientIds, setDateTo, setDateFrom } = mockProps
      handleFilter(mockDateParams, appIds, clientIds, setDateFrom, setDateTo, spyDispatch)
      expect(setDateFrom).toBeCalledWith(mockDateParams.dateFrom)
      expect(setDateTo).toBeCalledWith(mockDateParams.dateTo)
      expect(spyDispatch).toBeCalledWith(
        appUsageStatsRequestData({
          ...mockDateParams,
          appId: appIds,
        }),
      )
      expect(spyDispatch).toBeCalledWith(
        appInstallationsRequestData({
          appId: appIds,
          clientId: clientIds,
          pageSize: GET_ALL_PAGE_SIZE,
          installedDateFrom: mockDateParams.dateFrom,
          installedDateTo: mockDateParams.dateTo,
        }),
      )
    })
  })

  describe('handleFilterButtonClick', () => {
    const { yesterdayParams, lastWeekParams, lastMonthParams } = prepareDefaultFilterDateParams()
    const { appIds, clientIds, setDateFrom, setDateTo } = mockProps
    const mockSetIsActive = jest.fn()
    const mockDispatch = jest.fn()
    const mockHandleFilter = jest.fn()
    it('should run correctly when filter type is yesterday', () => {
      const fn = handleFilterButtonClick(
        FilterType.YESTERDAY,
        appIds,
        clientIds,
        setDateFrom,
        setDateTo,
        mockDispatch,
        mockSetIsActive,
      )
      fn()
      expect(mockSetIsActive).toBeCalled()
      mockHandleFilter(yesterdayParams, appIds, clientIds, setDateFrom, setDateTo, mockDispatch)
      expect(mockHandleFilter).toBeCalledWith(yesterdayParams, appIds, clientIds, setDateFrom, setDateTo, mockDispatch)
    })

    it('should run correctly when filter type is last week', () => {
      const fn = handleFilterButtonClick(
        FilterType.LAST_WEEK,
        appIds,
        clientIds,
        setDateFrom,
        setDateTo,
        mockDispatch,
        mockSetIsActive,
      )
      fn()
      expect(mockSetIsActive).toBeCalled()
      mockHandleFilter(lastWeekParams, appIds, clientIds, setDateFrom, setDateTo, mockDispatch)
      expect(mockHandleFilter).toBeCalledWith(lastWeekParams, appIds, clientIds, setDateFrom, setDateTo, mockDispatch)
    })

    it('should run correctly when filter type is last month', () => {
      const fn = handleFilterButtonClick(
        FilterType.LAST_MONTH,
        appIds,
        clientIds,
        setDateFrom,
        setDateTo,
        mockDispatch,
        mockSetIsActive,
      )
      fn()
      expect(mockSetIsActive).toBeCalled()
      mockHandleFilter(lastMonthParams, appIds, clientIds, setDateFrom, setDateTo, mockDispatch)
      expect(mockHandleFilter).toBeCalledWith(lastMonthParams, appIds, clientIds, setDateFrom, setDateTo, mockDispatch)
    })
  })

  describe('prepareDefaultFilterDateParams', () => {
    const mockDateString = '2020-04-01'
    beforeEach(() => {
      MockDate.set(new Date(mockDateString))
    })
    afterEach(() => {
      MockDate.reset()
    })
    it('should run correctly', () => {
      const { yesterdayParams, lastWeekParams, lastMonthParams } = prepareDefaultFilterDateParams()
      expect(yesterdayParams).toEqual({
        dateFrom: '2020-03-31',
        dateTo: '2020-04-01',
      })
      expect(lastWeekParams).toEqual({
        dateFrom: '2020-03-23',
        dateTo: '2020-03-29',
      })
      expect(lastMonthParams).toEqual({
        dateFrom: '2020-03-01',
        dateTo: '2020-03-31',
      })
    })
  })

  describe('renderFiterButtons', () => {
    it('should match a snapshot', () => {
      const { appIds, clientIds, setDateFrom, setDateTo } = mockProps
      const mockSetIsActive = jest.fn()
      const mockDispatch = jest.fn()
      const filterButtonGroup = filterButtons.map(button => {
        return renderFiterButtons(
          button.text,
          button.filterType,
          FilterType.LAST_WEEK,
          jest.fn(),
          appIds,
          clientIds,
          setDateFrom,
          setDateTo,
          mockDispatch,
          mockSetIsActive,
        )
      })
      expect(filterButtonGroup).toHaveLength(3)
    })
  })
})
