import * as React from 'react'
import * as ReactRedux from 'react-redux'
import { ReduxState } from '@/types/core'
import { shallow, mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import {
  ServiceChart,
  handleUseEffect,
  HandleUseEffectParams,
  renderChart,
  mapServiceChartDataSet,
  datasets,
  handleChartLegendCallback,
  renderChartLegend,
  handleCallGenerateChartLegend,
} from '../service-chart'
import { developerState } from '@/sagas/__stubs__/developer'
import { fetchBilling } from '@/actions/developer'
import ChartComponent, { ChartData, ChartComponentProps } from 'react-chartjs-2'
import { billing } from '../__mocks__/billing'
import appState from '@/reducers/__stubs__/app-state'

const mockState = {
  ...appState,
  developer: developerState,
} as ReduxState

describe('ServiceChart', () => {
  let store
  let spyDispatch
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(mockState)
    /* mocking useDispatch on our mock store  */
    spyDispatch = jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(() => store.dispatch)
  })
  it('should match a snapshot', () => {
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <ServiceChart />
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  describe('handleFetchAppUsageStatsDataUseCallback', () => {
    it('should call billing API correctly', () => {
      const mockParams = {
        developerId: 'developerId',
        dateFrom: '2020-01',
        dateTo: '2020-05',
        dispatch: spyDispatch,
      } as HandleUseEffectParams
      const fn = handleUseEffect(mockParams)
      fn()
      expect(spyDispatch).toBeCalledWith(
        fetchBilling({ developerId: mockParams.developerId, dateFrom: mockParams.dateFrom, dateTo: mockParams.dateTo }),
      )
    })

    it('should not call fetch billing data', () => {
      const mockParams = {
        developerId: 'developerId',
        dateFrom: '2020-01',
        dateTo: '2020-05',
        dispatch: spyDispatch,
      } as HandleUseEffectParams
      const fn = handleUseEffect(mockParams)
      fn()
      expect(spyDispatch).toBeCalledWith(
        fetchBilling({ developerId: mockParams.developerId, dateFrom: mockParams.dateFrom, dateTo: mockParams.dateTo }),
      )
    })
  })

  describe('handleUseEffect', () => {
    it('should render Loader', () => {
      const datasets = {
        label: ['A', 'B', 'C'],
        datasets: [
          {
            label: 'Resource',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [1, 2, 3] as number[],
          },
        ],
      } as ChartData<any>
      const wrapper = shallow(<div>{renderChart(true, datasets, jest.fn())}</div>)
      expect(wrapper).toMatchSnapshot()
    })

    it('should render Chart', () => {
      const datasets = {
        label: ['A', 'B', 'C'],
        datasets: [
          {
            label: 'Resource',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [1, 2, 3] as number[],
          },
        ],
      } as ChartData<any>
      const wrapper = shallow(<div>{renderChart(false, datasets, jest.fn())}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('mapServiceChartDataSet', () => {
    it('should return correctly', () => {
      const result = mapServiceChartDataSet(billing)
      const expected = {
        labels: [
          'November 2019',
          'December 2019',
          'January 2020',
          'February 2020',
          'March 2020',
          'April 2020',
          'May 2020',
        ],
        datasets: [
          // API calls
          { ...datasets[0], data: [1, 0, 0, 0, 0, 0.3, 0.5], totalCost: 1.8 },
          // App Listing
          { ...datasets[1], data: [1, 0, 0, 0, 0, 0, 0], totalCost: 1 },
          // Developer Edition
          { ...datasets[2], data: [1, 0, 0, 0, 0, 0, 0], totalCost: 1 },
        ],
      }

      expect(result).toEqual(expected)
    })
  })

  describe('handleChartLegendCallback', () => {
    it('should run directly', () => {
      const mockSetChartLegendItems = jest.fn()
      const fn = handleChartLegendCallback(mockSetChartLegendItems)
      const mockChartProps: ChartComponentProps = {
        data: {},
        legend: {
          legendItems: {},
        },
      }
      fn(mockChartProps)
      expect(mockSetChartLegendItems).toBeCalledWith(mockChartProps.legend.legendItems)
    })
  })

  describe('handleCallGenerateChartLegend', () => {
    it('should run directly', () => {
      const mockChart = {
        chartInstance: {
          generateLegend: jest.fn(),
        },
      } as ChartComponent<any>

      const fn = handleCallGenerateChartLegend(mockChart)
      fn()
      expect(mockChart.chartInstance.generateLegend).toBeCalled()
    })
  })

  describe('renderChartLegend', () => {
    it('should match snapshot', () => {
      const mockChart = {
        chartInstance: {},
      } as ChartComponent<any>
      const chartLegendItems = [
        {
          text: 'API Calls',
          fillStyle: 'rgba(255,99,132,0.2)',
          hidden: false,
          lineWidth: 1,
          strokeStyle: 'rgba(255,99,132,1)',
          datasetIndex: 0,
        },
      ]
      const wrapper = shallow(<div>{renderChartLegend(mockChart, chartLegendItems)}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
