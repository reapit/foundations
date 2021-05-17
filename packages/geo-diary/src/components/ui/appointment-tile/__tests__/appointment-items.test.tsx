import React from 'react'
import { shallow } from 'enzyme'
import { appointment } from '../../../../graphql/__mocks__/appointment'
import { AppointmentItems, handleOpenContactDrawer } from '../appointment-items'

describe('AppointmentItems', () => {
  it('should match snapshot', () => {
    const mockProps = {
      appointment: appointment,
    }
    const wrapper = shallow(<AppointmentItems {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('handleOpenContactDrawer', () => {
  it('should correctly open contact drawer', () => {
    const mockSetAppState = jest.fn()
    const contactDrawerType = 'VENDOR'
    const contactId = 'SOME_ID'
    const curried = handleOpenContactDrawer(mockSetAppState, appointment, contactDrawerType, contactId)
    curried()

    const newState = mockSetAppState.mock.calls[0][0]()

    expect(newState).toEqual({
      appointment,
      appointmentId: appointment.id,
      contactDrawerOpen: true,
      contactDrawerType,
      contactId,
    })
  })
})
