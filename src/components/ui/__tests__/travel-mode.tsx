import * as React from 'react'
import { shallow } from 'enzyme'
import { TravelMode, TravelModeProps } from '../travel-mode'
import toJson from 'enzyme-to-json'

const props: TravelModeProps = {
  travelMode: 'DRIVING',
  onChangeTravelMode: jest.fn()
}

describe('TravelMode', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<TravelMode {...props} />))).toMatchSnapshot()
  })
})
