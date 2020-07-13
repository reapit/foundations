import { ReduxState } from '@/types/core'
import { selectClientId, selectDeveloperEditionId, selectLoggedUserEmail } from '../client'

describe('selectClientId', () => {
  it('should run correctly', () => {
    const input = {
      auth: {
        loginSession: {
          loginIdentity: {
            clientId: '123',
            email: 'abc@gmail.com',
          },
        },
      },
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

describe('selectDeveloperEditionId', () => {
  it('should run correctly when user in AgencyCloudDeveloperEdition group', () => {
    const input = {
      auth: {
        loginSession: {
          loginIdentity: {
            clientId: '123',
            email: 'abc@gmail.com',
            developerId: '1234',
            groups: ['AgencyCloudDeveloperEdition'],
          },
        },
      },
    } as ReduxState
    const result = selectDeveloperEditionId(input)
    expect(result).toEqual('1234')
  })

  it('should run correctly when user NOT in AgencyCloudDeveloperEdition group', () => {
    const input = {
      auth: {
        loginSession: {
          loginIdentity: {
            clientId: '123',
            email: 'abc@gmail.com',
            developerId: '1234',
            groups: [''],
          },
        },
      },
    } as ReduxState
    const result = selectDeveloperEditionId(input)
    expect(result).toEqual(null)
  })
})

describe('selectLoggedUserEmail', () => {
  it('should run correctly', () => {
    const input = {
      auth: {
        loginSession: {
          loginIdentity: {
            clientId: '',
            email: 'abc@gmail.com',
          },
        },
      },
    } as ReduxState
    const result = selectLoggedUserEmail(input)
    expect(result).toEqual('abc@gmail.com')
  })

  it('should run correctly and return ""', () => {
    const input = {} as ReduxState
    const result = selectLoggedUserEmail(input)
    expect(result).toEqual('')
  })
})
