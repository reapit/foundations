import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import AppointmentTile from '../index'

describe('AppointmentTile', () => {
  it('should match snapshot when HIGHTLIGHT false', () => {
    const mockProps = {
      heading: 'mockHeading',
      hightlight: false
    }
    const wrapper = shallow(
      <AppointmentTile {...mockProps}>
        <div>City</div>
        <div>Country</div>
        <div>PostalCode</div>
        <div>"contactPerson"</div>
      </AppointmentTile>
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should match snapshot when HIGHTLIGHT true', () => {
    const mockProps = {
      heading: 'mockHeading',
      hightlight: true
    }
    const wrapper = shallow(
      <AppointmentTile {...mockProps}>
        <div>City</div>
        <div>Country</div>
        <div>PostalCode</div>
        <div>"contactPerson"</div>
      </AppointmentTile>
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
