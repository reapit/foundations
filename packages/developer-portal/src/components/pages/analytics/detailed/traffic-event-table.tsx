import * as React from 'react'
import { Table, H5, Section } from '@reapit/elements'
import { TrafficEventsModel } from '@/reducers/traffic-statistics/list'
import FadeIn from '../../../../styles/fade-in'
import { Loader } from '@reapit/elements/v3'

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

  if (loading) {
    return <Loader label="Loading" />
  }
  return (
    <Section hasMargin={false} hasBoxShadow>
      <H5>Hits By Resource</H5>
      <p className="mb-4">
        A breakdown of the endpoints that your application(s) have sent requests to (grouped by resource)
      </p>
      <FadeIn>
        <Table
          bordered
          scrollable
          columns={trafficEventTableColumn}
          data={requestsByEndpoint}
          loading={loading}
          maxHeight={450}
        />
      </FadeIn>
    </Section>
  )
}

export default TrafficEventTable
