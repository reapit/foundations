import React, { ChangeEvent } from 'react'
import { render } from '../../../../tests/react-testing'
import { AppointmentTime, handleChangeTime } from '../appointment-time'

jest.mock('../../../../core/app-state')

describe('appointment-time', () => {
  describe('AppointmentTime', () => {
    it('should match snapshot', () => {
      const wrapper = render(<AppointmentTime />)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('handleChangeTime', () => {
    it('should correctly set state', () => {
      const mockParams = {
        setAppState: jest.fn(),
      }
      const curried = handleChangeTime(mockParams)
      const event = { currentTarget: { value: 'TOMORROW' } } as ChangeEvent<HTMLInputElement>
      curried(event)

      const newState = mockParams.setAppState.mock.calls[0][0]()

      expect(newState).toEqual({
        time: 'TOMORROW',
        destinationLat: null,
        destinationLng: null,
        appointmentId: null,
      })
    })
  })
})
