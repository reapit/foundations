import {
  selectTodayAppointments,
  selectAppointmentTypes,
  selectTomorrowAppointments,
  selectWeekAppointments
} from './../selectors/appointments'
import {
  appointmentsReceiveTodayData,
  appointmentsReceiveTomorrowData,
  appointmentsReceiveWeekData,
  appointmentsLoading,
  appointmentsRequestDataFailure
} from './../actions/appointments'
import dayjs from 'dayjs'
import { put, fork, takeLatest, all, call, select } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { URLS } from '@/constants/api'
import { fetcher } from '@reapit/elements'
import { Action } from '@/types/core'
import { selectOnlineStatus } from '@/selectors/online'
import { selectUserCode } from '@/selectors/auth'
import { AppointmentRequestParams } from '@/actions/appointments'
import { initAuthorizedRequestHeaders } from '@/utils/api'
import { sortAppoinmentsByStartTime } from '@/utils/sortAppoinmentsByStartTime'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export const getStartAndEndDate = (time: 'Today' | 'Tomorrow' | 'Week View') => {
  if (time === 'Today') {
    const start = dayjs()
      .startOf('day')
      .utc()
    const end = dayjs()
      .endOf('day')
      .utc()
    return { start, end }
  }
  if (time === 'Tomorrow') {
    const start = dayjs()
      .add(1, 'day')
      .startOf('day')
      .utc()
    const end = dayjs()
      .add(1, 'day')
      .endOf('day')
      .utc()
    return { start, end }
  }
  const start = dayjs().startOf('day')
  const end = dayjs()
    .add(1, 'week')
    .subtract(1, 'day')
    .endOf('day')
    .utc()
  return { start, end }
}

export const appointmentsDataFetch = function*({ data: { time } }: Action<AppointmentRequestParams>) {
  const online = yield select(selectOnlineStatus)

  if (!online) {
    let appointments = null
    let appointmentTypes = yield select(selectAppointmentTypes)

    switch (time) {
      case 'Today':
        appointments = yield select(selectTodayAppointments)
        yield put(appointmentsReceiveTodayData({ appointments, appointmentTypes }))
        break

      case 'Tomorrow':
        appointments = yield select(selectTomorrowAppointments)
        yield put(appointmentsReceiveTomorrowData({ appointments, appointmentTypes }))
        break

      case 'Week View':
        appointments = yield select(selectWeekAppointments)
        yield put(appointmentsReceiveWeekData({ appointments, appointmentTypes }))
        break
    }

    return
  }

  yield put(appointmentsLoading(true))
  const { start, end } = getStartAndEndDate(time)
  const userCode = yield select(selectUserCode)
  try {
    const headers = yield call(initAuthorizedRequestHeaders)
    const appointments = yield call(fetcher, {
      url: `${
        URLS.appointments
      }?NegotiatorId=${userCode}&Start=${start.toISOString()}&End=${end.toISOString()}&IncludeCancelled=true&IncludeUnconfirmed=true`,
      api: process.env.PLATFORM_API_BASE_URL as string,
      method: 'GET',
      headers
    })

    // Sort appoinments by start time
    if (appointments && appointments._embedded) {
      const sortedAppoinments = yield call(sortAppoinmentsByStartTime, appointments._embedded)
      appointments.data = sortedAppoinments
    }

    const appointmentTypes = yield call(fetcher, {
      url: URLS.appointmentTypes,
      api: process.env.PLATFORM_API_BASE_URL as string,
      method: 'GET',
      headers
    })

    if (appointments && appointmentTypes) {
      switch (time) {
        case 'Today':
          yield put(appointmentsReceiveTodayData({ appointments, appointmentTypes }))
          break

        case 'Tomorrow':
          yield put(appointmentsReceiveTomorrowData({ appointments, appointmentTypes }))
          break

        case 'Week View':
          yield put(appointmentsReceiveWeekData({ appointments, appointmentTypes }))
          break
      }
    } else {
      yield put(appointmentsRequestDataFailure())
    }
  } catch (err) {
    console.error(err.message)
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  }
}

export const appointmentsDataListen = function*() {
  yield takeLatest<Action<AppointmentRequestParams>>(ActionTypes.APPOINTMENTS_REQUEST_DATA, appointmentsDataFetch)
}

const appointmentsSagas = function*() {
  yield all([fork(appointmentsDataListen)])
}

export default appointmentsSagas
