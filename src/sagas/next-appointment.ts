import { put, fork, takeLatest, all, call, select } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { selectAppointments } from '@/selectors/appointments'
import { getTodayNextAppointment } from '@/utils/get-today-next-appointment'
import { nextAppointmentValidateSuccess, nextAppointmentClear } from '@/actions/next-appointment'
import { oc } from 'ts-optchain'
import { selectUserCode } from '@/selectors/auth'
import { filterLoggedInUser } from '@/components/common/appointment-detail/appointment-detail'

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
  travelMode = google.maps.TravelMode.DRIVING
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
          travelMode
        },
        response => {
          resolve(response)
        }
      )
    }
  })
}

export const validateNextAppointment = function*() {
  const appointments = yield select(selectAppointments)
  const appointment = getTodayNextAppointment(appointments)

  if (window.google && appointment && appointment.property && appointment.property.geolocation) {
    try {
      const {
        coords: { latitude, longitude }
      } = yield getCurrentPosition()

      // Enable for testing
      // const latitude = 52.130189
      // const longitude = -0.757117

      const response: google.maps.DistanceMatrixResponse = yield call(callCurrentPosition, {
        origin: { lat: latitude, lng: longitude },
        destination: {
          lat: appointment.property.geolocation.latitude as number,
          lng: appointment.property.geolocation.longitude as number
        }
      })

      if (
        response.rows[0].elements[0].status === google.maps.DistanceMatrixElementStatus.OK &&
        response.rows[0].elements[0] &&
        response.rows[0].elements[0].status === google.maps.DistanceMatrixElementStatus.OK
      ) {
        const userCode = yield select(selectUserCode)
        const attendeeHaveMobile = filterLoggedInUser(appointment.attendees, userCode).filter(attendee => {
          if (!attendee.communicationDetails) {
            return false
          }
          return attendee.communicationDetails.findIndex(({ label }) => label === 'Mobile') > -1
        })[0]
        const durationValue = oc(response).rows[0].elements[0].duration.value(0)
        const durationText = oc(response).rows[0].elements[0].duration.text('')
        const distanceValue = oc(response).rows[0].elements[0].distance.value(0)
        const distanceText = oc(response).rows[0].elements[0].distance.text('')
        yield put(
          nextAppointmentValidateSuccess({
            durationText,
            durationValue,
            distanceText,
            distanceValue,
            attendeeHaveMobile,
            id: appointment.id as string
          })
        )
      }
    } catch (err) {
      console.log(err)
      yield put(nextAppointmentClear())
    }
  } else {
    yield put(nextAppointmentClear())
  }
}

export const nextAppointmentDataListen = function*() {
  yield takeLatest(ActionTypes.NEXT_APPOINTMENT_VALIDATE, validateNextAppointment)
}

const nextAppointmentSagas = function*() {
  yield all([fork(nextAppointmentDataListen)])
}

export default nextAppointmentSagas
