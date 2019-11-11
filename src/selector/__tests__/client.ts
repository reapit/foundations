import { ReduxState } from '@/types/core'
import { selectClientId, selectLoggedUserEmail } from '../client'

describe('selectClientId', () => {
  it('should run correctly', () => {
    const input = {
      auth: {
        loginSession: {
          loginIdentity: {
            clientId: '123',
            email: 'abc@gmail.com'
          }
        }
      }
    } as ReduxState
    const result = selectClientId(input)
    expect(result).toEqual('123')
  })

  it('should run correctly and return undefined', () => {
    const input = {} as ReduxState
    const result = selectClientId(input)
    expect(result).toEqual('')
  })
})

describe('selectLoggedUserEmail', () => {
  it('should run correctly', () => {
    const input = {
      auth: {
        loginSession: {
          loginIdentity: {
            clientId: '',
            email: 'abc@gmail.com'
          }
        }
      }
    } as ReduxState
    const result = selectLoggedUserEmail(input)
    expect(result).toEqual('abc@gmail.com')
  })

  it('should run correctly and return undefined', () => {
    const input = {} as ReduxState
    const result = selectLoggedUserEmail(input)
    expect(result).toEqual(undefined)
  })
})
