import React, { ChangeEvent } from 'react'
import { shallow } from 'enzyme'
import { TravelMode, handleChangeTravelMode } from '../travel-mode'

jest.mock('../../../../core/app-state')

describe('travel-mode', () => {
  describe('TravelMode', () => {
    it('should match snapshot', () => {
      const wrapper = shallow(<TravelMode />)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('handleChangeTravelMode', () => {
    it('should run correctly', () => {
      const mockParams = {
        setAppState: jest.fn(),
      }
      const curried = handleChangeTravelMode(mockParams)
      const event = { currentTarget: { value: 'WALKING' } } as ChangeEvent<HTMLInputElement>
      curried(event)

      const newState = mockParams.setAppState.mock.calls[0][0]()
      expect(newState).toEqual({ travelMode: 'WALKING' })
    })
  })
})
