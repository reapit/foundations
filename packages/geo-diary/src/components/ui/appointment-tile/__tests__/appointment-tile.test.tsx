import React, { MutableRefObject } from 'react'
import { shallow } from 'enzyme'
import { appointment } from '@/graphql/__mocks__/appointment'
import {
  AppointmentTile,
  handleHideModal,
  handleShowModal,
  handleSetAppointmentId,
  handleScrollIntoView,
} from '../appointment-tile'

jest.mock('../../../../core/app-state')

describe('AppointmentTile', () => {
  it('should match snapshot', () => {
    const mockProps = {
      appointment: appointment,
    }
    const wrapper = shallow(<AppointmentTile {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('handleHideModal', () => {
  const mockSetShowModal = jest.fn()
  const curried = handleHideModal(mockSetShowModal)
  curried()

  expect(mockSetShowModal).toHaveBeenCalledWith(false)
})

describe('handleShowModal', () => {
  const mockSetShowModal = jest.fn()
  const curried = handleShowModal(mockSetShowModal)
  curried()

  expect(mockSetShowModal).toHaveBeenCalledWith(true)
})

describe('handleSetAppointmentId', () => {
  const mockSetAppState = jest.fn()
  const curried = handleSetAppointmentId(mockSetAppState, appointment)
  curried()

  expect(mockSetAppState.mock.calls[0][0]()).toEqual({
    appointmentId: appointment.id,
    destinationLat: appointment?.property?.address?.geolocation?.latitude,
    destinationLng: appointment?.property?.address?.geolocation?.longitude,
  })
})

describe('handleScrollIntoView', () => {
  const mockTileRef = ({
    current: {
      scrollIntoView: jest.fn(),
    },
  } as unknown) as MutableRefObject<HTMLDivElement>

  const curried = handleScrollIntoView(mockTileRef, appointment.id as string, appointment.id)

  curried()

  expect(mockTileRef.current.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'nearest' })
})
