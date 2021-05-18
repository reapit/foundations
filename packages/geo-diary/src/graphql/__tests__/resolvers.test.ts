import resolvers from '../resolvers'
import { mockAppointmentsQuery } from '../../components/pages/appointment/__mocks__/appointments-query'

describe('resolvers', () => {
  describe('contacts', () => {
    it('should run correctly', async (done) => {
      const result = await resolvers.Query.getAppointments()
      setTimeout(() => {
        expect(result).toEqual(mockAppointmentsQuery.data.GetAppointments)
        done()
      }, 2000)
    })
  })
})
