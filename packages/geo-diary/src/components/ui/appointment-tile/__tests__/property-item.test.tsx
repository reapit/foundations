import React from 'react'
import { shallow } from 'enzyme'
import { PropertyItem } from '../property-item'
import { mockAppointmentsQuery } from '../../../pages/appointment/__mocks__/appointments-query'
import { ExtendedAppointmentModel } from '../../../../types/global'

const apppointmentWithoutProperty = mockAppointmentsQuery.data.GetAppointments._embedded[0] as ExtendedAppointmentModel
const apppointmentWithProperty = mockAppointmentsQuery.data.GetAppointments._embedded[2] as ExtendedAppointmentModel

describe('PropertyItem', () => {
  it('should match snapshot without a property', () => {
    expect(shallow(<PropertyItem appointment={apppointmentWithoutProperty} />)).toMatchSnapshot()
  })

  it('should match snapshot with a property', () => {
    expect(shallow(<PropertyItem appointment={apppointmentWithProperty} />)).toMatchSnapshot()
  })
})
