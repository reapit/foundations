import { trafficStatisticsSagas, appHttpTrafficEventListen, apphttpTrafficEventSaga } from '../traffic-statistics'
import { notification } from '@reapit/elements'
import errorMessages from '@/constants/error-messages'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, fork, call } from '@redux-saga/core/effects'
import { Action, ActionType } from '@/types/core'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import {
  HttpTrafficPerDayParams,
  fetchTrafficStatisticsSuccess,
  fetchTrafficStatisticsFailed,
} from '@/actions/traffic-statistics'
import { httpTrafficPerDayStub } from '@/sagas/__stubs__/app-http-traffic-event'
import { fetchTrafficStatistics } from '@/services/traffic-statistics'

jest.mock('@/services/traffic-statistics')
jest.mock('@reapit/elements', () => ({
  ...jest.requireActual('@reapit/elements'),
  notification: {
    error: jest.fn(),
  },
}))

const params = {
  type: 'FETCH_TRAFFIC_STATISTICS' as ActionType,
  data: {
    applicationId: ['4fbbb1e8-bad0-43a2-98f9-bfb9bba366e7'],
    dateFrom: '2020-02-17T10:27:44Z',
  },
}

describe('app-http-traffic-per-day sagas', () => {
  describe('appHttpTrafficSaga', () => {
    const gen = cloneableGenerator(apphttpTrafficEventSaga)(params)
    expect(gen.next().value).toEqual(call(fetchTrafficStatistics, params.data))

    test('api call success', () => {
      const clone = gen.clone()
      expect(clone.next(httpTrafficPerDayStub).value).toEqual(put(fetchTrafficStatisticsSuccess(httpTrafficPerDayStub)))
    })

    test('api fail sagas', () => {
      const clone = gen.clone()
      if (clone.throw) {
        expect(clone.throw(errorMessages.DEFAULT_SERVER_ERROR).value).toEqual(put(fetchTrafficStatisticsFailed()))
        expect(clone.next().value).toEqual(
          call(notification.error, {
            message: errorMessages.DEFAULT_SERVER_ERROR,
            placement: 'bottomRight',
          }),
        )
      }
      expect(clone.next().done).toBe(true)
    })
  })

  describe('app-http-traffic-per-day thunks', () => {
    describe('appHttpTrafficEventListen', () => {
      it('should trigger saga function when called', () => {
        const gen = appHttpTrafficEventListen()
        expect(gen.next().value).toEqual(
          takeLatest<Action<HttpTrafficPerDayParams>>(ActionTypes.FETCH_TRAFFIC_STATISTICS, apphttpTrafficEventSaga),
        )

        expect(gen.next().done).toBe(true)
      })
    })

    describe('trafficStatisticsSagas', () => {
      it('should listen data request', () => {
        const gen = trafficStatisticsSagas()

        expect(gen.next().value).toEqual(all([fork(appHttpTrafficEventListen)]))
        expect(gen.next().done).toBe(true)
      })
    })
  })
})
