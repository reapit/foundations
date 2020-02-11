import appUsageStatsSagas, { appUsageStatsListen, fetchAppUsageStats, appUsageStatsSaga } from '../app-usage-stats'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, fork, call } from '@redux-saga/core/effects'
import { Action, ActionType } from '@/types/core'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import {
  AppUsageStatsParams,
  appUsageStatsReceiveData,
  appUsageStatsRequestDataFailure,
} from '@/actions/app-usage-stats'
import { usageStatsDataStub } from '../__stubs__/app-usage-stats'

jest.mock('@reapit/elements')

const params = {
  type: 'APP_USAGE_STATS_REQUEST_DATA' as ActionType,
  data: {
    appId: ['1'],
  },
}

describe('app-usage-stats sagas', () => {
  describe('appUsageStatsSaga', () => {
    const gen = cloneableGenerator(appUsageStatsSaga)(params)
    expect(gen.next().value).toEqual(call(fetchAppUsageStats, params.data))

    test('api call success', () => {
      const clone = gen.clone()
      expect(clone.next(usageStatsDataStub).value).toEqual(put(appUsageStatsReceiveData(usageStatsDataStub)))
    })

    test('api fail sagas', () => {
      const clone = gen.clone()
      if (clone.throw) {
        expect(clone.throw(new Error('')).value).toEqual(put(appUsageStatsRequestDataFailure()))
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

  describe('app-usage-stats thunks', () => {
    describe('appUsageStatsListen', () => {
      it('should trigger saga function when called', () => {
        const gen = appUsageStatsListen()
        expect(gen.next().value).toEqual(
          takeLatest<Action<AppUsageStatsParams>>(ActionTypes.APP_USAGE_STATS_REQUEST_DATA, appUsageStatsSaga),
        )

        expect(gen.next().done).toBe(true)
      })
    })

    describe('appUsageStatsSagas', () => {
      it('should listen data request', () => {
        const gen = appUsageStatsSagas()

        expect(gen.next().value).toEqual(all([fork(appUsageStatsListen)]))
        expect(gen.next().done).toBe(true)
      })
    })
  })
})
