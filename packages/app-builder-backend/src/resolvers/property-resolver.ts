import { gql } from 'apollo-server-core'
import { Resolver, Query, Ctx, Authorized, Arg } from 'type-graphql'
import { Property, PropertyFragment } from '../entities/property'
import { PropertyModelPagedResult } from '../../../foundations-ts-definitions/types'
import { Context } from '@/types'
import { query } from '../utils/graphql-fetch'

const getPropertiesQuery = gql`
  ${PropertyFragment}
  query getProperties {
    GetProperties(pageSize: 10, pageNumber: 0, embed: [images]) {
      pageSize
      pageCount
      pageNumber
      _embedded {
        ...PropertyFragment
      }
    }
  }
`

const searchPropertiesQuery = gql`
  ${PropertyFragment}
  query searchProperties($query: String!) {
    GetProperties(pageSize: 10, pageNumber: 0, embed: [images], address: $query) {
      pageSize
      pageCount
      pageNumber
      _embedded {
        ...PropertyFragment
      }
    }
  }
`

const getProperties = async (accessToken: string, idToken: string) => {
  return query<PropertyModelPagedResult>(getPropertiesQuery, {}, 'GetProperties', { accessToken, idToken })
}
const searchProperties = async (queryStr: string, accessToken: string, idToken: string) => {
  return query<PropertyModelPagedResult>(searchPropertiesQuery, { query: queryStr }, 'GetProperties', {
    accessToken,
    idToken,
  })
}

export const notEmpty = <TValue>(value?: TValue | null): value is TValue => {
  return value !== null && value !== undefined
}
const apiPropertiesToProperty = (properties: PropertyModelPagedResult['_embedded']): Property[] =>
  properties?.filter(notEmpty).map((property) => ({
    ...property,
    id: property.id as string,
    type: property.type as string[],
    images: property._embedded?.images || [],
    lettingRentPrice: property.letting?.rent,
    lettingRentFrequency: property.letting?.rentFrequency,
    salePrice: property.selling?.price,
  })) || []

@Resolver(() => Property)
export class PropertyResolver {
  constructor() {}

  @Authorized()
  @Query(() => [Property])
  async listProperties(@Ctx() ctx: Context): Promise<Array<Property>> {
    const { accessToken, idToken } = ctx
    const properties = await getProperties(accessToken, idToken)
    return apiPropertiesToProperty(properties._embedded)
  }

  @Authorized()
  @Query(() => [Property])
  async searchProperties(@Ctx() ctx: Context, @Arg('query') query: string): Promise<Array<Property>> {
    const { accessToken, idToken } = ctx
    const properties = await searchProperties(query, accessToken, idToken)
    return apiPropertiesToProperty(properties._embedded)
  }
}
