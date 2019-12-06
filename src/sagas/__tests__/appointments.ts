import appointmentsSagas, { appointmentsDataFetch, appointmentsDataListen } from '@/sagas/appointments'
import { AppointmentModel, ListItemModel } from '@/types/platform'
import { sortAppoinmentsByStartTime } from '@/utils/sortAppoinmentsByStartTime'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, fork, call, select } from '@redux-saga/core/effects'
import {
  appointmentsLoading,
  appointmentsReceiveTodayData,
  AppointmentRequestParams,
  appointmentsReceiveTomorrowData,
  appointmentsReceiveWeekData
} from '@/actions/appointments'
import { selectOnlineStatus } from '@/selectors/online'
import { Action } from '@/types/core'
import { fetcher } from '@reapit/elements'
import { REAPIT_API_BASE_URL, URLS } from '@/constants/api'
import { initAuthorizedRequestHeaders } from '@/utils/api'

import { appointmentsDataStub } from '../__stubs__/appointments'
import { AppointmentsTime } from '@/reducers/appointments'
import errorMessages from '@/constants/error-messages'
import { errorThrownServer } from '@/actions/error'
import {
  selectAppointmentTypes,
  selectTodayAppointments,
  selectTomorrowAppointments,
  selectWeekAppointments
} from '@/selectors/appointments'
import { cloneableGenerator } from '@redux-saga/testing-utils'

jest.mock('../../core/store')
jest.mock('@reapit/elements')
jest.mock('@reapit/cognito-auth')

const params: Action<AppointmentRequestParams> = {
  data: { time: 'Today' as AppointmentsTime },
  type: 'APPOINTMENTS_REQUEST_DATA'
}

const params1: Action<AppointmentRequestParams> = {
  data: { time: 'Tomorrow' as AppointmentsTime },
  type: 'APPOINTMENTS_REQUEST_DATA'
}

const params2: Action<AppointmentRequestParams> = {
  data: { time: 'Week View' as AppointmentsTime },
  type: 'APPOINTMENTS_REQUEST_DATA'
}

const mockOnlineVal = true
const mockOfflineVal = false

const mockHeaders = {
  Authorization: '123'
}

describe('appointments should not fetch data', () => {
  it('for Today', () => {
    const gen = cloneableGenerator(appointmentsDataFetch as any)(params)
    expect(gen.next().value).toEqual(select(selectOnlineStatus))
    expect(gen.next(mockOfflineVal as any).value).toEqual(select(selectAppointmentTypes))
    expect(gen.next([{}] as any).value).toEqual(select(selectTodayAppointments))
    expect(gen.next(appointmentsDataStub.appointments).value).toEqual(
      put(
        appointmentsReceiveTodayData({
          appointments: appointmentsDataStub.appointments,
          appointmentTypes: [{}] as ListItemModel[]
        })
      )
    )
    expect(gen.next().done).toEqual(true)
  })
  it('for Tomorrow', () => {
    const gen = cloneableGenerator(appointmentsDataFetch as any)(params1)
    expect(gen.next().value).toEqual(select(selectOnlineStatus))
    expect(gen.next(mockOfflineVal as any).value).toEqual(select(selectAppointmentTypes))
    expect(gen.next([{}] as any).value).toEqual(select(selectTomorrowAppointments))
    expect(gen.next(appointmentsDataStub.appointments).value).toEqual(
      put(
        appointmentsReceiveTomorrowData({
          appointments: appointmentsDataStub.appointments,
          appointmentTypes: [{}] as ListItemModel[]
        })
      )
    )
    expect(gen.next().done).toEqual(true)
  })

  it('for Week View', () => {
    const gen = cloneableGenerator(appointmentsDataFetch as any)(params2)
    expect(gen.next().value).toEqual(select(selectOnlineStatus))
    expect(gen.next(mockOfflineVal as any).value).toEqual(select(selectAppointmentTypes))
    expect(gen.next([{}] as any).value).toEqual(select(selectWeekAppointments))
    expect(gen.next(appointmentsDataStub.appointments).value).toEqual(
      put(
        appointmentsReceiveWeekData({
          appointments: appointmentsDataStub.appointments,
          appointmentTypes: [{}] as ListItemModel[]
        })
      )
    )
    expect(gen.next().done).toEqual(true)
  })
})

describe('appointments should fetch data', () => {
  const gen = cloneableGenerator(appointmentsDataFetch as any)(params)

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
  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(appointmentsDataStub.appointments as any).value).toEqual(
      call(sortAppoinmentsByStartTime, appointmentsDataStub?.appointments?._embedded as AppointmentModel[])
    )

    expect(clone.next(appointmentsDataStub.appointments as any).value).toEqual(
      call(fetcher, {
        url: URLS.appointmentTypes,
        api: REAPIT_API_BASE_URL,
        method: 'GET',
        headers: mockHeaders
      })
    )

    expect(clone.next(appointmentsDataStub.appointmentTypes as any).value).toEqual(
      put(
        appointmentsReceiveTodayData({
          appointments: appointmentsDataStub.appointments as any,
          appointmentTypes: appointmentsDataStub.appointmentTypes
        })
      )
    )

    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    // @ts-ignore
    expect(clone.throw(new Error(errorMessages.DEFAULT_SERVER_ERROR)).value).toEqual(
      put(
        errorThrownServer({
          type: 'SERVER',
          message: errorMessages.DEFAULT_SERVER_ERROR
        })
      )
    )
    expect(clone.next().done).toBe(true)
  })
})

describe('appointments should fetch data tomowrrow', () => {
  const gen = cloneableGenerator(appointmentsDataFetch as any)(params1)

  expect(gen.next().value).toEqual(select(selectOnlineStatus))
  expect(gen.next(mockOnlineVal as any).value).toEqual(put(appointmentsLoading(true)))
  expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))

  expect(gen.next(mockHeaders as any).value).toEqual(
    call(fetcher, {
      url:
        '/appointments?Start=2019-10-11T00:00:00.000Z&End=2019-10-11T23:59:59.999Z&IncludeCancelled=true&IncludeUnconfirmed=true',
      api: REAPIT_API_BASE_URL,
      method: 'GET',
      headers: mockHeaders
    })
  )
  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(appointmentsDataStub.appointments as any).value).toEqual(
      call(sortAppoinmentsByStartTime, appointmentsDataStub.appointments?._embedded as AppointmentModel[])
    )

    expect(clone.next(appointmentsDataStub.appointments as any).value).toEqual(
      call(fetcher, {
        url: URLS.appointmentTypes,
        api: REAPIT_API_BASE_URL,
        method: 'GET',
        headers: mockHeaders
      })
    )

    expect(clone.next(appointmentsDataStub.appointmentTypes as any).value).toEqual(
      put(
        appointmentsReceiveTomorrowData({
          appointments: appointmentsDataStub.appointments as any,
          appointmentTypes: appointmentsDataStub.appointmentTypes
        })
      )
    )

    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    // @ts-ignore
    expect(clone.throw(new Error(errorMessages.DEFAULT_SERVER_ERROR)).value).toEqual(
      put(
        errorThrownServer({
          type: 'SERVER',
          message: errorMessages.DEFAULT_SERVER_ERROR
        })
      )
    )
    expect(clone.next().done).toBe(true)
  })
})

describe('appointments should fetch data week view', () => {
  const gen = cloneableGenerator(appointmentsDataFetch as any)(params2)

  expect(gen.next().value).toEqual(select(selectOnlineStatus))
  expect(gen.next(mockOnlineVal as any).value).toEqual(put(appointmentsLoading(true)))
  expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))

  expect(gen.next(mockHeaders as any).value).toEqual(
    call(fetcher, {
      url:
        '/appointments?Start=2019-10-10T00:00:00.000Z&End=2019-10-16T23:59:59.999Z&IncludeCancelled=true&IncludeUnconfirmed=true',
      api: REAPIT_API_BASE_URL,
      method: 'GET',
      headers: mockHeaders
    })
  )
  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(appointmentsDataStub.appointments).value).toEqual(
      call(sortAppoinmentsByStartTime, appointmentsDataStub?.appointments?._embedded as AppointmentModel[])
    )

    expect(clone.next(appointmentsDataStub.appointments).value).toEqual(
      call(fetcher, {
        url: URLS.appointmentTypes,
        api: REAPIT_API_BASE_URL,
        method: 'GET',
        headers: mockHeaders
      })
    )

    expect(clone.next(appointmentsDataStub.appointmentTypes).value).toEqual(
      put(
        appointmentsReceiveWeekData({
          appointments: appointmentsDataStub.appointments,
          appointmentTypes: appointmentsDataStub.appointmentTypes
        })
      )
    )

    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    // @ts-ignore
    expect(clone.throw(new Error(errorMessages.DEFAULT_SERVER_ERROR)).value).toEqual(
      put(
        errorThrownServer({
          type: 'SERVER',
          message: errorMessages.DEFAULT_SERVER_ERROR
        })
      )
    )
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
