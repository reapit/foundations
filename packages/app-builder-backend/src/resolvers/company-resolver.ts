import { Company, CompanyFragment, CompanyInput } from '../entities/company'
import { Context } from '@apollo/client'
import { gql } from 'apollo-server-core'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { AbstractCrudService } from './abstract-crud-resolver'

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
    $address: CompanyAddressInput!
  ) {
    CreateCompany(
      name: $name
      active: $active
      workPhone: $workPhone
      mobilePhone: $mobilePhone
      email: $email
      metadata: $metadata
      address: $address
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
    $metadata: JSON
    $address: CompanyAddressInput!
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
    ) {
      ...CompanyFragment
    }
  }
`

type CompaniesEmbeds = {}

const entityName = 'company'

class CompanyService extends AbstractCrudService<Company, CompaniesEmbeds, CompanyInput> {
  getManyQueryName = () => 'GetCompanies'
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
      entityInput: { ...company, metadata },
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
      entityInput: { ...company, metadata },
    })
    storeCachedMetadata(entityName, newCompany.id, newCompany.metadata)
    return newCompany
  }
}
