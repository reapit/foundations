import React from 'react'
import { render } from '../../../../tests/react-testing'
import { mockInstallationModelPagedResult } from '../../../../tests/__stubs__/installations'
import { handleSortChartData, InstallationsByAppChart } from '../installations-by-app-chart'

jest.mock('../../state/use-analytics-state')

jest.mock('react-chartjs-2', () => ({
  Chart: () => <div>Mock Chart</div>,
}))

describe('InstallationsByAppChart', () => {
  it('should match snapshot', () => {
    expect(render(<InstallationsByAppChart installations={mockInstallationModelPagedResult} />)).toMatchSnapshot()
  })
})

describe('handleSortChartData', () => {
  it('should sort data into labels and data', () => {
    const curried = handleSortChartData(mockInstallationModelPagedResult)
    const result = curried()

    expect(result).toEqual({
      labels: ['MOCK_APP_NAME', 'MOCK_APP_NAME_TWO'],
      data: [1, 1],
    })
  })
})
