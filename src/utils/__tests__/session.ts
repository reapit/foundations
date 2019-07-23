import { mockLoginSession } from '../__mocks__/cognito'
import { setLoginSession, getLoginSession, removeLoginSession } from '../session'
import { LOCAL_STORAGE_SESSION_KEY } from '../../constants/session'

describe('session utils', () => {
  describe('setLoginSession', () => {
    it('should correctly set localStorage', () => {
      jest.spyOn(window.localStorage, 'setItem')
      setLoginSession(mockLoginSession)
      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        LOCAL_STORAGE_SESSION_KEY,
        JSON.stringify(mockLoginSession)
      )
    })
  })

  describe('getLoginSession', () => {
    it('should correctly set localStorage', () => {
      window.localStorage[LOCAL_STORAGE_SESSION_KEY] = mockLoginSession
      jest.spyOn(window.localStorage, 'getItem')
      const result = getLoginSession()
      expect(window.localStorage.getItem).toHaveBeenCalledWith(LOCAL_STORAGE_SESSION_KEY)
      expect(result).toEqual(mockLoginSession)
    })
  })

  describe('removeLoginSession', () => {
    it('should correctly set localStorage', () => {
      window.localStorage[LOCAL_STORAGE_SESSION_KEY] = mockLoginSession
      jest.spyOn(window.localStorage, 'removeItem')
      removeLoginSession()
      expect(window.localStorage.removeItem).toHaveBeenCalledWith(LOCAL_STORAGE_SESSION_KEY)
      expect(window.localStorage.getItem(LOCAL_STORAGE_SESSION_KEY)).toBeUndefined()
    })
  })
})
