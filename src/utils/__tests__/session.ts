import { mockLoginSession } from '../__mocks__/cognito'
import { setLoginSession, getLoginSession, removeLoginSession } from '../session'

describe('session utils', () => {
  describe('setLoginSession', () => {
    it('should correctly set localStorage', () => {
      jest.spyOn(window.localStorage, 'setItem')
      setLoginSession(mockLoginSession)
      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        'reapit-app-store-session',
        JSON.stringify(mockLoginSession)
      )
    })
  })

  describe('getLoginSession', () => {
    it('should correctly set localStorage', () => {
      window.localStorage['reapit-app-store-session'] = mockLoginSession
      jest.spyOn(window.localStorage, 'getItem')
      const result = getLoginSession()
      expect(window.localStorage.getItem).toHaveBeenCalledWith('reapit-app-store-session')
      expect(result).toEqual(mockLoginSession)
    })
  })

  describe('removeLoginSession', () => {
    it('should correctly set localStorage', () => {
      window.localStorage['reapit-app-store-session'] = mockLoginSession
      jest.spyOn(window.localStorage, 'removeItem')
      removeLoginSession()
      expect(window.localStorage.removeItem).toHaveBeenCalledWith('reapit-app-store-session')
      expect(window.localStorage.getItem('reapit-app-store-session')).toBeUndefined()
    })
  })
})
