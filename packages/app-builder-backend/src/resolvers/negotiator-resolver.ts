import { gql } from 'apollo-server-core'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Negotiator, NegotiatorFragment, NegotiatorInput } from '../entities/negotiator'
import { Context } from '../types'
import { query } from '../utils/graphql-fetch'
import { AbstractCrudService } from './abstract-crud-resolver'

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

const getNegotiatorQuery = gql`
  ${NegotiatorFragment}
  query GetNegotiator($id: String!) {
    GetNegotiatorById(id: $id) {
      ...NegotiatorFragment
    }
  }
`

const updateNegotiatorMutation = gql`
  ${NegotiatorFragment}
  mutation UpdateNegotiator(
    $name: String!
    $jobTitle: String
    $officeId: String!
    $active: Boolean
    $workPhone: String
    $mobilePhone: String
    $email: String!
    $metadata: JSON
  ) {
    UpdateNegotiator(
      name: $name
      jobTitle: $jobTitle
      active: $active
      officeId: $officeId
      mobilePhone: $mobilePhone
      workPhone: $mobilePhone
      email: $email
      metadata: $metadata
    ) {
      ...NegotaitorFragment
    }
  }
`

const createNegotiatorMutation = gql`
  ${NegotiatorFragment}
  mutation CreateNegotiator(
    $name: String!
    $jobTitle: String
    $officeId: String!
    $active: Boolean
    $workPhone: String
    $mobilePhone: String
    $email: String!
    $metadata: JSON
  ) {
    CreateNegotiator(
      name: $name
      jobTitle: $jobTitle
      active: $active
      officeId: $officeId
      mobilePhone: $mobilePhone
      workPhone: $mobilePhone
      email: $email
      metadata: $metadata
    ) {
      ...NegotaitorFragment
    }
  }
`

const searchNegotiators = async (queryStr: string, accessToken: string, idToken: string) => {
  return query<{ _embedded: Negotiator[] }>(searchNegotiatorsQuery, { query: queryStr }, 'GetNegotiators', {
    accessToken,
    idToken,
  })
}

type NegotiatorEmbeds = {}

class NegotiatorService extends AbstractCrudService<Negotiator, NegotiatorEmbeds, NegotiatorInput> {}

const entityName = 'negotiator'

@Resolver(() => Negotiator)
export class NegotiatorResolver {
  readonly service: NegotiatorService

  constructor() {
    this.service = new NegotiatorService(
      getNegotiatorQuery,
      getNegotiatorsQuery,
      updateNegotiatorMutation,
      createNegotiatorMutation,
      'Negotiator',
    )
  }

  @Authorized()
  @Query(() => [Negotiator])
  async listNegotiators(@Ctx() { accessToken, idToken }: Context) {
    const negotiators = await this.service.getEntities({ accessToken, idToken })
    return negotiators.map((negotiator) => ({
      ...(negotiator.metadata || {}),
      ...negotiator,
    }))
  }

  @Authorized()
  @Query(() => [Negotiator])
  async searchNegotiators(@Ctx() { accessToken, idToken }: Context, @Arg('query') queryStr: string) {
    const { _embedded } = await searchNegotiators(queryStr, accessToken, idToken)
    return _embedded.map((negotiator) => ({
      ...(negotiator.metadata || {}),
      ...negotiator,
      // created: new Date(negotiator.created),
      // modified: new Date(negotiator.modified),
    }))
  }

  @Authorized()
  @Query(() => Negotiator)
  async getNegotiator(
    @Ctx() { accessToken, idToken, storeCachedMetadata }: Context,
    @Arg('id') id: string,
  ): Promise<Negotiator> {
    const negotiator = await this.service.getEntity({ id, accessToken, idToken })

    if (!negotiator) {
      throw new Error(`Negotiator with id ${id} not found`)
    }
    storeCachedMetadata(entityName, id, negotiator.metadata)
    return negotiator
  }

  @Authorized()
  @Mutation(() => Negotiator)
  async createNegotiator(
    @Ctx() { accessToken, idToken, storeCachedMetadata, operationMetadata }: Context,
    @Arg(entityName) negotiator: NegotiatorInput,
  ): Promise<Negotiator> {
    const { [entityName]: metadata } = operationMetadata
    const newNegotiator = await this.service.createEntity({
      accessToken,
      idToken,
      entityInput: { ...negotiator, metadata },
    })

    storeCachedMetadata(entityName, newNegotiator.id, negotiator.metadata)
    return newNegotiator
  }

  @Authorized()
  @Mutation(() => Negotiator)
  async updateNegotiator(
    @Ctx() { idToken, accessToken, storeCachedMetadata, operationMetadata }: Context,
    @Arg('id') id: string,
    @Arg(entityName) negotiator: NegotiatorInput,
  ): Promise<Negotiator> {
    const { [entityName]: metadata } = operationMetadata
    const updatedNegotiator = await this.service.updateEntity({
      accessToken,
      idToken,
      id,
      entityInput: { ...negotiator, metadata },
    })
    storeCachedMetadata(entityName, id, updatedNegotiator.metadata)
    return updatedNegotiator
  }
}
