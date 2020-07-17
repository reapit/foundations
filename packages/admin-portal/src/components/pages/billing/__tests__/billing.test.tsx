import * as React from 'react'
import { mount, shallow } from 'enzyme'
import AdminBilling, {
  handleDownloadBillingPeriod,
  renderDownloadCell,
  genarateYearsListOptions,
  genarateMonthsListOptions,
  handleChangePeriod,
} from '../billing'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import appState from '@/reducers/__stubs__/app-state'
import * as developerServices from '@/services/developers'
import { MONTHS } from '@/constants/datetime'

const spyFetcher = jest.spyOn(developerServices, 'fetchDeveloperBillingPeriod').mockImplementation(
  () =>
    new Promise(resolve => {
      resolve()
    }),
)

describe('AdminBilling', () => {
  it('should match a snapshot', () => {
    const mockStore = configureStore()
    const store = mockStore(appState)

    const wrapper = mount(
      <Provider store={store}>
        <AdminBilling />
      </Provider>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('genarateYearsListOptions', () => {
  it('should run correctly', () => {
    const yearFrom = 2019
    const result = genarateYearsListOptions(yearFrom)
    expect(result).toEqual([{ value: '2019', label: '2019' }])
  })
})

describe('genarateMonthsListOptions', () => {
  it('should run correctly', () => {
    const result = genarateMonthsListOptions(MONTHS)
    const expected = [
      {
        label: 'January',
        value: '01',
      },
      {
        label: 'February',
        value: '02',
      },
      {
        label: 'March',
        value: '03',
      },
      {
        label: 'April',
        value: '04',
      },
      {
        label: 'May',
        value: '05',
      },
      {
        label: 'June',
        value: '06',
      },
      {
        label: 'July',
        value: '07',
      },
      {
        label: 'August',
        value: '08',
      },
      {
        label: 'September',
        value: '09',
      },
      {
        label: 'October',
        value: '10',
      },
      {
        label: 'November',
        value: '11',
      },
      {
        label: 'December',
        value: '12',
      },
    ]
    expect(result).toEqual(expected)
  })
})

describe('renderDownloadCell', () => {
  it('should run correctly', () => {
    window.URL.createObjectURL = jest.fn(() => 'test')
    const input = {
      row: {
        original: {
          proiod: '2020-02',
        },
      },
    }
    expect(shallow(<div>{renderDownloadCell(input)}</div>)).toMatchSnapshot()
  })
})

describe('handleDownloadBillingPeriod', () => {
  it('should run correctly', () => {
    const period = '2020-02'
    const setFileBlob = jest.fn()

    const fn = handleDownloadBillingPeriod(period, setFileBlob)
    fn()
    expect(spyFetcher).toBeCalledWith({ period })
  })
})

describe('handleChangePeriod', () => {
  const setMonth = jest.fn()
  const setYear = jest.fn()

  it('should run correctly', () => {
    const event = {
      nativeEvent: {
        target: {
          name: 'month',
          value: '09',
        },
      },
    }
    const fn = handleChangePeriod(setMonth, setYear)
    fn(event)
    expect(setMonth).toBeCalledWith(event.nativeEvent.target.value)
  })
  it('should run correctly', () => {
    const event = {
      nativeEvent: {
        target: {
          name: 'year',
          value: '2020',
        },
      },
    }
    const fn = handleChangePeriod(setMonth, setYear)
    fn(event)
    expect(setYear).toBeCalledWith(event.nativeEvent.target.value)
  })
})
