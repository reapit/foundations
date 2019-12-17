const resolvers = {
  Query: {
    client: () => {
      return {
        __typename: 'ClientType',
        description: 'A boilerplate standard space rocket'
      }
    },
    GetContacts: () => {
      return {
        __typename: 'ContactModel',
        id: '123',
        title: 'Levy'
      }
    }
  }
}

export default resolvers
