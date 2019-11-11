import { ReduxState } from '@/types/core'
import { selectDeveloperId } from '../developer'

describe('selectDeveloperId', () => {
  it('should run correctly', () => {
    const input = {
      auth: {
        loginSession: {
          loginIdentity: {
            clientId: '',
            email: 'abc@gmail.com',
            developerId: '123'
          }
        }
      }
    } as ReduxState
    const result = selectDeveloperId(input)
    expect(result).toEqual('123')
  })

  it('should run correctly and return undefined', () => {
    const input = {} as ReduxState
    const result = selectDeveloperId(input)
    expect(result).toEqual(undefined)
  })
})
