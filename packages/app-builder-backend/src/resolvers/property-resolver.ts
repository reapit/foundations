import { gql } from 'apollo-server-core'
import { Resolver, Query, Ctx, Authorized } from 'type-graphql'
import { Property, PropertyFragment } from '../entities/property'
import { PropertyModelPagedResult } from '../../../foundations-ts-definitions/types'
import { Context } from '@/types'
import { query } from '../utils/graphqlFetch'

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

const getProperties = async (accessToken: string, idToken: string) => {
  return query<PropertyModelPagedResult>(getPropertiesQuery, {}, 'GetProperties', { accessToken, idToken })
}

@Resolver(() => Property)
export class PropertyResolver {
  constructor() {}

  @Authorized()
  @Query(() => [Property])
  async listProperties(@Ctx() ctx: Context): Promise<Array<Property>> {
    const { accessToken, idToken } = ctx
    const properties = await getProperties(accessToken, idToken)
    return (
      properties._embedded?.map((property) => ({
        ...property,
        id: property.id as string,
        type: property.type as string[],
        images: property._embedded?.images || [],
        lettingRentPrice: property.letting?.rent,
        lettingRentFrequency: property.letting?.rentFrequency,
        salePrice: property.selling?.price,
      })) || []
    )
  }
}
