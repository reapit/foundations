import {
  BillingBreakdownForMonthV2Model,
  BillingOverviewForPeriodV2Model,
  MonthlyBillingDetailsV2Model,
  // MonthlyBillingDetailsV2Model,
  ServiceItemBillingV2Model,
} from '@reapit/foundations-ts-definitions'
import dayjs from 'dayjs'
import { saveAs } from 'file-saver'
import { Dispatch, SetStateAction } from 'react'
import { DATE_TIME_FORMAT } from '@reapit/elements-legacy'
import { MessageState } from '../../../context/message-context'
import { getBillingByDatesService, getBillingByMonthService } from '../../../services/billing'
import { SettingsModel } from '../../../types/settings'
import { getSettingsService, updateSettingsService } from '../../../services/settings'
import { ReapitConnectSession } from '@reapit/connect-session'

export interface ChartDataModel {
  date: string
  requestCount: number | string
}

export interface RequestByDateModel {
  date: string
  requestCount: number
}

export type TableDataRow = {
  name?: string
  amount?: number
  cost?: string | number
  itemCount: number | null
  subRows: TableDataRow[]
}

export type TableData = TableDataRow[]

export interface FilterMonth {
  month: Date
}

export const prepareTableData = (data: ServiceItemBillingV2Model[], serviceName?: string): TableData => {
  if (!data || !data.length) return []

  return data.map(({ items = [], ...row }) => {
    const service = serviceName || row.name
    const rowData = {
      ...row,
      itemCount: null,
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
      Header: 'Cost',
      accessor: (row) => {
        if (!row.cost) return formatCurrency(0)
        const formatted = formatCurrency(row.cost)
        const cost =
          row.name === 'Data Warehouse Subscription'
            ? `${formatted} (Includes 2 hours warehouse uptime per month)`
            : row.name === 'Data Warehouse'
            ? `${formatted} (${row.amount && row.amount > 2 ? row.amount - 2 : 0} hour(s) additional uptime)`
            : formatted
        return cost
      },
      Footer: formatCurrency(totalCost),
    },
  ]
}

export const flattenCostTableRows = (tableData: TableData): any[][] => {
  const result = tableData.reduce((accumulator, { name: services, cost }) => {
    accumulator.push([services, cost])
    return accumulator
  }, [] as any[][])

  return result
}

export const convertTableDataToArray = (tableData: TableData, totalCost: number): any[][] => {
  const titleRow = ['Services', 'Cost Item (GBP)']
  const bodyRows = flattenCostTableRows(tableData)
  const totalRow = ['Total Cost (GBP)', totalCost]
  return [titleRow, ...bodyRows, totalRow]
}

export const getAppHttpTrafficPerDayChartData = (stats: ServiceItemBillingV2Model[]) => {
  const chartDataStats: ChartDataModel[] = []
  const labels: string[] = []
  const data: number[] = []

  stats.forEach((item) => {
    labels.push(item.name as string)
    data.push(item.cost as number)
    chartDataStats.push({
      date: item.name as string,
      requestCount: `£${(item.cost || 0).toFixed(2)} (${((item.cost || 0) / 6.99).toFixed(2)} hrs)`,
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
        label: (tooltipItem) => {
          return data.find((x) => x.date === tooltipItem.label)?.requestCount
        },
      },
    },
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Usage Cost ( £ )',
          },
        },
      ],
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
    {
      label: 'Data Warehouse Subscriptions',
      backgroundColor: 'rgba(81, 74, 177,0.2)',
      borderColor: 'rgba(81, 74, 177,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(81, 74, 177,0.4)',
      hoverBorderColor: 'rgba(81, 74, 177,1)',
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

  billing.periods.forEach((period: MonthlyBillingDetailsV2Model) => {
    labels.push(period?.periodName || '')
    const services = period?.services || []
    const dwUsageData = services.find((service) => service.name === 'Data Warehouse')?.cost || 0
    const dwSubsData = services.find((service) => service.name === 'Data Warehouse Subscription')?.cost || 0

    if (datasets) {
      datasets[0].totalCost += dwUsageData
      datasets[0].data.push(dwUsageData)
      datasets[1].totalCost += dwSubsData
      datasets[1].data.push(dwSubsData)
    }
  })

  const sevicesHasCost = datasets.filter((dataset) => dataset.totalCost)

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

export const handleGetBilling =
  (
    setBilling: Dispatch<SetStateAction<BillingBreakdownForMonthV2Model | undefined>>,
    setBillingLoading: Dispatch<SetStateAction<boolean>>,
    setMessageState: Dispatch<React.SetStateAction<MessageState>>,
    month: Date,
  ) =>
  () => {
    const getBilling = async () => {
      setBillingLoading(true)
      const billing = await getBillingByMonthService(dayjs(month).startOf('month').format(DATE_TIME_FORMAT.YYYY_MM))
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

export const handleGetBillingByPeriod =
  (
    setBilling: Dispatch<SetStateAction<BillingOverviewForPeriodV2Model | undefined>>,
    setBillingLoading: Dispatch<SetStateAction<boolean>>,
    setMessageState: Dispatch<React.SetStateAction<MessageState>>,
    orgId: string | null,
    dateFrom: Date,
    dateTo: Date,
  ) =>
  () => {
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

export const handleGetSettings =
  (setSettings: Dispatch<SetStateAction<SettingsModel | undefined>>, connectSession: ReapitConnectSession | null) =>
  () => {
    const getSettings = async () => {
      const settings = await getSettingsService()
      if (settings) {
        return setSettings(settings)
      }

      return setSettings({ monthlyUsageCap: 0 } as SettingsModel)
    }
    if (connectSession) {
      getSettings()
    }
  }

export const handleUpdateSettings =
  (
    setSettings: Dispatch<SetStateAction<SettingsModel | undefined>>,
    setMessageState: Dispatch<React.SetStateAction<MessageState>>,
    handleClose: () => void,
  ) =>
  (settings: Partial<SettingsModel>) => {
    const updateSettings = async () => {
      const updated = await updateSettingsService(settings)
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

export const getChargableUsageString = (currentSettings?: Partial<SettingsModel>): string => {
  if (!currentSettings) return '£0'

  const { monthlyUsageCap } = currentSettings
  const monthlyUsageCapNumber = Number(monthlyUsageCap)

  if (!monthlyUsageCap || isNaN(monthlyUsageCapNumber)) return '£0'

  const monthlyUsageCapBillable = monthlyUsageCapNumber - 2 > 0 ? monthlyUsageCapNumber - 2 : 0
  return monthlyUsageCapBillable ? `£${(monthlyUsageCapBillable * 6.99).toFixed(2)}` : '£0'
}
