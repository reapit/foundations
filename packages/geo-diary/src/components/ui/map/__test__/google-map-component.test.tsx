import React from 'react'
import { shallow } from 'enzyme'
import {
  GoogleMapComponent,
  handleMarkerClick,
  handleSetAppointment,
  renderInfoWindowContent,
} from '../google-map-component'
import { mockAppointmentsQuery } from '../../../pages/appointment/__mocks__/appointments-query'
import { ExtendedAppointmentModel } from '../../../../types/global'
import { combineAddress } from '@reapit/elements'

const appointments = mockAppointmentsQuery.data.GetAppointments._embedded as ExtendedAppointmentModel[]

jest.mock('../../../../core/app-state')

describe('GoogleMapComponent', () => {
  it('should match snapshot with an appointment', () => {
    expect(shallow(<GoogleMapComponent appointments={appointments} />)).toMatchSnapshot()
  })

  it('should handle set appointment', () => {
    const setAppState = jest.fn()
    const appointment = appointments[2]
    const curried = handleSetAppointment({
      appointments,
      setAppState,
      appointmentId: appointment.id ?? null,
    })

    curried()

    const newState = setAppState.mock.calls[0][0]()

    expect(newState).toEqual({
      appointment,
      destinationLat: appointment.property?.address?.geolocation?.latitude,
      destinationLng: appointment.property?.address?.geolocation?.longitude,
      destinationAddress: combineAddress(appointment?.property?.address),
    })
  })

  it('should handle marker click', () => {
    const setAppState = jest.fn()
    const appointmentId = appointments[2].id ?? ''
    handleMarkerClick({
      appointmentId,
      setAppState,
    })

    const newState = setAppState.mock.calls[0][0]()

    expect(newState).toEqual({
      appointmentId,
    })
  })

  it('should render an info  window string', () => {
    const params = { latlng: { lat: 231332, lng: 232131 }, address: 'SOME_ADDRESS' }
    const result = renderInfoWindowContent(params)

    expect(result.includes(params.address)).toBe(true)
    expect(result.includes(String(params.latlng.lat))).toBe(true)
    expect(result.includes(String(params.latlng.lng))).toBe(true)
  })
})
