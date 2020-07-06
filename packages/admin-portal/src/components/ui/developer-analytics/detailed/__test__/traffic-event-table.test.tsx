import * as React from 'react'
import { shallow } from 'enzyme'
import TrafficEventTable, { prepareColumnsData } from '../traffic-event-table'
import { httpTrafficPerDayStub } from '@/sagas/__stubs__/app-http-traffic-event'

describe('TrafficEventTable', () => {
  it('should match snapshot', () => {
    expect(shallow(<TrafficEventTable trafficEvents={httpTrafficPerDayStub} />)).toMatchSnapshot()
  })
  it('should match snapshot if data is empty', () => {
    expect(shallow(<TrafficEventTable trafficEvents={null} />)).toMatchSnapshot()
  })
  it('should match snapshot when loading', () => {
    expect(shallow(<TrafficEventTable trafficEvents={httpTrafficPerDayStub} loading={true} />)).toMatchSnapshot()
  })
  describe('prepareColumnsData', () => {
    const fn = prepareColumnsData(httpTrafficPerDayStub)
    const trafficEventsTableColumns = fn()
    it('should return 2 columns in total', () => {
      expect(trafficEventsTableColumns).toHaveLength(2)
    })
    it('should return valid Header, accessor and Footer for each column', () => {
      trafficEventsTableColumns.forEach(({ Header, accessor, columnProps, Footer }, index) => {
        if (index === 0) {
          expect(Header).toEqual('Resource')
          expect(accessor).toEqual('endpoint')
          expect(columnProps?.className).toEqual('capitalize')
          expect(Footer).toEqual('Total')
        }
        if (index === 1) {
          expect(Header).toEqual('Hits')
          expect(accessor).toEqual('requestCount')
          if (typeof Footer === 'function') {
            const totalRequest = Footer()
            expect(totalRequest).toBe(httpTrafficPerDayStub.totalRequestCount)
          }
        }
      })
    })
  })
})
