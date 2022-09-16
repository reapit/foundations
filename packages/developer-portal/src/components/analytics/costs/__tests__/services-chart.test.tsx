import { useReapitGet } from '@reapit/utils-react'
import { render } from '@testing-library/react'
import React from 'react'
import { mockBillingOverviewData } from '../../../../tests/__stubs__/billing'
import { handleSortChartData, ServicesChart } from '../services-chart'

jest.mock('../../state/use-analytics-state')

jest.mock('react-chartjs-2', () => ({
  Chart: () => <div>Mock Chart</div>,
}))

jest.mock('@reapit/utils-react', () => ({
  useReapitGet: jest.fn(() => [mockBillingOverviewData, false]),
}))

const mockUseReapitGet = useReapitGet as jest.Mock

describe('ServicesChart', () => {
  it('should match a snapshot with billing', () => {
    expect(render(<ServicesChart />)).toMatchSnapshot()
  })

  it('should match a snapshot when loading', () => {
    mockUseReapitGet.mockReturnValue([null, true])
    expect(render(<ServicesChart />)).toMatchSnapshot()
  })
})

describe('handleSortChartData', () => {
  it('should correctly sort billing', () => {
    const curried = handleSortChartData(mockBillingOverviewData)
    const data = curried()

    expect(data).toEqual({
      dataLabels: ['March 2022', 'April 2022'],
      dataSets: [{ data: [0.3, 0.594], label: 'API Requests' }],
    })
  })
})
