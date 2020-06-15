import React from 'react'
import { H3, FlexContainerBasic, Table } from '@reapit/elements'

export const columns = [
  {
    Header: 'Billing Period',
    accessor: 'billingPeriod',
  },
  {
    Header: 'File',
    accessor: 'file',
  },
]

export const AdminBilling: React.FC = () => {
  return (
    <div>
      <FlexContainerBasic hasPadding flexColumn hasBackground data-test="revision-list-container">
        <div className="mb-5">
          <H3>Billing</H3>
          <Table scrollable={true} loading={false} data={[]} columns={columns} />
        </div>
      </FlexContainerBasic>
    </div>
  )
}

export default AdminBilling
