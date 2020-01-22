import { ReduxState } from '@/types/core'
import { selectUserCode, selectUserLoginStatus, checkIsDesktopMode, checkIsWebMode } from '../auth'

describe('auth selector', () => {
  describe('selectUserCode', () => {
    it('should return correctly', () => {
      const input = {
        auth: {
          loginSession: {
            loginIdentity: {
              userCode: 'mockUserCode'
            }
          }
        }
      } as ReduxState
      const output = 'mockUserCode'
      const result = selectUserCode(input)
      expect(result).toEqual(output)
    })

    it('should return ""', () => {
      const input = {} as ReduxState
      const output = ''
      const result = selectUserCode(input)
      expect(result).toEqual(output)
    })
  })

  describe('selectUserLoginStatus', () => {
    it('should run correctly', () => {
      const input = {
        auth: {
          loginSession: {}
        }
      } as ReduxState
      const output = true
      const result = selectUserLoginStatus(input)
      expect(result).toEqual(output)
    })

    it('should run correctly', () => {
      const input = {
        auth: {}
      } as ReduxState
      const output = false
      const result = selectUserLoginStatus(input)
      expect(result).toEqual(output)
    })
  })

  describe('checkIsDesktopMode', () => {
    it('should run correctly', () => {
      const input = {
        auth: {
          refreshSession: {
            mode: 'DESKTOP'
          }
        }
      } as ReduxState
      const output = true
      const result = checkIsDesktopMode(input)
      expect(result).toEqual(output)
    })

    it('should run correctly', () => {
      const input = {
        auth: {}
      } as ReduxState
      const output = false
      const result = checkIsDesktopMode(input)
      expect(result).toEqual(output)
    })
  })

  describe('checkIsWebMode', () => {
    it('should run correctly', () => {
      const input = {
        auth: {
          refreshSession: {
            mode: 'WEB'
          }
        }
      } as ReduxState
      const output = true
      const result = checkIsWebMode(input)
      expect(result).toEqual(output)
    })

    it('should run correctly', () => {
      const input = {
        auth: {}
      } as ReduxState
      const output = false
      const result = checkIsWebMode(input)
      expect(result).toEqual(output)
    })
  })
})
