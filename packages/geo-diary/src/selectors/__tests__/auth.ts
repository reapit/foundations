import { ReduxState } from '@/types/core'
import { selectUserCode } from '../auth'

describe('auth selector', () => {
  describe('selectUserCode', () => {
    it('should return correctly', () => {
      const input = {
        auth: {
          loginSession: {
            loginIdentity: {
              userCode: 'mockUserCode',
            },
          },
        },
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
})
