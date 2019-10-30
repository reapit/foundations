import appointmentsSagas, { appointmentsDataFetch, appointmentsDataListen } from '@/sagas/appointments'
import { PagedResultAppointmentModel_, AppointmentModel } from '@/types/appointments'
import { sortAppoinmentsByStartTime } from '@/utils/sortAppoinmentsByStartTime'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, fork, call, select } from '@redux-saga/core/effects'
import {
  appointmentsLoading,
  appointmentsReceiveData,
  appointmentsReceiveTodayData,
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
import { AppointmentsTime } from '@/reducers/appointments'

jest.mock('../../core/store')
jest.mock('@reapit/elements')

const params: Action<AppointmentRequestParams> = {
  data: { time: 'Today' as AppointmentsTime },
  type: 'APPOINTMENTS_REQUEST_DATA'
}

const mockOnlineVal = true
const mockOfflineVal = false

const mockHeaders = {
  Authorization: '123'
}

describe('appointments should not fetch data', () => {
  const gen = appointmentsDataFetch(params)

  expect(gen.next().value).toEqual(select(selectOnlineStatus))
  expect(gen.next(mockOfflineVal as any).done).toBe(false)
})

describe('appointments should fetch data', () => {
  test('api call success', () => {
    const gen = appointmentsDataFetch(params)

    expect(gen.next().value).toEqual(select(selectOnlineStatus))
    expect(gen.next(mockOnlineVal as any).value).toEqual(put(appointmentsLoading(true)))
    expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))

    expect(gen.next(mockHeaders as any).value).toEqual(
      call(fetcher, {
        url:
          '/appointments?Start=2019-10-10T00:00:00.000Z&End=2019-10-10T23:59:59.999Z&IncludeCancelled=true&IncludeUnconfirmed=true',
        api: REAPIT_API_BASE_URL,
        method: 'GET',
        headers: mockHeaders
      })
    )

    expect(gen.next(appointmentsDataStub.appointments as any).value).toEqual(
      call(sortAppoinmentsByStartTime, (appointmentsDataStub.appointments as any).data as AppointmentModel[])
    )

    expect(gen.next(appointmentsDataStub.appointments as any).value).toEqual(
      call(fetcher, {
        url: URLS.appointmentTypes,
        api: REAPIT_API_BASE_URL,
        method: 'GET',
        headers: mockHeaders
      })
    )

    expect(gen.next(appointmentsDataStub.appointmentTypes as any).value).toEqual(
      put(
        appointmentsReceiveTodayData({
          appointments: appointmentsDataStub.appointments as any,
          appointmentTypes: appointmentsDataStub.appointmentTypes
        })
      )
    )

    expect(gen.next().done).toBe(true)
  })

  test('api call fail', () => {
    const gen = appointmentsDataFetch(params)
    expect(gen.next().value).toEqual(select(selectOnlineStatus))
    expect(gen.next(mockOnlineVal as any).value).toEqual(put(appointmentsLoading(true)))
    expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))

    expect(gen.next(mockHeaders as any).value).toEqual(
      call(fetcher, {
        url:
          '/appointments?Start=2019-10-10T00:00:00.000Z&End=2019-10-10T23:59:59.999Z&IncludeCancelled=true&IncludeUnconfirmed=true',
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
