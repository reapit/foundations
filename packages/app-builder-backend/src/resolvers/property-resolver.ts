import { gql } from 'apollo-server-core'
import { Resolver, Query, Ctx, Authorized, Arg, Mutation } from 'type-graphql'
import { Property, PropertyFragment, PropertyInput } from '../entities/property'
import { Context } from '@/types'
import { query } from '../utils/graphql-fetch'
import { AbstractCrudService } from './abstract-crud-resolver'
import { PropertyImage } from '@/entities/property-image'

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

const getPropertyQuery = gql`
  ${PropertyFragment}
  query getProperty($id: String!) {
    GetPropertyById(id: $id, embed: [images]) {
      ...PropertyFragment
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

const updatePropertyMutation = gql`
  ${PropertyFragment}
  mutation UpdateProperty(
    $id: String!
    $description: String
    $receptions: Int
    $metadata: JSON
    $address: PropertyAddressInput!
    $letting: PropertyLetting
    $selling: PropertySelling
    $externalArea: ExternalArea
    $internalArea: InternalArea
    $internetAdvertising: Boolean!
    $parkingSpaces: Int
    $rooms: [Room]
    $negotiatorId: String!
    $officeIds: [String!]!
    $marketingMode: String
    $departmentId: String!
    $notes: String
  ) {
    UpdateProperty(
      id: $id
      description: $description
      receptions: $receptions
      letting: $letting
      selling: $selling
      metadata: $metadata
      address: $address
      externalArea: $externalArea
      internalArea: $internalArea
      internetAdvertising: $internetAdvertising
      parkingSpaces: $parkingSpaces
      rooms: $rooms
      negotiatorId: $negotiatorId
      officeIds: $officeIds
      marketingMode: $marketingMode
      departmentId: $departmentId
      notes: $notes
    ) {
      ...PropertyFragment
    }
  }
`

const createPropertyMutation = gql`
  ${PropertyFragment}
  mutation CreateProperty(
    $description: String
    $receptions: Int
    $metadata: JSON
    $address: AddressInput!
    $letting: lettingInput
    $selling: SellingInput
    $externalArea: ExternalAreaInput
    $internalArea: InternalAreaInput
    $internetAdvertising: Boolean!
    $parkingSpaces: Int
    $rooms: [CreatePropertyRoomModelInput!]
    $negotiatorId: String!
    $officeIds: [String!]!
    $marketingMode: String
    $departmentId: String!
    $notes: String
  ) {
    CreateProperty(
      description: $description
      receptions: $receptions
      letting: $letting
      selling: $selling
      metadata: $metadata
      address: $address
      externalArea: $externalArea
      internalArea: $internalArea
      internetAdvertising: $internetAdvertising
      parkingSpaces: $parkingSpaces
      rooms: $rooms
      negotiatorId: $negotiatorId
      officeIds: $officeIds
      marketingMode: $marketingMode
      departmentId: $departmentId
      notes: $notes
    ) {
      ...PropertyFragment
    }
  }
`

type PropertyEmbeds = {
  images: PropertyImage[]
}

const searchProperties = async (queryStr: string, accessToken: string, idToken: string) => {
  return query<{
    _embedded: (Property & { _embedded: PropertyEmbeds })[]
  }>(searchPropertiesQuery, { query: queryStr }, 'GetProperties', {
    accessToken,
    idToken,
  })
}

class PropertyService extends AbstractCrudService<Property, PropertyEmbeds, PropertyInput> {
  getManyQueryName = () => 'GetProperties'
}

const entityName = 'property'

@Resolver(() => Property)
export class PropertyResolver {
  readonly service: PropertyService
  constructor() {
    this.service = new PropertyService(
      getPropertyQuery,
      getPropertiesQuery,
      updatePropertyMutation,
      createPropertyMutation,
      'Property',
    )
  }

  @Authorized()
  @Query(() => [Property])
  async listProperties(@Ctx() ctx: Context): Promise<Array<Property>> {
    const { accessToken, idToken } = ctx
    const properties = await this.service.getEntities({
      idToken,
      accessToken,
    })

    return properties
  }

  @Authorized()
  @Query(() => [Property])
  async searchProperties(@Ctx() ctx: Context, @Arg('query') query: string): Promise<Array<Property>> {
    const { accessToken, idToken } = ctx
    const properties = await searchProperties(query, accessToken, idToken)

    if (!properties._embedded) {
      return []
    }

    return properties._embedded
      .map((property) => this.service.convertDates(property))
      .map((property) => this.service.hoistEmbeds(property))
      .map((property) => this.service.addDefaultEmbeds(property))
  }

  @Authorized()
  @Query(() => Property)
  async getProperty(
    @Ctx() { accessToken, idToken, storeCachedMetadata }: Context,
    @Arg('id') id: string,
  ): Promise<Property> {
    const property = await this.service.getEntity({ id, idToken, accessToken })
    if (!property) throw new Error(`No Property found for id [${id}]`)
    storeCachedMetadata(entityName, id, property)
    return property
  }

  @Authorized()
  @Mutation(() => Property)
  async createProperty(
    @Ctx() { accessToken, idToken, storeCachedMetadata }: Context,
    @Arg(entityName) entityInput: PropertyInput,
  ): Promise<Property> {
    const property = await this.service.createEntity({
      idToken,
      accessToken,
      entityInput,
    })

    storeCachedMetadata(entityName, property.id, property)

    return property
  }

  @Authorized()
  @Mutation(() => Property)
  async updateProperty(
    @Ctx() { accessToken, idToken, storeCachedMetadata }: Context,
    @Arg('id') id: string,
    @Arg(entityName) entityInput: PropertyInput,
  ): Promise<Property> {
    const property = await this.service.updateEntity({
      idToken,
      accessToken,
      id,
      entityInput,
    })

    storeCachedMetadata(entityName, id, property)

    return property
  }
}
