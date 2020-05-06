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
        Header: 'Resource',
        accessor: 'endpoint',
        columnProps: {
          className: 'capitalize',
        },
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
      <H4>Hits By Resource</H4>
      <p className="is-italic mb-4">
        A breakdown of the endpoints that your application(s) have sent requests to (grouped by resource)
      </p>
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
