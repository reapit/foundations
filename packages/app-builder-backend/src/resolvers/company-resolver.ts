import { Company, CompanyAddress, CompanyFragment, CompanyInput, CompanyType } from '../entities/company'
import { Context } from '../types'
import { gql } from 'apollo-server-core'
import { Arg, Authorized, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql'
import { AbstractCrudService } from './abstract-crud-resolver'
import { query } from '../utils/graphql-fetch'
import { ContactAddressType } from '../entities/contact'

const getCompaniesQuery = gql`
  ${CompanyFragment}
  {
    GetCompanies {
      _embedded {
        ...CompanyFragment
      }
    }
  }
`

const getCompanyQuery = gql`
  ${CompanyFragment}
  query GetCompany($id: String!) {
    GetCompanyById(id: $id) {
      ...CompanyFragment
    }
  }
`

const createCompanyMutation = gql`
  ${CompanyFragment}
  mutation CreateCompany(
    $name: String!
    $active: Boolean
    $workPhone: String
    $mobilePhone: String
    $email: String!
    $metadata: JSON
    $typeIds: [String!]!
    $address: CompanyModelAddressInput!
  ) {
    CreateCompany(
      name: $name
      active: $active
      workPhone: $workPhone
      mobilePhone: $mobilePhone
      email: $email
      metadata: $metadata
      address: $address
      typeIds: $typeIds
    ) {
      ...CompanyFragment
    }
  }
`

const updateCompanyMutation = gql`
  ${CompanyFragment}
  mutation UpdateCompany(
    $id: String!
    $name: String!
    $active: Boolean
    $workPhone: String
    $mobilePhone: String
    $email: String!
    $typeIds: [String!]!
    $metadata: JSON
    $address: CompanyModelAddressInput!
    $_eTag: String!
  ) {
    UpdateCompany(
      id: $id
      name: $name
      active: $active
      workPhone: $workPhone
      mobilePhone: $mobilePhone
      email: $email
      metadata: $metadata
      address: $address
      typeIds: $typeIds
      _eTag: $_eTag
    ) {
      ...CompanyFragment
    }
  }
`

const getCompanyTypesQuery = gql`
  query GetConfigurationsByType {
    GetConfigurationsByType(type: companyTypes) {
      id
      value
    }
  }
`

type CompaniesEmbeds = {}

const entityName = 'company'

class CompanyService extends AbstractCrudService<Company, CompaniesEmbeds, CompanyInput> {
  getManyQueryName = () => 'GetCompanies'
}

@Resolver(() => CompanyAddress)
export class CompanyAddressResolver {
  @FieldResolver()
  async countryId(@Root() companyAddress: CompanyAddress) {
    return companyAddress.country
  }
}

@Resolver(() => Company)
export class CompanyResolver {
  readonly companyService: CompanyService

  constructor() {
    this.companyService = new CompanyService(
      getCompanyQuery,
      getCompaniesQuery,
      updateCompanyMutation,
      createCompanyMutation,
      'Company',
    )
  }

  @Authorized()
  @Query(() => [CompanyType])
  async listCompanyTypes(@Ctx() { accessToken, idToken }: Context): Promise<CompanyType[]> {
    return query<CompanyType[]>(getCompanyTypesQuery, {}, 'GetConfigurationsByType', {
      accessToken,
      idToken,
    })
  }

  @Authorized()
  @Query(() => [Company])
  async listCompanies(@Ctx() { idToken, accessToken, storeCachedMetadata }: Context): Promise<Company[]> {
    const companies = await this.companyService.getEntities({ accessToken, idToken })
    companies?.forEach((company) => {
      storeCachedMetadata(entityName, company.id, company.metadata)
    })
    return companies
  }

  @Authorized()
  @Query(() => Company)
  async getCompany(
    @Ctx() { idToken, accessToken, storeCachedMetadata }: Context,
    @Arg('id') id: string,
  ): Promise<Company> {
    const company = await this.companyService.getEntity({ id, accessToken, idToken })
    if (!company) {
      throw new Error(`Company with id ${id} not found`)
    }
    storeCachedMetadata(entityName, id, company.metadata)
    return company
  }

  @Authorized()
  @Mutation(() => Company)
  async createCompany(
    @Ctx() { idToken, accessToken, storeCachedMetadata, operationMetadata }: Context,
    @Arg(entityName) company: CompanyInput,
  ): Promise<Company> {
    const { [entityName]: metadata } = operationMetadata
    const newCompany = await this.companyService.createEntity({
      accessToken,
      idToken,
      entityInput: {
        ...company,
        typeIds: company.companyTypeIds,
        address: { ...company.address, type: ContactAddressType.company },
        metadata,
      },
    })

    storeCachedMetadata(entityName, newCompany.id, newCompany.metadata)
    return newCompany
  }

  @Authorized()
  @Mutation(() => Company)
  async updateCompany(
    @Ctx() { idToken, accessToken, storeCachedMetadata, operationMetadata }: Context,
    @Arg('id') id: string,
    @Arg(entityName) company: CompanyInput,
  ): Promise<Company> {
    const { [entityName]: metadata } = operationMetadata
    const newCompany = await this.companyService.updateEntity({
      accessToken,
      idToken,
      id,
      entityInput: {
        ...company,
        typeIds: company.companyTypeIds,
        address: { ...company.address, type: ContactAddressType.company },
        metadata,
      },
    })
    storeCachedMetadata(entityName, newCompany.id, newCompany.metadata)
    return newCompany
  }

  @FieldResolver(() => [CompanyType])
  async companyTypes(@Root() company: Company, @Ctx() context: Context): Promise<CompanyType[]> {
    const types = await this.listCompanyTypes(context)
    return types.filter((type) => company.typeIds.includes(type.id))
  }
}
