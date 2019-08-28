import React from 'react'
import AppointmentTile from '../index'
import { shallow } from 'enzyme'

describe('AppointmentTile', () => {
  it('should match snapshot', () => {
    const mockProps = {
      address: 'Address',
      city: 'City',
      country: 'Country',
      postalCode: 'PostalCode',
      contactPerson: 'ContactPerson',
    }
    const wrapper = shallow(<AppointmentTile {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })
})
