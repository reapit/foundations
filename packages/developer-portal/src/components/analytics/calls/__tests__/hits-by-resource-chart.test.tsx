import React from 'react'
import { render } from '../../../../tests/react-testing'
import { mockTrafficEventsModel } from '../../../../tests/__stubs__/traffic-stats'
import { handleSortChartData, HitsByResourceChart } from '../hits-by-resource-chart'

jest.mock('react-chartjs-2', () => ({
  Chart: () => <div>Mock Chart</div>,
}))

describe('HitsByResourceChart', () => {
  it('should match snapshot', () => {
    expect(render(<HitsByResourceChart trafficEvents={mockTrafficEventsModel} />)).toMatchSnapshot()
  })
})

describe('handleSortChartData', () => {
  it('should sort data into labels and data', () => {
    const curried = handleSortChartData(mockTrafficEventsModel)
    const result = curried()

    expect(result).toEqual({
      labels: [
        'Appointments',
        'Configuration',
        'Contacts',
        'Documents',
        'IdentityChecks',
        'Negotiators',
        'Offices',
        'Properties',
        'Vendors',
        'Webhook',
      ],
      data: [5, 81, 188, 15, 101, 6, 6, 7, 1, 26],
    })
  })
})
