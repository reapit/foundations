import React from 'react'
import { render } from '../../../../tests/react-testing'
import { mockInstallationModelPagedResult } from '../../../../tests/__stubs__/installations'
import { handleSortChartData, InstallationsPerDayChart } from '../installations-per-day-chart'

jest.mock('react-chartjs-2', () => ({
  Chart: () => <div>Mock Chart</div>,
}))

describe('InstallationsPerDayChart', () => {
  it('should match snapshot', () => {
    expect(render(<InstallationsPerDayChart installations={mockInstallationModelPagedResult} />)).toMatchSnapshot()
  })
})

describe('handleSortChartData', () => {
  it('should sort data into labels and data', () => {
    const curried = handleSortChartData(mockInstallationModelPagedResult)
    const result = curried()

    expect(result).toEqual({
      labels: ['2022-03-23', '2022-01-11'],
      data: [1, 1],
    })
  })
})
