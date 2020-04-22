import resolvers from '../resolvers'
import { contacts } from '../__mocks__/contacts'

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
})
