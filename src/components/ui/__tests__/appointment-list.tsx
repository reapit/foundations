import * as React from 'react'
import { AppointmentList } from '../appointment-list'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { appointmentsDataStub } from '@/sagas/__stubs__/appointments'
import { AppointmentModel } from '@/types/appointments'

describe('AppointmentList', () => {
  it('Should match snapshot if having no data', () => {
    expect(toJson(shallow(<AppointmentList data={[]} />))).toMatchSnapshot()
  })

  it('Should match snapshot if having no data', () => {
    expect(
      toJson(shallow(<AppointmentList data={appointmentsDataStub.data.data as AppointmentModel[]} />))
    ).toMatchSnapshot()
  })
})
