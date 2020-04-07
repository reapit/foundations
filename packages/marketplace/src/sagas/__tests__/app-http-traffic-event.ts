import appHttpTrafficEventSagas, {
  appHttpTrafficEventListen,
  fetchHttpTraficPerDay,
  apphttpTrafficEventSaga,
} from '../app-http-trafic-event'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, fork, call } from '@redux-saga/core/effects'
import { Action, ActionType } from '@/types/core'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import {
  HttpTrafficPerDayParams,
  httpTrafficPerDayReceiveData,
  httpTrafficPerDayRequestDataFailure,
} from '@/actions/app-http-traffic-event'
import { httpTrafficPerDayStub } from '../__stubs__/app-http-traffic-event'

jest.mock('@reapit/elements')

const params = {
  type: 'HTTP_TRAFFIC_PER_DAY_REQUEST_DATA' as ActionType,
  data: {
    applicationId: ['4fbbb1e8-bad0-43a2-98f9-bfb9bba366e7'],
    dateFrom: '2020-02-17T10:27:44Z',
  },
}

describe('app-http-traffic-per-day sagas', () => {
  describe('appHttpTrafficSaga', () => {
    const gen = cloneableGenerator(apphttpTrafficEventSaga)(params)
    expect(gen.next().value).toEqual(call(fetchHttpTraficPerDay, params.data))

    test('api call success', () => {
      const clone = gen.clone()
      expect(clone.next(httpTrafficPerDayStub).value).toEqual(put(httpTrafficPerDayReceiveData(httpTrafficPerDayStub)))
    })

    test('api fail sagas', () => {
      const clone = gen.clone()
      if (clone.throw) {
        expect(clone.throw(new Error('')).value).toEqual(put(httpTrafficPerDayRequestDataFailure()))
        expect(clone.next().value).toEqual(
          put(
            errorThrownServer({
              type: 'SERVER',
              message: errorMessages.DEFAULT_SERVER_ERROR,
            }),
          ),
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
          takeLatest<Action<HttpTrafficPerDayParams>>(
            ActionTypes.HTTP_TRAFFIC_PER_DAY_REQUEST_DATA,
            apphttpTrafficEventSaga,
          ),
        )

        expect(gen.next().done).toBe(true)
      })
    })

    describe('appHttpTrafficEventSagas', () => {
      it('should listen data request', () => {
        const gen = appHttpTrafficEventSagas()

        expect(gen.next().value).toEqual(all([fork(appHttpTrafficEventListen)]))
        expect(gen.next().done).toBe(true)
      })
    })
  })
})
