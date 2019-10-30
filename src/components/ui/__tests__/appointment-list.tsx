import * as React from 'react'
import { AppointmentList } from '../appointment-list'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { appointmentsDataStub } from '@/sagas/__stubs__/appointments'
import { AppointmentModel } from '@/types/appointments'
import { oc } from 'ts-optchain'

describe('AppointmentList', () => {
  it('Should match snapshot if having no data', () => {
    expect(
      toJson(
        shallow(
          <AppointmentList
            appointments={[]}
            appointmentTypes={[]}
            selectedAppointment={null}
            setSelectedAppointment={jest.fn()}
            isOnline={false}
          />
        )
      )
    ).toMatchSnapshot()
  })

  it('Should match snapshot if having no data', () => {
    expect(
      toJson(
        shallow(
          <AppointmentList
            appointments={oc(appointmentsDataStub).appointments.data([])}
            appointmentTypes={oc(appointmentsDataStub).appointmentTypes([])}
            selectedAppointment={oc(appointmentsDataStub).appointments.data[0]() as AppointmentModel}
            setSelectedAppointment={jest.fn()}
            isOnline={false}
          />
        )
      )
    ).toMatchSnapshot()
  })
})
