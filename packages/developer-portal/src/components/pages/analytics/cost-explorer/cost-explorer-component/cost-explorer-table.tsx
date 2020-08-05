import * as React from 'react'
import { Table, Loader } from '@reapit/elements'
import { useSelector } from 'react-redux'
import { selectMonthlyBillingLoading } from '@/selector/developer'
import { TableData } from './cost-explorer'

type CostExplorerTableProps = {
  tableData: TableData
  columns: any[]
}
const CostExplorerTable: React.FC<CostExplorerTableProps> = ({ columns, tableData }) => {
  const isLoading = useSelector(selectMonthlyBillingLoading)

  if (isLoading) return <Loader />

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
