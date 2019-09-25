import * as React from 'react'
import { shallow } from 'enzyme'
import { Home, HomeProps } from '../home'
import { appointmentsDataStub } from '@/sagas/__stubs__/appointments'

const props = {
  appointmentsState: {
    appointments: appointmentsDataStub,
    loading: false,
    time: 'Today',
    selectedAppointment: appointmentsDataStub.data.data![0]
  },
  nextAppointmentState: {
    data: null
  },
  desktopMode: false
} as HomeProps

describe('Home', () => {
  it('should match a snapshot', () => {
    expect(shallow(<Home {...props} />)).toMatchSnapshot()
  })
})
