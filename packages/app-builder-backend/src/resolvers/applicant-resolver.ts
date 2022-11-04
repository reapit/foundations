import { Applicant, ApplicantFragment, ApplicantInput } from '../entities/applicant'
import { Negotiator } from '../entities/negotiator'
import { Office } from '../entities/office'
import { MetadataSchemaType } from '@/utils/extract-metadata'
import { Context } from '@apollo/client'
import { gql } from 'apollo-server-core'
import { Arg, Authorized, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql'
import { query } from '../utils/graphql-fetch'
import { Department } from '../entities/department'
import { Contact } from '../entities/contact'
import { getContact } from './contact-resolver'

const getApplicationQuery = gql`
  ${ApplicantFragment}
  query GetApplicants($name: String) {
    GetApplicants(name: $name, embed: [offices, department, negotiators]) {
      _embedded {
        ...ApplicantFragment
      }
    }
  }
`

const getApplicantQuery = gql`
  ${ApplicantFragment}
  query GetApplicant($id: String!) {
    GetApplicantById(id: $id, embed: [offices, department, negotiators]) {
      ...ApplicantFragment
    }
  }
`

const createApplicantMutation = gql`
  ${ApplicantFragment}
  mutation CreateApplicant(
    $marketingMode: String!
    $active: Boolean!
    $notes: String!
    $type: [String!]!
    $style: [String!]!
    $situation: [String!]!
    $parking: [String!]!
    $bedroomsMin: Int
    $bedroomsMax: Int
    $receptionsMin: Int
    $receptionsMax: Int
    $bathroomsMin: Int
    $bathroomsMax: Int
    $parkingSpacesMin: Int
    $parkingSpacesMax: Int
    $buying: ApplicantBuyingInput
    $renting: ApplicantRentingInput
    $externalArea: ApplicantExternalAreaInput
    $internalArea: ApplicantInternalAreaInput
    $officeIds: [String!]
    $negotiatorIds: [String!]
    $departmentId: String!
    $related: [ApplicantRelateInput]
    $metadata: JSON
  ) {
    CreateApplicant(
      marketingMode: $marketingMode
      active: $active
      notes: $notes
      type: $type
      style: $style
      situation: $situation
      parking: $parking
      bedroomsMin: $bedroomsMin
      bedroomsMax: $bedroomsMax
      receptionsMin: $receptionsMin
      receptionsMax: $receptionsMax
      bathroomsMin: $bathroomsMin
      bathroomsMax: $bathroomsMax
      parkingSpacesMin: $parkingSpacesMin
      parkingSpacesMax: $parkingSpacesMax
      externalArea: $externalArea
      internalArea: $internalArea
      renting: $renting
      buying: $buying

      negotiatorIds: $negotiatorIds
      officeIds: $officeIds
      departmentId: $departmentId
      metadata: $metadata
      related: $related
    ) {
      ...ApplicantFragment
    }
  }
`

const updateApplicantMutation = gql`
  ${ApplicantFragment}
  mutation UpdateApplicant(
    $id: String!
    $marketingMode: String!
    $active: Boolean!
    $notes: String!
    $type: [String!]!
    $style: [String!]!
    $situation: [String!]!
    $parking: [String!]!
    $bedroomsMin: Int
    $bedroomsMax: Int
    $parkingSpacesMin: Int
    $parkingSpacesMax: Int
    $receptionsMin: Int
    $receptionsMax: Int
    $bathroomsMin: Int
    $bathroomsMax: Int
    $buying: ApplicantBuyingInput
    $renting: ApplicantRentingInput
    $externalArea: ApplicantExternalAreaInput
    $internalArea: ApplicantInternalAreaInput
    $officeIds: [String!]
    $departmentId: String!
    $negotiatorIds: [String!]
    $metadata: JSON
    $_eTag: String!
  ) {
    UpdateApplicant(
      id: $id
      marketingMode: $marketingMode
      active: $active
      notes: $notes
      type: $type
      style: $style
      situation: $situation
      parking: $parking
      bedroomsMin: $bedroomsMin
      bedroomsMax: $bedroomsMax
      receptionsMin: $receptionsMin
      receptionsMax: $receptionsMax
      bathroomsMin: $bathroomsMin
      bathroomsMax: $bathroomsMax
      parkingSpacesMin: $parkingSpacesMin
      parkingSpacesMax: $parkingSpacesMax
      departmentId: $departmentId
      externalArea: $externalArea
      internalArea: $internalArea
      buying: $buying
      renting: $renting
      _eTag: $_eTag
      negotiatorIds: $negotiatorIds
      officeIds: $officeIds
      metadata: $metadata
    ) {
      ...ApplicantFragment
    }
  }
`

type ApplicantAPIResponse<T> = Omit<Omit<Applicant, 'offices'>, 'negotiators'> & {
  _embedded: T
  _eTag: string
}

type ApplicantsEmbeds = {
  offices: Office[]
  negotiators: Negotiator[]
  department: Department
}

const addDefaultEmbeds = (applicant: Applicant): Applicant => ({
  ...applicant,
  offices: applicant.offices || [],
  negotiators: applicant.negotiators || [],
})

const hoistEmbeds = <T, E>(object: T & { _embedded: any }): T & E => {
  const { _embedded, ...rest } = object
  return { ...rest, ..._embedded }
}

const getApplicants = async (accessToken: string, idToken: string, name?: string): Promise<Applicant[]> => {
  const applicants = await query<{ _embedded: ApplicantAPIResponse<ApplicantsEmbeds>[] }>(
    getApplicationQuery,
    { name },
    'GetApplicants',
    {
      accessToken,
      idToken,
    },
  )

  return applicants._embedded
    .map((c) => hoistEmbeds<ApplicantAPIResponse<ApplicantsEmbeds>, ApplicantsEmbeds>(c))
    .map(addDefaultEmbeds)
}

const getApiApplicant = async (
  id: string,
  accessToken: string,
  idToken: string,
): Promise<ApplicantAPIResponse<ApplicantsEmbeds> | null> => {
  return query<ApplicantAPIResponse<ApplicantsEmbeds> | null>(getApplicantQuery, { id }, 'GetApplicantById', {
    accessToken,
    idToken,
  })
}

const getApplicant = async (id: string, accessToken: string, idToken: string): Promise<Applicant | null> => {
  const applicant = await getApiApplicant(id, accessToken, idToken)

  if (!applicant) {
    return null
  }

  const hoistedApplicant = hoistEmbeds<ApplicantAPIResponse<ApplicantsEmbeds>, ApplicantsEmbeds>(applicant)
  return addDefaultEmbeds(hoistedApplicant)
}

const createApplicant = async (
  applicant: ApplicantInput,
  accessToken: string,
  idToken: string,
): Promise<{ id: string }> => {
  const { contactId, ...app } = applicant
  const res = await query<ApplicantAPIResponse<null>>(
    createApplicantMutation,
    {
      ...app,
      related: [
        {
          associatedId: contactId,
          associatedType: 'contact',
        },
      ],
    },
    'CreateApplicant',
    {
      accessToken,
      idToken,
    },
  )
  const { id } = res
  return { id }
}

const updateApplicant = async (
  id: string,
  applicant: ApplicantInput,
  accessToken: string,
  idToken: string,
): Promise<void> => {
  const existingApplicant = await getApiApplicant(id, accessToken, idToken)
  if (!existingApplicant) {
    throw new Error(`Applicant with id ${id} not found`)
  }

  const { _eTag } = existingApplicant
  const { contactId, ...app } = applicant
  await query<ApplicantAPIResponse<null>>(
    updateApplicantMutation,
    { ...app, related: [{ associatedId: contactId, associatedType: 'contact' }], id, _eTag },
    'UpdateApplicant',
    {
      accessToken,
      idToken,
    },
  )
}

const entityName: MetadataSchemaType = 'applicant'

@Resolver(() => Applicant)
export class ApplicantResolver {
  @Authorized()
  @Query(() => [Applicant])
  async listApplicants(@Ctx() { accessToken, idToken, storeCachedMetadata }: Context): Promise<Applicant[]> {
    const applicants = await getApplicants(accessToken, idToken)
    applicants?.forEach((applicant) => {
      storeCachedMetadata(entityName, applicant.id, applicant.metadata)
    })
    return applicants
  }

  @Authorized()
  @Query(() => [Applicant])
  async searchApplicants(
    @Arg('query') query: string,
    @Ctx() { accessToken, idToken, storeCachedMetadata }: Context,
  ): Promise<Applicant[]> {
    const applicants = await getApplicants(accessToken, idToken, query)
    applicants?.forEach((applicant) => {
      storeCachedMetadata(entityName, applicant.id, applicant.metadata)
    })
    return applicants
  }

  @Authorized()
  @Mutation(() => Applicant)
  async createApplicant(@Ctx() ctx: Context, @Arg(entityName) applicantInput: ApplicantInput): Promise<Applicant> {
    const { accessToken, idToken, storeCachedMetadata, operationMetadata } = ctx
    const { [entityName]: metadata } = operationMetadata
    const applicant = await createApplicant({ ...applicantInput, metadata }, accessToken, idToken)
    storeCachedMetadata(entityName, applicant.id, metadata)
    return this.getApplicant(ctx, applicant.id)
  }

  @Authorized()
  @Query(() => Applicant)
  async getApplicant(
    @Ctx() { accessToken, idToken, storeCachedMetadata }: Context,
    @Arg('id') id: string,
  ): Promise<Applicant> {
    const applicant = await getApplicant(id, accessToken, idToken)
    if (!applicant) {
      throw new Error(`Applicant with id ${id} not found`)
    }
    storeCachedMetadata(entityName, id, applicant.metadata)
    return applicant
  }

  @Authorized()
  @Mutation(() => Applicant)
  async updateApplicant(
    @Ctx() context: Context,
    @Arg('id') id: string,
    @Arg(entityName) applicantDto: ApplicantInput,
  ): Promise<Applicant> {
    const { accessToken, idToken, operationMetadata, storeCachedMetadata } = context
    const { [entityName]: metadata } = operationMetadata
    await updateApplicant(id, { ...applicantDto, metadata }, accessToken, idToken)
    storeCachedMetadata(entityName, id, applicantDto.metadata)
    return this.getApplicant(context, id)
  }

  @Authorized()
  @FieldResolver(() => Contact)
  async contact(
    @Ctx() { accessToken, idToken, storeCachedMetadata }: Context,
    @Root() applicant: Applicant,
  ): Promise<Contact | undefined> {
    const { related } = applicant
    const contactId = related.find((r) => r.type === 'contact')?.id
    if (!contactId) {
      throw new Error('Contact not found for applicant')
    }
    const contact = await getContact(contactId, accessToken, idToken)
    if (!contact) {
      throw new Error(`Contact with id ${contactId} not found`)
    }
    storeCachedMetadata('contact', contact.id, contact.metadata)
    return contact
  }
}
