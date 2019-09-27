import dayjs from 'dayjs'
import { appointmentsLoading, appointmentsReceiveData, appointmentsRequestDataFailure } from '../actions/appointments'
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

export const appointmentsDataFetch = function*({ data: { time } }: Action<AppointmentRequestParams>) {
  const online = yield select(selectOnlineStatus)
  if (!online) {
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
    start = dayjs()
      .add(1, 'week')
      .startOf('week')
      .startOf('day')
    end = dayjs()
      .add(1, 'week')
      .endOf('week')
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

    const appointmentTypes = yield call(fetcher, {
      url: URLS.appointmentTypes,
      api: REAPIT_API_BASE_URL,
      method: 'GET',
      headers
    })

    if (appointments && appointmentTypes) {
      yield put(appointmentsReceiveData({ appointments, appointmentTypes }))
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
