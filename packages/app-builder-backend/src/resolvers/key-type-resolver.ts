import { Resolver, Query, Ctx } from 'type-graphql'
import { gql } from 'apollo-server-core'

import { query } from '../utils/graphql-fetch'
import { KeyType } from '../entities/key-type'
import { Context } from '../types'

const getKeyTypesQuery = gql`
  query getKeyTypes {
    GetConfigurationsByType(type: keyTypes) {
      id
      value
    }
  }
`

const getKeyTypes = async (accessToken: string, idToken: string) => {
  return query<KeyType[]>(getKeyTypesQuery, {}, 'GetConfigurationsByType', { accessToken, idToken })
}

@Resolver(() => KeyType)
export class KeyTypeResolver {
  constructor() {}

  @Query(() => [KeyType])
  async listKeyTypes(@Ctx() ctx: Context) {
    const { accessToken, idToken } = ctx
    return getKeyTypes(accessToken, idToken)
  }
}
