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
    const { last30DaysParams, todayParams, last7DaysParams } = prepareDefaultFilterDateParams()
    const { appIds, setDateFrom, setDateTo } = mockProps
    const mockSetIsActive = jest.fn()
    const mockDispatch = jest.fn()
    const mockHandleFilter = jest.fn()
    it('should run correctly when filter type is last 7 days', () => {
      const fn = handleFilterButtonClick(FilterType.LAST_7_DAYS, setDateFrom, setDateTo, mockSetIsActive)
      fn()
      expect(mockSetIsActive).toBeCalled()
      mockHandleFilter(last7DaysParams, setDateFrom, setDateTo)
      expect(mockHandleFilter).toBeCalledWith(last7DaysParams, setDateFrom, setDateTo)
    })

    it('should run correctly when filter type is last 30 days', () => {
      const fn = handleFilterButtonClick(FilterType.LAST_30_DAYS, setDateFrom, setDateTo, mockSetIsActive)
      fn()
      expect(mockSetIsActive).toBeCalled()
      mockHandleFilter(last30DaysParams, appIds, setDateFrom, setDateTo, mockDispatch)
      expect(mockHandleFilter).toBeCalledWith(last30DaysParams, appIds, setDateFrom, setDateTo, mockDispatch)
    })

    it('should run correctly when filter type is last month', () => {
      const fn = handleFilterButtonClick(FilterType.TODAY, setDateFrom, setDateTo, mockSetIsActive)
      fn()
      expect(mockSetIsActive).toBeCalled()
      mockHandleFilter(todayParams, appIds, setDateFrom, setDateTo, mockDispatch)
      expect(mockHandleFilter).toBeCalledWith(todayParams, appIds, setDateFrom, setDateTo, mockDispatch)
    })
  })

  describe('prepareDefaultFilterDateParams', () => {
    const mockDateString = '2020-07-06'
    beforeEach(() => {
      MockDate.set(new Date(mockDateString))
    })
    afterEach(() => {
      MockDate.reset()
    })
    it('should run correctly', () => {
      const { last30DaysParams, last7DaysParams, todayParams, defaultParams } = prepareDefaultFilterDateParams()
      expect(last30DaysParams).toEqual({
        dateFrom: '2020-06-07',
        dateTo: '2020-07-06',
      })
      expect(defaultParams).toEqual({
        dateFrom: '2020-06-30',
        dateTo: '2020-07-06',
      })
      expect(last7DaysParams).toEqual({
        dateFrom: '2020-06-30',
        dateTo: '2020-07-06',
      })
      expect(todayParams).toEqual({
        dateFrom: '2020-07-06',
        dateTo: '2020-07-06',
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
          FilterType.TODAY,
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
