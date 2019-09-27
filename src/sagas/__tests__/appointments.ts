import appointmentsSagas, { appointmentsDataFetch, appointmentsDataListen } from '@/sagas/appointments'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, fork, call, select } from '@redux-saga/core/effects'
import {
  appointmentsLoading,
  appointmentsReceiveData,
  appointmentsRequestDataFailure,
  AppointmentRequestParams
} from '@/actions/appointments'
import { selectOnlineStatus } from '@/selectors/online'
import { Action } from '@/types/core'
import { fetcher } from '@reapit/elements'
import { REAPIT_API_BASE_URL, URLS } from '@/constants/api'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { initAuthorizedRequestHeaders } from '@/utils/api'

import { appointmentsDataStub } from '../__stubs__/appointments'

jest.mock('../../core/store')
jest.mock('@reapit/elements')

const params: Action<AppointmentRequestParams> = {
  data: { time: 'Today' },
  type: 'APPOINTMENTS_REQUEST_DATA'
}

const mockOnlineVal = true
const mockOfflineVal = false

const mockHeaders = {
  Authorization: '123'
}

describe('appointments should not fetch data', () => {
  const gen = cloneableGenerator(appointmentsDataFetch)(params)

  expect(gen.next().value).toEqual(select(selectOnlineStatus))
  // @ts-ignore
  expect(gen.next(mockOfflineVal).done).toBe(true)
})

describe('appointments should fetch data', () => {
  test('api call success', () => {
    const gen = appointmentsDataFetch(params)

    expect(gen.next().value).toEqual(select(selectOnlineStatus))
    // @ts-ignore
    expect(gen.next(mockOnlineVal).value).toEqual(put(appointmentsLoading(true)))
    expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))
    expect(gen.next(mockHeaders).value).toEqual(
      call(fetcher, {
        url:
          '/appointments?Start=2019-12-18T00:00:00.000Z&End=2019-12-18T23:59:59.999Z&IncludeCancelled=true&IncludeUnconfirmed=true',
        api: REAPIT_API_BASE_URL,
        method: 'GET',
        headers: mockHeaders
      })
    )

    expect(gen.next(appointmentsDataStub.appointments).value).toEqual(
      call(fetcher, {
        url: URLS.appointmentTypes,
        api: REAPIT_API_BASE_URL,
        method: 'GET',
        headers: mockHeaders
      })
    )
    expect(gen.next(appointmentsDataStub.appointmentTypes).value).toEqual(
      put(
        appointmentsReceiveData({
          appointments: appointmentsDataStub.appointments,
          appointmentTypes: appointmentsDataStub.appointmentTypes
        })
      )
    )
    expect(gen.next().done).toBe(true)
  })

  test('api call fail', () => {
    const gen = appointmentsDataFetch(params)

    expect(gen.next().value).toEqual(select(selectOnlineStatus))
    // @ts-ignore
    expect(gen.next(mockOnlineVal).value).toEqual(put(appointmentsLoading(true)))
    expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))
    expect(gen.next(mockHeaders).value).toEqual(
      call(fetcher, {
        url:
          '/appointments?Start=2019-12-18T00:00:00.000Z&End=2019-12-18T23:59:59.999Z&IncludeCancelled=true&IncludeUnconfirmed=true',
        api: REAPIT_API_BASE_URL,
        method: 'GET',
        headers: mockHeaders
      })
    )

    expect(gen.next(null).value).toEqual(
      call(fetcher, {
        url: URLS.appointmentTypes,
        api: REAPIT_API_BASE_URL,
        method: 'GET',
        headers: mockHeaders
      })
    )
    expect(gen.next().value).toEqual(put(appointmentsRequestDataFailure()))
    expect(gen.next().done).toBe(true)
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
