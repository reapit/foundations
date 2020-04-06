import * as React from 'react'
import { Table, H4 } from '@reapit/elements'

export type TrafficEventTableProps = {}

const mockData = {
  from: '2020-02-01',
  to: '2020-04-01',
  totalRequestCount: 92,
  totalEndpointCount: 2,
  requestsByEndpoint: [
    {
      endpoint: 'properties',
      requestCount: 46,
    },
    {
      endpoint: 'propertyImages',
      requestCount: 46,
    },
  ],
}

export const trafficEventTableColumn = [
  {
    Header: 'Endpoint',
    accessor: 'endpoint',
    columnProps: {
      width: 500,
    },
    Footer: 'Total',
  },
  {
    Header: 'Hits',
    accessor: 'requestCount',
    Footer: () => {
      // Only calculate total visits if rows change
      return mockData.totalRequestCount
    },
  },
]

export const TrafficEventTable: React.FC<TrafficEventTableProps> = () => {
  return (
    <>
      <H4>Hits By Endpoint</H4>
      <Table bordered scrollable columns={trafficEventTableColumn} data={mockData.requestsByEndpoint} loading={false} />
    </>
  )
}

export default TrafficEventTable
