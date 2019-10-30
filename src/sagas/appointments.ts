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
import { REAPIT_API_BASE_URL } from '../constants/api'
import { AppointmentRequestParams } from '@/actions/appointments'
import { initAuthorizedRequestHeaders } from '@/utils/api'
import { sortAppoinmentsByStartTime } from '@/utils/sortAppoinmentsByStartTime'

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

  let start: dayjs.ConfigType
  let end: dayjs.ConfigType

  if (time === 'Today') {
    start = dayjs().startOf('day')
    end = dayjs().endOf('day')
  } else if (time === 'Tomorrow') {
    start = dayjs()
      .add(1, 'day')
      .startOf('day')
    end = dayjs()
      .add(1, 'day')
      .endOf('day')
  } else {
    start = dayjs().startOf('day')
    end = dayjs()
      .add(1, 'week')
      .subtract(1, 'day')
      .endOf('day')
  }

  // Enable this to fetch past data if there is no data for current period
  // start = dayjs().subtract(150, 'day')
  // end = dayjs()
  try {
    const headers = yield call(initAuthorizedRequestHeaders)
    const appointments = yield call(fetcher, {
      url: `${
        URLS.appointments
      }?Start=${start.toISOString()}&End=${end.toISOString()}&IncludeCancelled=true&IncludeUnconfirmed=true`,
      api: REAPIT_API_BASE_URL,
      method: 'GET',
      headers
    })

    // Sort appoinments by start time
    if (appointments && appointments.data) {
      const sortedAppoinments = yield call(sortAppoinmentsByStartTime, appointments.data)
      appointments.data = sortedAppoinments
    }

    const appointmentTypes = yield call(fetcher, {
      url: URLS.appointmentTypes,
      api: REAPIT_API_BASE_URL,
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
