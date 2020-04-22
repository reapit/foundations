import sleep from '@/utils/sleep'
import { contacts } from './__mocks__/contacts'

const resolvers = {
  Query: {
    contacts: async () => {
      await sleep(1000)
      return contacts
    },
  },
  Mutation: {},
}

export default resolvers
