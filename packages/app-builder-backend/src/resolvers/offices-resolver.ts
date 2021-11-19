import { gql } from 'apollo-server-core'
import { Resolver, Query, Ctx } from 'type-graphql'

import { query } from '../utils/graphql-fetch'
import { Office } from '../entities/office'
import { Context } from '../types'

const getOfficesQuery = gql`
  query getOffices {
    GetOffices {
      _embedded {
        id
        name
      }
    }
  }
`

const getOffices = async (accessToken: string, idToken: string) => {
  const { _embedded } = await query<{ _embedded: Office[] }>(getOfficesQuery, {}, 'GetOffices', {
    accessToken,
    idToken,
  })
  return _embedded
}

@Resolver(() => Office)
export class OfficeResolver {
  constructor() {}

  @Query(() => [Office])
  async listOffices(@Ctx() ctx: Context) {
    const { accessToken, idToken } = ctx
    return getOffices(accessToken, idToken)
  }
}
