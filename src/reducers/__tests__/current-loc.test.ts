import { currentLocReducer } from '../current-loc'
import { setCurrentLoc } from '@/actions/current-loc'

describe('current loc reducer test', () => {
  it('it should change current to default value (null) if unrecognized is dispatched', () => {
    expect(currentLocReducer(null, { data: null, type: 'AUTH_SET_DESKTOP_SESSION' })).toEqual(null)
  })

  it('it should change currentLoc to <value> when action setCurrentLoc is dispatched with <value>', () => {
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

    expect(currentLocReducer(null, setCurrentLoc(inputLoc))).toEqual(inputLoc)
  })
})
