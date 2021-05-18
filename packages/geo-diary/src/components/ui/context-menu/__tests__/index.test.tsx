import React from 'react'
import { shallow } from 'enzyme'
import { ContextMenu, handleHideModal, handleShowModal, handleToggleMenu } from '../index'
import { mockAppointmentsQuery } from '../../../pages/appointment/__mocks__/appointments-query'
import { ExtendedAppointmentModel } from '../../../../types/global'

const appointment = mockAppointmentsQuery.data.GetAppointments._embedded[2] as ExtendedAppointmentModel

describe('ContextMenu', () => {
  it('should match snapshot with an appointment', () => {
    expect(shallow(<ContextMenu appointment={appointment} />)).toMatchSnapshot()
  })

  it('should handle toggle menu', () => {
    const setMenuOpen = jest.fn()
    const curried = handleToggleMenu(setMenuOpen)

    curried()

    const newState = setMenuOpen.mock.calls[0][0]()

    expect(newState).toBe(true)
  })

  it('should handle show modal', () => {
    const setModalOpen = jest.fn()
    const curried = handleShowModal(setModalOpen)

    curried()

    expect(setModalOpen).toHaveBeenCalledWith(true)
  })

  it('should handle hide modal', () => {
    const setModalOpen = jest.fn()
    const setMenuOpen = jest.fn()
    const curried = handleHideModal(setModalOpen, setMenuOpen)

    curried()

    expect(setModalOpen).toHaveBeenCalledWith(false)
    expect(setMenuOpen).toHaveBeenCalledWith(false)
  })
})
