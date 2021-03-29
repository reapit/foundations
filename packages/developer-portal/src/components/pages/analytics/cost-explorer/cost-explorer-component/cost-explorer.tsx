import * as React from 'react'
import {
  H5,
  Grid,
  GridItem,
  DATE_TIME_FORMAT,
  Section,
  LevelRight,
  Button,
  Helper,
  SelectOption,
} from '@reapit/elements'
import CostFilterForm from './cost-filter-form'
import dayjs from 'dayjs'
import CostExplorerTable from './cost-explorer-table'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { fetchMonthlyBilling } from '@/actions/developer'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { getDeveloperIdFromConnectSession } from '@/utils/session'
import { selectMonthlyBilling } from '@/selector/developer'
import { formatNumber, formatCurrency } from '@/utils/number-formatter'
import { BillingBreakdownForMonthV2Model, ServiceItemBillingV2Model } from '@reapit/foundations-ts-definitions'
import { unparse } from 'papaparse'
import { saveAs } from 'file-saver'
import FadeIn from '../../../../../styles/fade-in'
import { renderClientSelectOptions } from '../../detailed/filter-bar/filter-form'
import { selectInstallationsListData } from '../../../../../selector/installations'

export type CostExplorerProps = {}

export type CostFilterFormValues = {
  createdMonth: string
  customerId?: string
}

export const prepareFilterFormInitialValues = (createdMonth: string) => {
  return (): CostFilterFormValues => {
    return {
      createdMonth,
      customerId: undefined,
    }
  }
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
      Header: 'Endpoints',
      accessor: (row) => {
        return row.itemCount && formatNumber(row.itemCount)
      },
    },
    {
      Header: 'Amount',
      accessor: (row) => {
        return row.amount && formatNumber(row.amount)
      },
    },
    {
      Header: 'Cost',
      accessor: (row) => {
        return row.cost && formatCurrency(row.cost)
      },
      Footer: formatCurrency(totalCost),
    },
  ]
}

interface HandleOnSave {
  setCreatedMonth: (createdMonth: string) => void
  dispatch: Dispatch
  developerId: string
}

export const handleOnSave = ({ setCreatedMonth, dispatch, developerId }: HandleOnSave) => {
  return (values: CostFilterFormValues) => {
    const { createdMonth, customerId } = values
    setCreatedMonth(createdMonth)
    const month = dayjs(createdMonth).format(DATE_TIME_FORMAT.YYYY_MM)
    dispatch(fetchMonthlyBilling({ month, customerId, developerId }))
  }
}

interface HandleFetchMonthlyBilling {
  month: string
  developerId: string
  dispatch: Dispatch
}

export const handleFetchMonthlyBilling = ({ dispatch, month, developerId }: HandleFetchMonthlyBilling) => () => {
  developerId && month && dispatch(fetchMonthlyBilling({ month, developerId }))
}

export const handleDownloadCSV = (csvData: string) => () => {
  const dataBlob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' })
  saveAs(dataBlob, 'billing.csv')
}

// recursive flatten data because data in table is nested in multiple level
export const recursiveFlattenTableRows = (tableData: TableData): any[][] => {
  const result = tableData.reduce((accumulator, { subRows, name: services, amount, cost, itemCount: endpoint }) => {
    accumulator.push([services, endpoint, amount, cost])
    if (subRows.length > 0) {
      accumulator.push(...recursiveFlattenTableRows(subRows))
    }
    return accumulator
  }, [] as any[][])
  return result
}

export type TableDataRow = {
  name?: string
  amount?: number
  cost?: number
  itemCount: number | null
  subRows: TableDataRow[]
}

export type TableData = TableDataRow[]

export const convertTableDataToArray = (tableData: TableData, columns: any[], totalCost: number): any[][] => {
  const titleRow = columns.map(({ Header }) => Header)
  const bodyRows = recursiveFlattenTableRows(tableData)
  const totalRow = ['Total', null, null, totalCost]
  return [titleRow, ...bodyRows, totalRow]
}

const CostExplorer: React.FC<CostExplorerProps> = () => {
  const dispatch = useDispatch()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const installationAppDataArray = useSelector(selectInstallationsListData)
  const developerId = getDeveloperIdFromConnectSession(connectSession)
  const [createdMonth, setCreatedMonth] = React.useState(dayjs().format(DATE_TIME_FORMAT.YYYY_MM))
  const clientOptions: SelectOption[] = renderClientSelectOptions(installationAppDataArray)
  const initialValues = React.useMemo(prepareFilterFormInitialValues(createdMonth), [createdMonth])
  React.useEffect(handleFetchMonthlyBilling({ month: createdMonth, developerId, dispatch }), [developerId])

  const onSave = React.useCallback(handleOnSave({ setCreatedMonth, dispatch, developerId }), [developerId, dispatch])

  const monthlyBilling = useSelector(selectMonthlyBilling)

  const { services = [] } = monthlyBilling
  const totalCost = monthlyBilling?.totalCost || 0

  const columns = prepareTableColumns(monthlyBilling)
  const tableData = prepareTableData(services)

  const parsableData = convertTableDataToArray(tableData, columns, totalCost)
  const csvData = unparse(parsableData)

  return (
    <Section hasMargin={false} hasBorder>
      <H5>Cost Explorer: Cost & Usage</H5>
      <FadeIn>
        <Helper variant="info">
          We have suspended fees for the following services until March 2021: Annual Developer Registration, App Listing
          (publishing an app in the marketplace), Developer Edition of Agency Cloud and Reapit Connect. Only API
          consumption charges will apply.
        </Helper>
        <Grid>
          <GridItem>
            <p>The table below does not include Sandbox Services, as the testing environment is free of charge</p>
          </GridItem>
        </Grid>
        <Grid>
          <GridItem className="is-two-thirds-desktop">
            <CostFilterForm initialValues={initialValues} clientOptions={clientOptions} onSave={onSave} />
          </GridItem>
          <GridItem className="is-one-third-desktop">
            <LevelRight className="has-text-right">
              <Button onClick={handleDownloadCSV(csvData)}>Download</Button>
            </LevelRight>
          </GridItem>
        </Grid>
        <Grid>
          <GridItem>
            <CostExplorerTable columns={columns} tableData={tableData} />
          </GridItem>
        </Grid>
      </FadeIn>
    </Section>
  )
}
export default CostExplorer
