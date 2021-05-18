import React from 'react'
import { shallow } from 'enzyme'
import { AttendeeItem } from '../attendee-item'
import { mockAppointmentsQuery } from '../../../pages/appointment/__mocks__/appointments-query'
import { ExtendedAppointmentModel } from '../../../../types/global'

const apppointmentWithoutContacts = mockAppointmentsQuery.data.GetAppointments._embedded[0] as ExtendedAppointmentModel
const apppointmentWithContacts = mockAppointmentsQuery.data.GetAppointments._embedded[2] as ExtendedAppointmentModel

describe('AttendeeItem', () => {
  it('should match snapshot with no contacts', () => {
    expect(shallow(<AttendeeItem appointment={apppointmentWithoutContacts} />)).toMatchSnapshot()
  })

  it('should match snapshot with contacts', () => {
    expect(shallow(<AttendeeItem appointment={apppointmentWithContacts} />)).toMatchSnapshot()
  })
})
