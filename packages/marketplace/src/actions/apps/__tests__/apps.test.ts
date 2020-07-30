import { fetchApps } from '../apps'
import ActionTypes from '@/constants/action-types'

describe('apps', () => {
  describe('fetchApps', () => {
    it('should create a fetchApps action', () => {
      expect(fetchApps.type).toEqual(ActionTypes.FETCH_APPS)
      expect(fetchApps({ onlyInstalled: true }).data).toEqual({ onlyInstalled: true })
    })
  })
})
