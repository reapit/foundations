import * as React from 'react'
import { formatNumber, formatCurrency } from '@/utils/number-formatter'
import { Table, Loader } from '@reapit/elements'
import { useSelector } from 'react-redux'
import { selectMonthlyBilling, selectMonthlyBillingLoading } from '@/selector/developer'
import { BillingBreakdownForMonthV2Model, ServiceItemBillingV2Model } from '@reapit/foundations-ts-definitions'

export const prepareTableData = (data: ServiceItemBillingV2Model[], serviceName?: string) => {
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

export const prepareTableColumns = (monthlyBilling?: BillingBreakdownForMonthV2Model | null) => {
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
      accessor: row => {
        return row.itemCount && formatNumber(row.itemCount)
      },
    },
    {
      Header: 'Amount',
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

export const createCSVRow = ({ name: Services, amount: Amount, itemCount: Endpoints, cost: Cost, subRows }) => {
  if (Array.isArray(subRows) && subRows.length < 0) {
    return [Services, Endpoints, Amount, Cost]
  }
  if (Array.isArray(subRows) && subRows.length > 0) {
    const result = subRows.map(subRow => createCSVRow(subRow))
    return result
  }
  return []
}

export const convertTableDataToCSV = (tableData, columns) => {
  const titleRows = columns.map(({ Header }) => Header)
  console.log(titleRows)
  console.log(tableData)
}

const CostExplorerTable: React.FC = () => {
  const monthlyBilling = useSelector(selectMonthlyBilling)
  const isLoading = useSelector(selectMonthlyBillingLoading)

  if (isLoading) return <Loader />

  const { services = [] } = monthlyBilling

  const columns = prepareTableColumns(monthlyBilling)
  const tableData = prepareTableData(services)
  const CSVData = convertTableDataToCSV(tableData, columns)

  return (
    <>
      <Table bordered scrollable expandable columns={columns} data={tableData} />
      <p className="mt-5">
        *All charges are subject to VAT. Your totals for each month will be sent to our Accounts Department and you will
        be automatically invoiced at the end of each billing period.
      </p>
      <p className="mt-5">
        ** As our charges are calculated in fractions of pence per transaction, very occasionally you may see a rounding
        discrepancy of more than £0.01 in the Cost Explorer.
      </p>
    </>
  )
}

export default CostExplorerTable
