import { setOnline, setOffline } from '../online'
import ActionTypes from '../../constants/action-types'

describe('online actions', () => {
  it('should create a setOnline action', () => {
    expect(setOnline.type).toEqual(ActionTypes.ONLINE)
  })

  it('should create a setOffline action', () => {
    expect(setOffline.type).toEqual(ActionTypes.OFFLINE)
  })
})
