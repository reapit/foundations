import React from 'react'
import { render } from '../../../../tests/react-testing'
import {
  prepareInitialValues,
  AnalyticsCalculator,
  handleOnSubmit,
  handleOnClear,
  renderEndpointsUsedOptions,
  CostCalculatorFormValues,
} from '../index'
import { endpointsUsedRange } from '../use-foundation-cost-table'

const mockSetEndpointsUsed = jest.fn()
const mockSetApiCalls = jest.fn()

describe('AnalyticsCalculator', () => {
  it('should match snapshot', () => {
    expect(render(<AnalyticsCalculator />)).toMatchSnapshot()
  })
})

describe('prepareInitialValues', () => {
  it('should prepare values correctly', () => {
    const mockEndpointsUsed = 'tier3'
    const mockApiCalls = '1000'
    const curried = prepareInitialValues(mockEndpointsUsed, mockApiCalls)
    const formValues: CostCalculatorFormValues = curried()
    expect(formValues).toEqual({
      endpointsUsed: mockEndpointsUsed,
      apiCalls: mockApiCalls,
    })
  })
})

describe('handleOnSubmit', () => {
  it('should handle submit correctly', () => {
    const mockFormValues: CostCalculatorFormValues = {
      endpointsUsed: 'tier1',
      apiCalls: '12000',
    }
    const curried = handleOnSubmit(mockSetEndpointsUsed, mockSetApiCalls)
    curried(mockFormValues)
    expect(mockSetEndpointsUsed).toBeCalledWith(mockFormValues.endpointsUsed)
    expect(mockSetApiCalls).toBeCalledWith(mockFormValues.apiCalls)
  })
})

describe('handleOnClear', () => {
  it('should handle clear correctly', () => {
    const curried = handleOnClear(mockSetEndpointsUsed, mockSetApiCalls)
    const event = {
      stopPropagation: jest.fn(),
      preventDefault: jest.fn(),
    } as unknown as MouseEvent
    curried(event)
    expect(mockSetEndpointsUsed).toBeCalledWith('')
    expect(mockSetApiCalls).toBeCalledWith('')
  })
})

describe('renderEndpointsUsedOptions', () => {
  it('should render options', () => {
    const result = renderEndpointsUsedOptions(endpointsUsedRange)
    expect(result).toEqual([
      {
        value: '',
        label: 'Please select',
      },
      {
        value: 'tier1',
        label: '1-5',
      },
      {
        value: 'tier2',
        label: '6-10',
      },
      {
        value: 'tier3',
        label: '11-20',
      },
      {
        value: 'tier4',
        label: '21-30',
      },
      {
        value: 'tier5',
        label: '31-40',
      },
      {
        value: 'tier6',
        label: '41-50',
      },
      {
        value: 'tier7',
        label: '50+',
      },
    ])
  })
})
