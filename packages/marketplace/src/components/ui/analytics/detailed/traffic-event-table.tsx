import * as React from 'react'
import { Table, H4 } from '@reapit/elements'
import { TrafficEventsModel } from '@/reducers/app-http-traffic-event'

export type TrafficEventTableProps = {
  trafficEvents: TrafficEventsModel | null
  loading?: boolean | false
}

export const prepareColumnsData = (trafficEvents: TrafficEventsModel | null) => {
  return () => {
    return [
      {
        Header: 'Endpoint',
        accessor: 'endpoint',
        Footer: 'Total',
      },
      {
        Header: 'Hits',
        accessor: 'requestCount',
        Footer: () => {
          return trafficEvents ? trafficEvents.totalRequestCount : 0
        },
      },
    ]
  }
}

export const TrafficEventTable: React.FC<TrafficEventTableProps> = ({ trafficEvents, loading }) => {
  const requestsByEndpoint = trafficEvents?.requestsByEndpoint || []

  const trafficEventTableColumn = React.useMemo(prepareColumnsData(trafficEvents), [trafficEvents])

  return (
    <>
      <H4>Hits By Endpoint</H4>
      <Table
        bordered
        scrollable
        columns={trafficEventTableColumn}
        data={requestsByEndpoint}
        loading={loading}
        maxHeight={450}
      />
    </>
  )
}

export default TrafficEventTable
