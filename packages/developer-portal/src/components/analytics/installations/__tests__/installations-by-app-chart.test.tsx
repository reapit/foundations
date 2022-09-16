import React from 'react'
import { render } from '../../../../tests/react-testing'
import { mockAppSummaryModelPagedResult } from '../../../../tests/__stubs__/apps'
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
    const curried = handleSortChartData(mockInstallationModelPagedResult, mockAppSummaryModelPagedResult)
    const result = curried()

    expect(result).toEqual({
      labels: ['MOCK_APP_NAME'],
      data: [2],
    })
  })
})
