import { StringMap } from './../../types/core'
import appointmentsSagas, { appointmentsDataFetch, appointmentsDataListen } from '@/sagas/appointments'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, fork, call } from '@redux-saga/core/effects'
import {
  appointmentsLoading,
  appointmentsReceiveData,
  appointmentsRequestDataFailure,
  AppointmentRequestParams
} from '@/actions/appointments'
import { Action } from '@/types/core'
import { fetcher } from '@reapit/elements'
import { REAPIT_API_BASE_URL } from '@/constants/api'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { initAuthorizedRequestHeaders } from '@/utils/api'

import { appointmentsDataStub } from '../__stubs__/appointments'

jest.mock('../../core/store')
jest.mock('@reapit/elements')

const params: Action<AppointmentRequestParams> = {
  data: { time: 'Today' },
  type: 'APPOINTMENTS_REQUEST_DATA'
}

const mockHeaders = {
  Authorization: '123'
}

describe('appointments fetch data', () => {
  const gen = cloneableGenerator(appointmentsDataFetch)(params)

  expect(gen.next().value).toEqual(put(appointmentsLoading(true)))
  expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))
  expect(gen.next(mockHeaders as any).value).toEqual(
    call(fetcher, {
      url:
        '/appointments?Start=2019-12-18T00:00:00.000Z&End=2019-12-18T23:59:59.999Z&IncludeCancelled=true&IncludeUnconfirmed=true',
      api: REAPIT_API_BASE_URL,
      method: 'GET',
      headers: mockHeaders
    })
  )

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(appointmentsDataStub.data as any).value).toEqual(
      put(
        appointmentsReceiveData({
          data: appointmentsDataStub.data
        })
      )
    )
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    expect(clone.next().value).toEqual(put(appointmentsRequestDataFailure()))
    expect(clone.next().done).toBe(true)
  })
})

describe('appointments thunks', () => {
  describe('appointmentsDataListen', () => {
    it('should trigger request data when called', () => {
      const gen = appointmentsDataListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<AppointmentRequestParams>>(ActionTypes.APPOINTMENTS_REQUEST_DATA, appointmentsDataFetch)
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('appointmentsSagas', () => {
    it('should listen data request', () => {
      const gen = appointmentsSagas()

      expect(gen.next().value).toEqual(all([fork(appointmentsDataListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
