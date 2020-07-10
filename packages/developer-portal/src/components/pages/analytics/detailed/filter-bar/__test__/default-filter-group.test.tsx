import * as React from 'react'

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

const mockProps: DefaultFilterGroupProps = {
  appIds: ['09043eb8-9e5e-4650-b7f1-f0cb62699027', '261da083-cee2-4f5c-a18f-8f9375f1f5af'],
  clientIds: ['DXX'],
  setDateFrom: jest.fn(),
  setDateTo: jest.fn(),
}

describe('FilterBar', () => {
  it('should match a snapshot', () => {
    expect(shallow(<DefaultFilterGroup {...mockProps} />)).toMatchSnapshot()
  })

  describe('handleFilter', () => {
    it('should run correctly', () => {
      const mockDateParams = {
        dateFrom: '2020-03-31',
        dateTo: '2020-04-01',
      }
      const { setDateTo, setDateFrom } = mockProps
      handleFilter(mockDateParams, setDateFrom, setDateTo)
      expect(setDateFrom).toBeCalledWith(mockDateParams.dateFrom)
      expect(setDateTo).toBeCalledWith(mockDateParams.dateTo)
    })
  })

  describe('handleFilterButtonClick', () => {
    const { yesterdayParams, lastWeekParams, lastMonthParams } = prepareDefaultFilterDateParams()
    const { appIds, clientIds, setDateFrom, setDateTo } = mockProps
    const mockSetIsActive = jest.fn()
    const mockDispatch = jest.fn()
    const mockHandleFilter = jest.fn()
    it('should run correctly when filter type is yesterday', () => {
      const fn = handleFilterButtonClick(FilterType.YESTERDAY, setDateFrom, setDateTo, mockSetIsActive)
      fn()
      expect(mockSetIsActive).toBeCalled()
      mockHandleFilter(yesterdayParams, setDateFrom, setDateTo)
      expect(mockHandleFilter).toBeCalledWith(yesterdayParams, setDateFrom, setDateTo)
    })

    it('should run correctly when filter type is last week', () => {
      const fn = handleFilterButtonClick(FilterType.LAST_WEEK, setDateFrom, setDateTo, mockSetIsActive)
      fn()
      expect(mockSetIsActive).toBeCalled()
      mockHandleFilter(lastWeekParams, appIds, clientIds, setDateFrom, setDateTo, mockDispatch)
      expect(mockHandleFilter).toBeCalledWith(lastWeekParams, appIds, clientIds, setDateFrom, setDateTo, mockDispatch)
    })

    it('should run correctly when filter type is last month', () => {
      const fn = handleFilterButtonClick(FilterType.LAST_MONTH, setDateFrom, setDateTo, mockSetIsActive)
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
        dateTo: '2020-03-31',
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
      const { setDateFrom, setDateTo } = mockProps
      const mockSetIsActive = jest.fn()
      const filterButtonGroup = filterButtons.map(button => {
        return renderFiterButtons(
          button.text,
          button.filterType,
          FilterType.LAST_WEEK,
          jest.fn(),
          setDateFrom,
          setDateTo,
          mockSetIsActive,
        )
      })
      expect(filterButtonGroup).toHaveLength(3)
    })
  })
})
