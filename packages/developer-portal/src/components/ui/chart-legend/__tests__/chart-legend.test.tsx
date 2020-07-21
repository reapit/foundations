import * as React from 'react'
import { shallow } from 'enzyme'
import ChartLegend, { ChartLegendProps, onChartLegendItemClick, ChartLegendItem } from '../chart-legend'

const props: ChartLegendProps = {
  chartInstance: {
    getDatasetMeta: jest.fn(),
    update: jest.fn(),
    generateLegend: jest.fn(),
  },
  chartLegendItems: [
    {
      text: 'API Calls',
      fillStyle: 'rgba(255,99,132,0.2)',
      hidden: false,
      lineWidth: 1,
      strokeStyle: 'rgba(255,99,132,1)',
      datasetIndex: 0,
    },
    {
      text: 'App Listing',
      fillStyle: 'rgba(81, 74, 177,0.2)',
      hidden: false,
      lineWidth: 1,
      strokeStyle: 'rgba(81, 74, 177,1)',
      datasetIndex: 1,
    },
    {
      text: 'Developer Edition',
      fillStyle: 'rgba(103, 195, 6,0.2)',
      hidden: false,
      lineWidth: 1,
      strokeStyle: 'rgba(103, 195, 6,1)',
      datasetIndex: 2,
    },
    {
      text: 'Developer Registration',
      fillStyle: 'rgba(241, 139, 254, 0.2)',
      hidden: false,
      lineWidth: 1,
      strokeStyle: 'rgba(241, 139, 254, 1)',
      datasetIndex: 3,
    },
  ],
}

describe('ChartLegend', () => {
  it('should match a snapshot', () => {
    expect(shallow(<ChartLegend {...props} />)).toMatchSnapshot()
  })

  describe('onChartLegendItemClick', () => {
    it('should run correctly', () => {
      const mockLegendItem: ChartLegendItem = {
        text: 'Developer Edition',
        fillStyle: 'rgba(103, 195, 6,0.2)',
        hidden: false,
        lineWidth: 1,
        strokeStyle: 'rgba(103, 195, 6,1)',
        datasetIndex: 2,
      }
      const fn = onChartLegendItemClick(props.chartInstance, mockLegendItem)
      fn()
      const { getDatasetMeta } = props.chartInstance
      expect(getDatasetMeta).toBeCalledWith(mockLegendItem.datasetIndex)
    })
  })
})
