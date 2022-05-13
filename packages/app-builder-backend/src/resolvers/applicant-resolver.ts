import { Applicant, ApplicantFragment } from '../entities/applicant'
import { Negotiator } from '../entities/negotiator'
import { Office } from '../entities/office'
import { MetadataSchemaType } from '@/utils/extract-metadata'
import { Context } from '@apollo/client'
import { gql } from 'apollo-server-core'
import { Authorized, Ctx, Query, Resolver } from 'type-graphql'
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
}
