import * as React from 'react'
import * as ReactRedux from 'react-redux'
import { ReduxState } from '@/types/core'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import {
  ServiceChart,
  handleUseEffect,
  HandleUseEffectParams,
  renderChart,
  mapServiceChartDataSet,
} from '../service-chart'
import { developerState } from '@/sagas/__stubs__/developer'
import { fetchBilling } from '@/actions/developer'
import { ChartData } from 'react-chartjs-2'
import { billing } from '../__mocks__/billing'

const mockState = {
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
      shallow(
        <ReactRedux.Provider store={store}>
          <ServiceChart />
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  describe('handleFetchAppUsageStatsDataUseCallback', () => {
    it('should call billing API correctly', () => {
      const mockParams = {
        myAppIds: ['123', '456'],
        dateFrom: '2020-01',
        dateTo: '2020-05',
        dispatch: spyDispatch,
      } as HandleUseEffectParams
      const fn = handleUseEffect(mockParams)
      fn()
      expect(spyDispatch).toBeCalledWith(
        fetchBilling({ applicationId: mockParams.myAppIds, dateFrom: mockParams.dateFrom, dateTo: mockParams.dateTo }),
      )
    })

    it('should not call fetch billing data', () => {
      const mockParams = {
        myAppIds: [],
        dateFrom: '2020-01',
        dateTo: '2020-05',
        dispatch: spyDispatch,
      } as HandleUseEffectParams
      const fn = handleUseEffect(mockParams)
      fn()
      expect(spyDispatch).not.toBeCalledWith(
        fetchBilling({ applicationId: mockParams.myAppIds, dateFrom: mockParams.dateFrom, dateTo: mockParams.dateTo }),
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
      const wrapper = shallow(<div>{renderChart(true, datasets)}</div>)
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
      const wrapper = shallow(<div>{renderChart(false, datasets)}</div>)
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
          {
            label: 'Resource',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [0, 0, 0, 0, 0, 6.75, 0] as number[],
          },
        ],
      }
      expect(result).toEqual(expected)
    })
  })
})
