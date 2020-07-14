import React from 'react'
import { H3, Table, Section } from '@reapit/elements'

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
    <>
      <H3 isHeadingSection>Billing</H3>
      <Section>
        <Table scrollable={true} loading={false} data={[]} columns={columns} />
      </Section>
    </>
  )
}

export default AdminBilling
