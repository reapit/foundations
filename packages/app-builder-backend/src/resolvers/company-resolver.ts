import { Company, CompanyFragment, CompanyInput } from '../entities/company'
import { query } from '../utils/graphql-fetch'
import { Context } from '@apollo/client'
import { gql } from 'apollo-server-core'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'

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
    $branch: String
    $notes: String
    $active: Boolean
    $vatRegistered: Boolean
    $typeIds: [String]
    $supplierTypeId: String
    $workPhone: String
    $mobilePhone: String
    $email: String!
    $metadata: JSON
    $address: CompanyAddressInput!
  ) {
    CreateCompany(
      name: $name
      branch: $branch
      notes: $notes
      active: $active
      vatRegistered: $vatRegistered
      typeIds: $typeIds
      supplierTypeId: $supplierTypeId
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
    $branch: String
    $notes: String
    $active: Boolean
    $vatRegistered: Boolean
    $typeIds: [String]
    $supplierTypeId: String
    $workPhone: String
    $mobilePhone: String
    $email: String!
    $metadata: JSON
    $address: CompanyAddressInput!
  ) {
    UpdateCompany(
      id: $id
      name: $name
      branch: $branch
      notes: $notes
      active: $active
      vatRegistered: $vatRegistered
      typeIds: $typeIds
      supplierTypeId: $supplierTypeId
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

type CompanyAPIResponse<T> = Company & {
  _embedded: T
  _eTag: string
}

type CompaniesEmbeds = {}

const getApiCompany = async (
  id: string,
  accessToken: string,
  idToken: string,
): Promise<CompanyAPIResponse<CompaniesEmbeds> | null> => {
  return query<CompanyAPIResponse<CompaniesEmbeds> | null>(getCompanyQuery, { id }, 'GetCompanyById', {
    accessToken,
    idToken,
  })
}

const addDefaultEmbeds = (company: Company): Company => ({
  ...company,
})

const hoistEmbeds = <T, E>(object: T & { _embedded: any }): T & E => {
  const { _embedded, ...rest } = object
  return { ...rest, ..._embedded }
}

const convertDates = (company: Company): Company => ({
  ...company,
  created: new Date(company.created),
  modified: new Date(company.modified),
})

const getCompany = async (id: string, accessToken: string, idToken: string): Promise<Company | null> => {
  const company = await getApiCompany(id, accessToken, idToken)

  if (!company) {
    return null
  }

  // const hoistedCompanies = hoistEmbeds<CompanyAPIResponse<CompaniesEmbeds>, CompaniesEmbeds>(company)
  return convertDates(addDefaultEmbeds(company))
}

const getCompanies = async (accessToken: string, idToken: string): Promise<Company[]> => {
  const companies = await query<{ _embedded: CompanyAPIResponse<CompaniesEmbeds>[] }>(
    getCompaniesQuery,
    {},
    'GetCompanies',
    {
      accessToken,
      idToken,
    },
  )

  return companies._embedded
    .map((c) => hoistEmbeds<CompanyAPIResponse<CompaniesEmbeds>, CompaniesEmbeds>(c))
    .map(addDefaultEmbeds)
    .map(convertDates)
}

const createCompany = async (accessToken: string, idToken: string, company: CompanyInput): Promise<Company> => {
  const res = await query<CompanyAPIResponse<null>>(createCompanyMutation, company, 'CreateCompany', {
    accessToken,
    idToken,
  })
  const { id } = res
  const newCompany = await getCompany(id, accessToken, idToken)
  if (!newCompany) {
    throw new Error('Failed to create company')
  }
  return newCompany
}

const updateCompany = async (
  accessToken: string,
  idToken: string,
  id: string,
  company: CompanyInput,
): Promise<Company> => {
  const existingCompany = await getApiCompany(id, accessToken, idToken)
  if (!existingCompany) {
    throw new Error(`Company with id ${id} not found`)
  }
  const { _eTag } = existingCompany
  await query<CompanyAPIResponse<null>>(updateCompanyMutation, { ...company, id, _eTag }, 'UpdateCompany', {
    accessToken,
    idToken,
  })

  const newCompany = await getCompany(id, accessToken, idToken)
  if (!newCompany) {
    throw new Error('Company not found')
  }
  return newCompany
}

const entityName = 'company'

@Resolver(() => Company)
export class CompanyResolver {
  @Authorized()
  @Query(() => [Company])
  async listCompanies(@Ctx() { idToken, accessToken, storeCachedMetadata }: Context): Promise<Company[]> {
    const companies = await getCompanies(accessToken, idToken)
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
    const company = await getCompany(id, accessToken, idToken)
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
    const newCompany = await createCompany(accessToken, idToken, { ...company, metadata })
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
    const newCompany = await updateCompany(accessToken, idToken, id, { ...company, metadata })
    storeCachedMetadata(entityName, newCompany.id, newCompany.metadata)
    return newCompany
  }
}
