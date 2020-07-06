import * as React from 'react'
import { formatNumber, formatCurrency } from '@/utils/number-formatter'
import { Table, Loader } from '@reapit/elements'
import { useSelector } from 'react-redux'
import { selectMonthlyBilling, selectMonthlyBillingLoading } from '@/selector/developer'
import { BillingBreakdownForMonthV2Model, ServiceItemBillingV2Model } from '@reapit/foundations-ts-definitions'

export const prepareTableData = (data: ServiceItemBillingV2Model[]) => {
  if (!data || !data.length) return []

  return data.map(({ items = [], ...row }) => {
    return { ...row, subRows: prepareTableData(items) }
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

const CostExplorerTable: React.FC = () => {
  const monthlyBilling = useSelector(selectMonthlyBilling)
  const isLoading = useSelector(selectMonthlyBillingLoading)

  if (isLoading) return <Loader />

  const { services = [] } = monthlyBilling

  const columns = prepareTableColumns(monthlyBilling)
  const tableData = prepareTableData(services)

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
