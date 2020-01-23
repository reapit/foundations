import * as React from 'react'
import { shallow } from 'enzyme'
import { TravelMode, TravelModeProps, handleOnClick } from '../travel-mode'
import toJson from 'enzyme-to-json'

const props: TravelModeProps = {
  travelMode: 'DRIVING',
  onChangeTravelMode: jest.fn(),
}

describe('TravelMode', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<TravelMode {...props} />))).toMatchSnapshot()
  })

  describe('handleOnClick', () => {
    it('should run correctly', () => {
      const onChangeTravelMode = jest.fn()
      const travelMode = 'DRIVING'
      const fn = handleOnClick({ onChangeTravelMode, travelMode })
      fn()
      expect(onChangeTravelMode).toBeCalledWith(travelMode)
    })
  })
})
