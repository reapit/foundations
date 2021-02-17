import {
  BillingBreakdownForMonthV2Model,
  BillingOverviewForPeriodV2Model,
  // MonthlyBillingDetailsV2Model,
  ServiceItemBillingV2Model,
} from '@reapit/foundations-ts-definitions'
import dayjs from 'dayjs'
import { saveAs } from 'file-saver'
import { Dispatch, SetStateAction } from 'react'
import { DATE_TIME_FORMAT } from '@reapit/elements'
import { MessageState } from '../../../context/message-context'
import { getBillingByDatesService, getBillingByMonthService } from '../../../services/billing'
import { SettingsModel } from '../../../types/settings'
import { getSettingsService, updateSettingsService } from '../../../services/settings'
import { ReapitConnectSession } from '@reapit/connect-session'

export interface ChartDataModel {
  date: string
  requestCount: number
}

export interface RequestByDateModel {
  date: string
  requestCount: number
}

export type TableDataRow = {
  name?: string
  amount?: number
  cost?: number
  itemCount: number | null
  subRows: TableDataRow[]
}

export type TableData = TableDataRow[]

export interface FilterMonth {
  month: Date
}

export const prepareTableData = (data: ServiceItemBillingV2Model[], serviceName?: string): TableData => {
  if (!data || !data.length) return []

  return data.map(({ items = [], itemCount, ...row }) => {
    const service = serviceName || row.name
    const isApiRequests = service === 'API Requests'

    const rowData = {
      ...row,
      itemCount: isApiRequests && itemCount ? itemCount : null,
      subRows: prepareTableData(items, service),
    }
    return rowData
  })
}

export const formatCurrency = (
  amount: number,
  minimumFractionDigits = 2,
  locales: string = 'en-GB',
  currency = 'GBP',
) => {
  const numberFormat = new Intl.NumberFormat(locales, {
    style: 'currency',
    currency,
    minimumFractionDigits,
  })
  return numberFormat.format(amount)
}

export const formatNumber = (amount: number, minimumFractionDigits = 0, locales: string = 'en-GB') => {
  const numberFormat = new Intl.NumberFormat(locales, {
    minimumFractionDigits,
  })
  return numberFormat.format(amount)
}

export const prepareTableColumns = (monthlyBilling?: BillingBreakdownForMonthV2Model | null): any[] => {
  const totalCost = monthlyBilling?.totalCost || 0

  return [
    {
      Header: 'Services',
      accessor: 'name',
      columnProps: {
        width: 200,
      },
      Footer: 'Total',
    },
    {
      Header: 'Hours',
      accessor: row => {
        return row.amount && formatNumber(row.amount)
      },
    },
    {
      Header: 'Cost',
      accessor: row => {
        return row.cost && formatCurrency(row.cost)
      },
      Footer: formatCurrency(totalCost),
    },
  ]
}

export const flattenCostTableRows = (tableData: TableData): any[][] => {
  const result = tableData.reduce((accumulator, { subRows, name: services, amount, cost, itemCount: endpoint }) => {
    accumulator.push([services, endpoint, amount, cost])
    if (subRows.length > 0) {
      accumulator.push(...flattenCostTableRows(subRows))
    }
    return accumulator
  }, [] as any[][])

  return result
}

export const convertTableDataToArray = (tableData: TableData, columns: any[], totalCost: number): any[][] => {
  const titleRow = columns.map(({ Header }) => Header)
  const bodyRows = flattenCostTableRows(tableData)
  const totalRow = ['Total', null, null, totalCost]
  return [titleRow, ...bodyRows, totalRow]
}

export const getAppHttpTrafficPerDayChartData = (stats: ServiceItemBillingV2Model[]) => {
  const chartDataStats: ChartDataModel[] = []
  const labels: string[] = []
  const data: number[] = []

  stats.map(item => {
    labels.push(item.name as string)
    data.push(item.cost as number)
    chartDataStats.push({
      date: item.name as string,
      requestCount: item.cost as number,
    })
  })

  return {
    labels,
    data,
    chartDataStats,
  }
}

export const getDailyChartOptions = (data: ChartDataModel[]) => {
  return {
    legend: null,
    width: 100,
    height: 50,
    maintainAspectRatio: true,
    tooltips: {
      mode: 'label',
      callbacks: {
        label: tooltipItem => {
          return data.find(x => x.date === tooltipItem.label)?.requestCount
        },
      },
    },
  }
}

export const getDailyChartConfig = (labels: string[], data: number[]) => ({
  labels,
  datasets: data.length
    ? [
        {
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data,
        },
      ]
    : [],
})

export const mapServiceChartDataSet = (billing: BillingOverviewForPeriodV2Model | null) => {
  const API_CALL_INDEX = 0

  const datasets = [
    {
      label: 'Data Warehouse',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [] as number[],
      totalCost: 0,
    },
  ]

  const labels: string[] = []
  if (!billing?.periods) {
    return {
      labels,
      datasets: [],
    }
  }

  billing.periods.forEach(period => {
    labels.push(period?.periodName || '')
    const services = period?.services || []
    const apiCallsData = services.find(service => service.name === 'Data Warehouse')?.cost || 0

    if (datasets) {
      datasets[API_CALL_INDEX].totalCost += apiCallsData
      datasets[API_CALL_INDEX].data.push(apiCallsData)
    }
  })

  const sevicesHasCost = datasets.filter(dataset => dataset.totalCost)

  return {
    labels,
    datasets: sevicesHasCost,
  }
}

export const handleOnSave = (setMonth: Dispatch<SetStateAction<Date>>) => (values: FilterMonth) => {
  const { month } = values
  setMonth(month)
}

export const handleAutoSave = (onSave: (values: FilterMonth) => void) => (values: FilterMonth) => {
  onSave(values)
}

export const handleDownloadCSV = (csvData: string) => () => {
  const dataBlob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' })
  saveAs(dataBlob, 'billing.csv')
}

export const handleGetBilling = (
  setBilling: Dispatch<SetStateAction<BillingBreakdownForMonthV2Model | undefined>>,
  setBillingLoading: Dispatch<SetStateAction<boolean>>,
  setMessageState: Dispatch<React.SetStateAction<MessageState>>,
  month: Date,
) => () => {
  const getBilling = async () => {
    setBillingLoading(true)
    const billing = await getBillingByMonthService(
      dayjs(month)
        .startOf('month')
        .format(DATE_TIME_FORMAT.YYYY_MM),
    )
    setBillingLoading(false)
    if (billing) {
      return setBilling(billing)
    }
    return setMessageState({ errorMessage: 'Something went wrong fetching billing, please try again' })
  }
  if (month) {
    getBilling()
  }
}

export const handleGetBillingByPeriod = (
  setBilling: Dispatch<SetStateAction<BillingOverviewForPeriodV2Model | undefined>>,
  setBillingLoading: Dispatch<SetStateAction<boolean>>,
  setMessageState: Dispatch<React.SetStateAction<MessageState>>,
  orgId: string | null,
  dateFrom: Date,
  dateTo: Date,
) => () => {
  const getBilling = async () => {
    setBillingLoading(true)
    const billing = await getBillingByDatesService(
      dayjs(dateFrom).format(DATE_TIME_FORMAT.YYYY_MM),
      dayjs(dateTo).format(DATE_TIME_FORMAT.YYYY_MM),
    )
    setBillingLoading(false)
    if (billing) {
      return setBilling(billing)
    }
    return setMessageState({ errorMessage: 'Something went wrong fetching billing, please try again' })
  }

  if (orgId) {
    getBilling()
  }
}

export const handleGetSettings = (
  setSettingsLoading: Dispatch<SetStateAction<boolean>>,
  setSettings: Dispatch<SetStateAction<SettingsModel | undefined>>,
  connectSession: ReapitConnectSession | null,
) => () => {
  const getSettings = async () => {
    setSettingsLoading(true)
    const settings = await getSettingsService()
    setSettingsLoading(false)
    if (settings) {
      return setSettings(settings)
    }

    return setSettings({ monthlyUsageCap: 0 } as SettingsModel)
  }
  if (connectSession) {
    getSettings()
  }
}

export const handleUpdateSettings = (
  setSettingsLoading: Dispatch<SetStateAction<boolean>>,
  setSettings: Dispatch<SetStateAction<SettingsModel | undefined>>,
  setMessageState: Dispatch<React.SetStateAction<MessageState>>,
  handleClose: () => void,
) => (settings: Partial<SettingsModel>) => {
  const updateSettings = async () => {
    setSettingsLoading(true)
    const updated = await updateSettingsService(settings)
    setSettingsLoading(false)
    if (updated) {
      setMessageState({ infoMessage: 'Usage cap successfully updated' })
      const settingsRefetch = await getSettingsService()
      if (settingsRefetch) {
        setSettings(settingsRefetch)
      }
      return handleClose()
    }
    setMessageState({ errorMessage: 'Something went wrong updating usage cap' })
  }

  updateSettings()
}
