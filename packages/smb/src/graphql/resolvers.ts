import sleep from '@/utils/sleep'
import { contacts } from './__mocks__/contacts'
import { token } from './__mocks__/token'
import { LoginParams } from '@reapit/cognito-auth'

const resolvers = {
  Query: {
    contacts: async () => {
      await sleep(1000)
      return contacts
    },
  },
  Mutation: {
    login: async (_, variables: LoginParams) => {
      await sleep(1000)
      const { userName, password, loginType, mode } = variables
      const isValidParams = !!userName && !!password && !!loginType && !!mode
      if (!isValidParams) {
        return new Error('Invalid Params')
      }
      return token
    },
  },
}

export default resolvers
