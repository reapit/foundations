import { appointments } from './__mocks__/appointments'

const mockTimeout = (time: number = 0) => new Promise(resolve => setTimeout(resolve, time))

const resolvers = {
  Query: {
    getAppointments: async () => {
      await mockTimeout(1000)
      return appointments
    },
  },
  Mutation: {},
}

export default resolvers
