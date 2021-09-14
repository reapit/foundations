import { gql } from 'apollo-server-core'
import { Resolver, Query, Ctx } from 'type-graphql'
import fetch from 'node-fetch'
import { Property, PropertyFragment } from '../entities/property'
import { PropertyModelPagedResult } from '../../../foundations-ts-definitions/types'
import { Context } from '@/types'
import { graphqlUri } from '../config.json'
import { DocumentNode } from 'graphql'

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

const getGqlString = (doc: DocumentNode) => doc.loc && doc.loc.source.body

const getProperties = async (accessToken: string, idToken: string) => {
  const res = await fetch(graphqlUri || 'https://graphql.dev.paas.reapit.cloud/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: idToken,
      'reapit-connect-token': accessToken,
    },
    body: JSON.stringify({
      query: getGqlString(getPropertiesQuery),
    }),
  })
  const json = (await res.json()) as any
  if (json.message) {
    throw new Error(json.message)
  }
  if (json.data) {
    return json.data.GetProperties as PropertyModelPagedResult
  }
  if (json.errors) {
    throw new Error(json.errors[0].message)
  }
  throw new Error('Invalid response')
}

@Resolver(() => Property)
export class PropertyResolver {
  constructor() {}

  @Query(() => [Property])
  async listProperties(@Ctx() ctx: Context): Promise<Array<Property>> {
    const { accessToken, idToken } = ctx
    if (!accessToken || !idToken) {
      throw new Error('unauthorized')
    }
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
