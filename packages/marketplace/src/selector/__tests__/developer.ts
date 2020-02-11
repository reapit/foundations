import { ReduxState } from '@/types/core'
import { selectDeveloperId, selectDeveloperEmail } from '../developer'

describe('selectDeveloperId', () => {
  it('should run correctly', () => {
    const input = {
      auth: {
        loginSession: {
          loginIdentity: {
            clientId: '',
            email: 'abc@gmail.com',
            developerId: '123',
          },
        },
      },
    } as ReduxState
    const result = selectDeveloperId(input)
    expect(result).toEqual('123')
  })

  it('should run correctly and return undefined', () => {
    const input = { auth: {} } as ReduxState
    const result = selectDeveloperId(input)
    expect(result).toEqual(undefined)
  })
})

describe('selectDeveloperEmail', () => {
  it('should run correctly', () => {
    const input = {
      settings: {
        developerInfomation: {
          email: 'abc@gmail.com',
        },
      },
    } as ReduxState
    const result = selectDeveloperEmail(input)
    expect(result).toEqual('abc@gmail.com')
  })

  it('should run correctly and return undefined', () => {
    const input = {} as ReduxState
    const result = selectDeveloperEmail(input)
    expect(result).toEqual(undefined)
  })
})
