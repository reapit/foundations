import resolvers from '../resolvers'
import { mockAppointmentsQuery } from '../../components/pages/appointment/__mocks__/appointments-query'

describe('resolvers', () => {
  describe('contacts', () => {
    it('should run correctly', async () => {
      const result = await resolvers.Query.getAppointments()

      expect(result).toEqual(mockAppointmentsQuery.data.GetAppointments)
    })
  })
})
