import sleep from '@/utils/sleep'

const resolvers = {
  Query: {
    client: () => {
      return {
        __typename: 'ClientType',
        description: 'A boilerplate standard space rocket',
      }
    },
    GetContacts: async () => {
      await sleep(1000)
      return {
        __typename: 'ContactModel',
        id: '123',
        title: 'Levy',
      }
    },
  },
  Mutation: {
    login: async (_, variables) => {
      const { email, password } = variables
      await sleep(1000)
      if (email === 'admin@yahoo.com' && password === '123') {
        return {
          __typename: 'token',
          token: 'success',
        }
      }
      throw new Error('Invalid')
    },
  },
}

export default resolvers
