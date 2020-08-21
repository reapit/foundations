import resolvers from '../resolvers'
import { appointmentsQueryData } from '../../components/pages/appointment/__mocks__/appointments-query'

describe('resolvers', () => {
  describe('contacts', () => {
    it('should run correctly', async done => {
      const result = await resolvers.Query.getAppointments()
      setTimeout(() => {
        expect(result).toEqual(appointmentsQueryData.data.GetAppointments)
        done()
      }, 2000)
    })
  })
})
