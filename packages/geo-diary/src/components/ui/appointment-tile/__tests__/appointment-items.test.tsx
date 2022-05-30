import React from 'react'
import { render } from '../../../tests/react-testing'
import { appointment } from '../../../../graphql/__mocks__/appointment'
import { AppointmentItems, handleOpenContactDrawer } from '../appointment-items'
import { ContactDrawerType } from '../../contact-drawer'

describe('AppointmentItems', () => {
  it('should match snapshot', () => {
    const mockProps = {
      appointment: appointment,
    }
    const wrapper = render(<AppointmentItems {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('handleOpenContactDrawer', () => {
  it('should correctly open contact drawer if not in desktop mode', () => {
    const mockSetAppState = jest.fn()
    const contactId = 'SOME_ID'
    const curried = handleOpenContactDrawer(mockSetAppState, appointment, ContactDrawerType.VENDOR, contactId)
    curried()

    const newState = mockSetAppState.mock.calls[0][0]()

    expect(newState).toEqual({
      appointment,
      appointmentId: appointment.id,
      contactDrawerOpen: true,
      contactDrawerType: ContactDrawerType.VENDOR,
      contactId,
    })
  })

  it('should not open contact drawer and instead navigate to desktop contact if in desktop mode', () => {
    window['__REAPIT_MARKETPLACE_GLOBALS__'] = {}
    const mockSetAppState = jest.fn()
    const contactId = 'SOME_ID'
    const curried = handleOpenContactDrawer(mockSetAppState, appointment, ContactDrawerType.VENDOR, contactId)
    curried()

    const newState = mockSetAppState.mock.calls[0][0]()

    expect(newState).toEqual({
      appointment,
      appointmentId: appointment.id,
      contactDrawerOpen: false,
      contactDrawerType: ContactDrawerType.VENDOR,
      contactId,
    })

    expect(window.location.href).toEqual(`agencycloud://contacts/${contactId}`)
  })

  it('should not open contact drawer and instead navigate to desktop property if in desktop mode', () => {
    window['__REAPIT_MARKETPLACE_GLOBALS__'] = {}
    const mockSetAppState = jest.fn()
    const contactId = 'SOME_ID'
    const curried = handleOpenContactDrawer(mockSetAppState, appointment, ContactDrawerType.PROPERTY, contactId)
    curried()

    const newState = mockSetAppState.mock.calls[0][0]()

    expect(newState).toEqual({
      appointment,
      appointmentId: appointment.id,
      contactDrawerOpen: false,
      contactDrawerType: ContactDrawerType.PROPERTY,
      contactId,
    })

    expect(window.location.href).toEqual(`agencycloud://properties/${contactId}`)
  })
})
