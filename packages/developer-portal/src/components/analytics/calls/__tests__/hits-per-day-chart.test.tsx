import React from 'react'
import { render } from '../../../../tests/react-testing'
import { mockTrafficEventsModel } from '../../../../tests/__stubs__/traffic-stats'
import { handleSortChartData, HitsPerDayChart } from '../hits-per-day-chart'

jest.mock('react-chartjs-2', () => ({
  Chart: () => <div>Mock Chart</div>,
}))

describe('HitsPerDayChart', () => {
  it('should match snapshot', () => {
    expect(render(<HitsPerDayChart trafficEvents={mockTrafficEventsModel} />)).toMatchSnapshot()
  })
})

describe('handleSortChartData', () => {
  it('should sort data into labels and data', () => {
    const curried = handleSortChartData(mockTrafficEventsModel)
    const result = curried()

    expect(result).toEqual({
      labels: [
        '2022-03-22',
        '2022-03-23',
        '2022-03-24',
        '2022-03-25',
        '2022-03-26',
        '2022-03-27',
        '2022-03-28',
        '2022-03-29',
      ],
      data: [107, 110, 73, 39, 0, 4, 47, 56],
    })
  })
})
