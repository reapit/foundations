import { Applicant, ApplicantFragment, ApplicantInput } from '../entities/applicant'
import { Negotiator } from '../entities/negotiator'
import { Office } from '../entities/office'
import { MetadataSchemaType } from '@/utils/extract-metadata'
import { Context } from '@apollo/client'
import { gql } from 'apollo-server-core'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { query } from '../utils/graphql-fetch'

const getApplicationQuery = gql`
  ${ApplicantFragment}
  {
    GetApplicants(embed: [offices, negotiators]) {
      _embedded {
        ...ApplicantFragment
      }
    }
  }
`

const getApplicantQuery = gql`
  ${ApplicantFragment}
  query GetApplicant($id: String!) {
    GetApplicantById(id: $id, embed: [offices, negotiators]) {
      ...ApplicantFragment
    }
  }
`

const createApplicantMutation = gql`
  ${ApplicantFragment}
  mutation CreateApplicant(
    $marketingMode: String!
    $currency: String!
    $active: Boolean!
    $notes: String!
    $lastCall: Date!
    $nextCall: Date!
    $type: [String!]!
    $style: [String!]!
    $situation: [String!]!
    $parking: [String!]!
    $age: [String!]!
    $locality: [String!]!
    $bedroomsMin: Number!
    $bedroomsMax: Nubmer!
    $receptionsMin: Number!
    $receptionsMax: Number!
    $bathroomsMin: Number!
    $bathroomsMax: Number!
    $locationType: String!
    $locationOptions: [String!]!
    $buying: ApplicantBuyingInput
    $renting: ApplicantRentingInput
    $externalArea: ApplicantExternalAreaInput
    $internalArea: ApplicantInternalAreaInput
    $source: ApplicantSourceInput
    $officeIds: [String!]!
    $negotiatorIds: [String!]!
    $metadata: JSON
  ) {
    CreateApplicant(
      marketingMode: $marketingMode
      currency: $currency
      active: $active
      notes: $notes
      lastCall: $lastCall
      nextCall: $nextCall
      type: $type
      style: $style
      situation: $situation
      parking: $parking
      age: $age
      locality: $locality
      bedroomsMin: $bedroomsMin
      bedroomsMax: $bedroomsMax
      receptionsMin: $receptionsMin
      receptionsMax: $receptionsMax
      bathroomsMin: $bathroomsMin
      bathroomsMax: $bathroomsMax
      locationType: $locationType
      locationOptions: $locationOptions

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

const convertDates = (applicant: Applicant): Applicant => ({
  ...applicant,
  created: new Date(applicant.created),
  modified: new Date(applicant.modified),
})

const getApplicants = async (accessToken: string, idToken: string): Promise<Applicant[]> => {
  const applicants = await query<{ _embedded: ApplicantAPIResponse<ApplicantsEmbeds>[] }>(
    getApplicationQuery,
    {},
    'GetApplicants',
    {
      accessToken,
      idToken,
    },
  )

  return applicants._embedded
    .map((c) => hoistEmbeds<ApplicantAPIResponse<ApplicantsEmbeds>, ApplicantsEmbeds>(c))
    .map(addDefaultEmbeds)
    .map(convertDates)
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
  const contact = await getApiApplicant(id, accessToken, idToken)

  if (!contact) {
    return null
  }

  const hoistedContact = hoistEmbeds<ApplicantAPIResponse<ApplicantsEmbeds>, ApplicantsEmbeds>(contact)
  return convertDates(addDefaultEmbeds(hoistedContact))
}

const createApplicant = async (applicant: ApplicantInput, accessToken: string, idToken: string): Promise<Applicant> => {
  const res = await query<ApplicantAPIResponse<null>>(createApplicantMutation, applicant, 'CreateApplicant', {
    accessToken,
    idToken,
  })
  const { id } = res
  const newApplicant = await getApplicant(id, accessToken, idToken)
  if (!newApplicant) {
    throw new Error('Failed to create applicant')
  }
  return newApplicant
}

const entityName: MetadataSchemaType = 'applicant'

@Resolver(() => Applicant)
export class ApplicantResolver {
  @Authorized()
  @Query(() => [Applicant])
  async listApplicants(@Ctx() { accessToken, idToken, storeCachedMetadata }: Context): Promise<Applicant[]> {
    const applicants = await getApplicants(accessToken, idToken)
    applicants.forEach((contact) => {
      storeCachedMetadata(entityName, contact.id, contact.metadata)
    })
    return applicants
  }

  @Authorized()
  @Mutation(() => Applicant)
  async createApplicant(
    @Ctx() { accessToken, idToken, storeCachedMetadata, operationMetadata }: Context,
    @Arg(entityName) applicantInput: ApplicantInput,
  ): Promise<Applicant> {
    const { [entityName]: metadata } = operationMetadata
    const applicant = await createApplicant({ ...applicantInput, metadata }, accessToken, idToken)
    storeCachedMetadata(entityName, applicant.id, applicant.metadata)
    return applicant
  }
}
