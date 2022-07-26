import { gql } from 'apollo-server-core'
import { Resolver, Query, Ctx, Arg, Authorized, Mutation } from 'type-graphql'
import { Office, OfficeFragment, OfficeInput } from '../entities/office'
import { Context } from '../types'
import { AbstractCrudService } from './abstract-crud-resolver'

const getOfficesQuery = gql`
  ${OfficeFragment}
  query getOffices {
    GetOffices {
      _embedded {
        ...OfficeFragment
      }
    }
  }
`

const getOfficeQuery = gql`
  ${OfficeFragment}
  query GetOffice($id: String!) {
    GetOfficeById(id: $id) {
      ...OfficeFragment
    }
  }
`

const updateOfficeMutation = gql`
  ${OfficeFragment}
  mutation UpdateOffice(
    $id: String!
    $name: String!
    $manager: String
    $workPhone: String
    $email: String!
    $metadata: JSON
    $address: OfficeModelAddressInput!
    $_eTag: String!
  ) {
    UpdateOffice(
      id: $id
      name: $name
      manager: $manager
      workPhone: $workPhone
      email: $email
      metadata: $metadata
      address: $address
      _eTag: $_eTag
    ) {
      ...OfficeFragment
    }
  }
`

const createOfficeMutation = gql`
  ${OfficeFragment}
  mutation CreateOffice(
    $name: String!
    $manager: String
    $workPhone: String
    $email: String!
    $metadata: JSON
    $address: OfficeModelAddressInput!
  ) {
    CreateOffice(
      name: $name
      manager: $manager
      workPhone: $workPhone
      email: $email
      metadata: $metadata
      address: $address
    ) {
      ...OfficeFragment
    }
  }
`

type OfficeEmbeds<Office> = Office & {
  _embedded: {}
}

class OfficeService extends AbstractCrudService<Office, OfficeEmbeds<Office>, OfficeInput> {}

const entityName = 'office'

@Resolver(() => Office)
export class OfficeResolver {
  readonly service: OfficeService
  constructor() {
    this.service = new OfficeService(
      getOfficeQuery,
      getOfficesQuery,
      updateOfficeMutation,
      createOfficeMutation,
      'Office',
    )
  }

  @Query(() => [Office])
  @Authorized()
  async listOffices(@Ctx() { accessToken, idToken }: Context): Promise<Office[]> {
    return this.service.getEntities({ accessToken, idToken })
  }

  @Query(() => Office)
  @Authorized()
  async getOffice(
    @Ctx() { storeCachedMetadata, idToken, accessToken }: Context,
    @Arg('id') id: string,
  ): Promise<Office> {
    const office = await this.service.getEntity({ id, idToken, accessToken })
    if (!office) throw new Error(`Office with id [${id}] was not found`)

    storeCachedMetadata(entityName, office.id, office)

    return office
  }

  @Authorized()
  @Mutation(() => Office)
  async createOffice(
    @Ctx() { idToken, accessToken, storeCachedMetadata }: Context,
    @Arg(entityName) entityInput: OfficeInput,
  ): Promise<Office> {
    const office = await this.service.createEntity({
      accessToken,
      idToken,
      entityInput,
    })
    storeCachedMetadata(entityName, office.id, office.metadata)

    return office
  }

  @Authorized()
  @Mutation(() => Office)
  async updateOffice(
    @Ctx() { idToken, accessToken, storeCachedMetadata }: Context,
    @Arg(entityName) entityInput: OfficeInput,
    @Arg('id') id: string,
  ): Promise<Office> {
    const office = await this.service.updateEntity({
      accessToken,
      idToken,
      entityInput,
      id,
    })
    storeCachedMetadata(entityName, office.id, office.metadata)

    return office
  }
}
