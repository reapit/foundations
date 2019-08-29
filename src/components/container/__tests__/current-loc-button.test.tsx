import * as React from 'react'
import { setCurrentLoc as setCurrentLocAction } from '@/actions/current-loc'
import { CurrentLocButton, mapDispatchToProps } from '../current-loc-button'
import { shallow } from 'enzyme'

describe('CurrentLocButton', () => {
  it('Should match snapshot', () => {
    expect(shallow(<CurrentLocButton setCurrentLoc={jest.fn()} />)).toMatchSnapshot()
  })

  describe('mapDispatchToProps', () => {
    const mockedDispatch = jest.fn()
    const { setCurrentLoc } = mapDispatchToProps(mockedDispatch)
    const inputLoc: Position = {
      coords: {
        accuracy: 65,
        altitude: 9.458686828613281,
        altitudeAccuracy: 10,
        heading: null,
        latitude: 10.806240626413091,
        longitude: 106.66625585379919,
        speed: null
      },
      timestamp: 1
    }

    it('map currentLocCorrectly', () => {
      setCurrentLoc(inputLoc)
      expect(mockedDispatch).toHaveBeenCalledWith(setCurrentLocAction(inputLoc))
    })
  })
})
