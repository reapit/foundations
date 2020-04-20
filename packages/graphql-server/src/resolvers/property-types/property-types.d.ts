import { AuthenticationError, UserInputError } from 'apollo-server'
import { ListItemModel } from '../../types'

// api return type
export type GetPropertyTypesReturn = Promise<ListItemModel | UserInputError>

// resolver type
export type QueryPropertyTypesReturn = AuthenticationError | GetPropertyTypesReturn
