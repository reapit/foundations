import * as React from 'react'
import { render } from '../../../../tests/react-testing'
import AdminBilling, {
  handleDownloadBillingPeriod,
  renderDownloadBillingCell,
  genarateYearsListOptions,
  genarateMonthsListOptions,
  handleChangePeriod,
  handleSaveFile,
  renderDownloadDwBillingCell,
} from '../billing'
import * as developerServices from '@/services/developers'
import * as customerServices from '@/services/customers'
import { MONTHS } from '@/constants/datetime'
import FileSaver from 'file-saver'

jest.mock('uuid', () => ({
  v4: jest.fn(),
}))

const mockBillingServices = jest.spyOn(developerServices, 'fetchDeveloperBillingPeriod').mockImplementation(
  () => Promise.resolve(new Blob())
)

const mockBillingDwServices = jest.spyOn(customerServices, 'fetchCustomerWarehouseCosts').mockImplementation(
  () => Promise.resolve(new Blob())
)

describe('AdminBilling', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<AdminBilling />)
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

describe('renderDownloadBillingCell', () => {
  it('should match a snapshot', () => {
    window.URL.createObjectURL = jest.fn(() => 'test')
    const input = {
      row: {
        original: {
          period: '2020-02',
        },
      },
    }
    expect(render(<div>{renderDownloadBillingCell(input)}</div>)).toMatchSnapshot()
  })
})

describe('renderDownloadDwBillingCell', () => {
  it('should match a snapshot', () => {
    window.URL.createObjectURL = jest.fn(() => 'test')
    const input = {
      row: {
        original: {
          period: '2020-02',
        },
      },
    }
    expect(render(<div>{renderDownloadDwBillingCell(input)}</div>)).toMatchSnapshot()
  })
})

describe('handleDownloadBillingPeriod', () => {
  it('should run correctly', async () => {
    const period = '2020-02'
    const setBillingFile = jest.fn()
    const setBillingDwFile = jest.fn()

    const fn = handleDownloadBillingPeriod(period, setBillingFile, setBillingDwFile)
    await fn()
    expect(mockBillingServices).toBeCalledWith({ period })
    expect(mockBillingDwServices).toBeCalledWith(period)
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

describe('handleSaveFile', () => {
  const spySaveAsFunc = jest.spyOn(FileSaver, 'saveAs')
  it('should run correctly', () => {
    const blob = new Blob([JSON.stringify({}, null, 2)], { type: 'application/json' })
    const fn = handleSaveFile(blob, 'test')
    fn()
    expect(spySaveAsFunc).toBeCalledWith(blob, 'test')
  })
})
