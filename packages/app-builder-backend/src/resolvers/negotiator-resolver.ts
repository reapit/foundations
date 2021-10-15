import { gql } from 'apollo-server-core'
import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql'
import { Negotiator, NegotiatorFragment } from '../entities/negotiator'
import { Context } from '../types'
import { query } from '../utils/graphql-fetch'

const getNegotiatorsQuery = gql`
  ${NegotiatorFragment}
  {
    GetNegotiators {
      _embedded {
        ...NegotiatorFragment
      }
    }
  }
`

const searchNegotiatorsQuery = gql`
  ${NegotiatorFragment}
  query SearchNegotiators($query: String!) {
    GetNegotiators(name: $query) {
      _embedded {
        ...NegotiatorFragment
      }
    }
  }
`

const getNegotiators = async (accessToken: string, idToken: string) => {
  return query<{ _embedded: Negotiator[] }>(getNegotiatorsQuery, {}, 'GetNegotiators', { accessToken, idToken })
}

const searchNegotiators = async (queryStr: string, accessToken: string, idToken: string) => {
  return query<{ _embedded: Negotiator[] }>(searchNegotiatorsQuery, { query: queryStr }, 'GetNegotiators', { accessToken, idToken })
}

@Resolver(() => Negotiator)
export class NegotiatorResolver {
  @Authorized()
  @Query(() => [Negotiator])
  async listNegotiators(@Ctx() { accessToken, idToken }: Context) {
    const { _embedded } = await getNegotiators(accessToken, idToken)
    return _embedded
  }

  @Authorized()
  @Query(() => [Negotiator])
  async searchNegotiators(@Ctx() { accessToken, idToken }: Context, @Arg('query') queryStr: string) {
    const { _embedded } = await searchNegotiators(queryStr, accessToken, idToken)
    return _embedded
  }
}
