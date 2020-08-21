import { appointmentsQueryData } from '../components/pages/appointment/__mocks__/appointments-query'

const mockTimeout = (time: number = 0) => new Promise(resolve => setTimeout(resolve, time))

const resolvers = {
  Query: {
    getAppointments: async () => {
      await mockTimeout(1000)
      return appointmentsQueryData.data.GetAppointments
    },
  },
  Mutation: {},
}

export default resolvers
