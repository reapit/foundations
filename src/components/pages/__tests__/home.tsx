import * as React from 'react'
import { shallow } from 'enzyme'
import { Home, HomeProps } from '../home'
import { appointmentsDataStub } from '@/sagas/__stubs__/appointments'

//  @ts-ignore: pick only needed props for the test
const props: HomeProps = {
  appointmentsState: {
    appointments: appointmentsDataStub,
    loading: false,
    time: 'Today'
  }
}

describe('AdminApproval', () => {
  it('should match a snapshot', () => {
    expect(shallow(<Home {...props} />)).toMatchSnapshot()
  })
})
