import * as React from 'react'
import { Table, Grid, GridItem } from '@reapit/elements'

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
  },
  {
    Header: 'Hits',
    accessor: 'requestCount',
  },
]

export const TrafficEventTable: React.FC<TrafficEventTableProps> = () => {
  return (
    <>
      <Table bordered scrollable columns={trafficEventTableColumn} data={mockData.requestsByEndpoint} loading={false} />
      <Grid>
        <GridItem>
          <p style={{ padding: '0.5em 0.75em' }}>Total</p>
        </GridItem>
        <GridItem>
          <p style={{ padding: '0.5em 0.75em' }}>{mockData.totalRequestCount}</p>
        </GridItem>
      </Grid>
    </>
  )
}

export default TrafficEventTable
