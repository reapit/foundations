import resolvers from './resolvers'
import { contacts } from './__mocks__/contacts'
import { token, loginParams } from './__mocks__/token'
import { LoginParams } from '@reapit/cognito-auth'

describe('resolvers', () => {
  describe('contacts', () => {
    it('should run correctly', async done => {
      const result = await resolvers.Query.contacts()
      setTimeout(() => {
        expect(result).toEqual(contacts)
        done()
      }, 2000)
    })
  })

  describe('login', () => {
    it('should run correctly', async done => {
      const result = await resolvers.Mutation.login({}, loginParams)
      setTimeout(() => {
        expect(result).toEqual(token)
        done()
      }, 2000)
    })

    it('should return error', async done => {
      const result = await resolvers.Mutation.login({}, {} as LoginParams)
      setTimeout(() => {
        expect(result).toBeDefined()
        done()
      }, 2000)
    })
  })
})
