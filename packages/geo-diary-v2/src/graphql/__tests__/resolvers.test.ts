import resolvers from '../resolvers'
import { appointments } from '../__mocks__/appointments'

describe('resolvers', () => {
  describe('contacts', () => {
    it('should run correctly', async done => {
      const result = await resolvers.Query.getAppointments()
      setTimeout(() => {
        expect(result).toEqual(appointments)
        done()
      }, 2000)
    })
  })
})
