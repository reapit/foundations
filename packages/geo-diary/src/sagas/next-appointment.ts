import { put, fork, takeLatest, all, call, select } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { selectAppointments } from '@/selectors/appointments'
import { getTodayNextAppointment } from '@/utils/get-today-next-appointment'
import { nextAppointmentValidateSuccess, nextAppointmentClear } from '@/actions/next-appointment'
import { selectUserCode } from '@/selectors/auth'
import { Action } from '@/types/core'
import { getLoggedInUser } from '../components/common/appointment-detail/appointment-detail'

type Position = {
  lat: number
  lng: number
}

export const getCurrentPosition = function() {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

export const callCurrentPosition = function({
  origin,
  destination,
  travelMode = google.maps.TravelMode.DRIVING,
}: {
  origin: Position
  destination: Position
  travelMode?: google.maps.TravelMode
}) {
  return new Promise(function(resolve) {
    if (window.google) {
      const origins = [new google.maps.LatLng(origin.lat, origin.lng)]
      const destinations = [new google.maps.LatLng(destination.lat, destination.lng)]

      const service = new google.maps.DistanceMatrixService()
      service.getDistanceMatrix(
        {
          origins,
          destinations,
          travelMode,
        },
        response => {
          resolve(response)
        },
      )
    }
  })
}

export const validateNextAppointment = function*({ data: travelMode }: Action<string>) {
  const appointments = yield select(selectAppointments)
  const appointment = getTodayNextAppointment(appointments)

  if (window.google && appointment?.property?.address?.geolocation) {
    try {
      const {
        coords: { latitude, longitude },
      } = yield call(getCurrentPosition)

      const testLatitude = 52.130189
      const testLongitude = -0.757117

      const response: google.maps.DistanceMatrixResponse = yield call(callCurrentPosition, {
        origin: { lat: latitude, lng: longitude },
        destination: {
          lat: appointment?.property?.address?.geolocation?.latitude || testLatitude,
          lng: appointment?.property?.address?.geolocation?.longitude || testLongitude,
        },
        travelMode: travelMode === 'DRIVING' ? google.maps.TravelMode.DRIVING : google.maps.TravelMode.WALKING,
      })

      if (
        response.rows[0].elements[0].status === google.maps.DistanceMatrixElementStatus.OK &&
        response.rows[0].elements[0] &&
        response.rows[0].elements[0].status === google.maps.DistanceMatrixElementStatus.OK
      ) {
        const userCode = yield select(selectUserCode)

        const attendeeWithMobile = appointment.attendee?.contacts?.filter(attendee => {
          if (!attendee.mobilePhone) {
            return false
          }
          return attendee
        })[0]

        const currentNegotiator = getLoggedInUser(appointment.negotiators, userCode)
        const durationValue = response.rows?.[0]?.elements?.[0]?.duration?.value || 0
        const durationText = response.rows?.[0]?.elements?.[0]?.duration?.text || ''
        const distanceValue = response.rows?.[0]?.elements?.[0]?.distance?.value || 0
        const distanceText = response.rows?.[0]?.elements?.[0]?.distance?.text || ''
        yield put(
          nextAppointmentValidateSuccess({
            durationText,
            durationValue,
            distanceText,
            distanceValue,
            attendeeWithMobile,
            currentNegotiator,
            id: appointment.id as string,
          }),
        )
      }
    } catch (err) {
      console.error(err.message)
      yield put(nextAppointmentClear())
    }
  } else {
    yield put(nextAppointmentClear())
  }
}

export const nextAppointmentDataListen = function*() {
  yield takeLatest<Action<string>>(ActionTypes.NEXT_APPOINTMENT_VALIDATE, validateNextAppointment)
}

const nextAppointmentSagas = function*() {
  yield all([fork(nextAppointmentDataListen)])
}

export default nextAppointmentSagas
