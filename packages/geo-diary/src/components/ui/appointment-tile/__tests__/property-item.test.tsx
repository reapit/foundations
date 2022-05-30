import React from 'react'
import { render } from '../../../tests/react-testing'
import { PropertyItem } from '../property-item'
import { mockAppointmentsQuery } from '../../../pages/appointment/__mocks__/appointments-query'
import { ExtendedAppointmentModel } from '../../../../types/global'

const apppointmentWithoutProperty = mockAppointmentsQuery.data.GetAppointments._embedded[0] as ExtendedAppointmentModel
const apppointmentWithProperty = mockAppointmentsQuery.data.GetAppointments._embedded[2] as ExtendedAppointmentModel

describe('PropertyItem', () => {
  it('should match snapshot without a property', () => {
    expect(render(<PropertyItem appointment={apppointmentWithoutProperty} />)).toMatchSnapshot()
  })

  it('should match snapshot with a property', () => {
    expect(render(<PropertyItem appointment={apppointmentWithProperty} />)).toMatchSnapshot()
  })
})
