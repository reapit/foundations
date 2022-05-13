import { gql } from 'apollo-server-core'
import { ObjectType, Field, ID, InputType, GraphQLISODateTime } from 'type-graphql'
import { Negotiator, NegotiatorFragment } from './negotiator'
import { Office, OfficeFragment } from './office'

@ObjectType()
class ApplicantBuying {
  @Field()
  priceFrom: number

  @Field()
  priceTo: number

  @Field({ nullable: true })
  decoration: string

  @Field({ nullable: true })
  reasonId: string

  @Field({ nullable: true })
  positionId: string
}

@ObjectType()
class ApplicantExternalArea {
  @Field()
  type: string

  @Field()
  amountFrom: number

  @Field()
  amountTo: number
}

@ObjectType()
class ApplicantInternalArea {
  @Field()
  type: string

  @Field()
  amount: number
}

@ObjectType()
class ApplicantSource {
  @Field()
  id: string

  @Field()
  type: string
}

@ObjectType({ description: '@labelKeys(title, forename, surname) @supportsCustomFields()' })
export class Applicant {
  @Field(() => ID)
  id: string

  @Field(() => GraphQLISODateTime)
  created: Date

  @Field(() => GraphQLISODateTime)
  modified: Date

  @Field()
  marketingMode: string

  @Field()
  currency: string

  @Field()
  active: boolean

  @Field()
  notes: string

  @Field({ nullable: true })
  sellingStatus: string

  @Field({ nullable: true })
  sellingPosition: string

  @Field()
  lastCall: string

  @Field()
  nextCall: string

  // TODO add departments
  @Field()
  departmentId: string

  // TODO add solicitors
  @Field()
  solicitorId: string

  @Field(() => [String])
  type: string[]

  @Field(() => [String])
  style: string[]

  @Field(() => [String])
  situation: string[]

  @Field(() => [String])
  parking: string[]

  @Field(() => [String])
  age: string[]

  @Field(() => [String])
  locality: string[]

  @Field({ nullable: true })
  specialFeatures: string

  @Field()
  bedroomsMin: number

  @Field()
  bedroomsMax: number

  @Field()
  receptionsMin: number

  @Field()
  receptionsMax: number

  @Field()
  bathroomsMin: number

  @Field()
  bathroomsMax: number

  @Field()
  parkingSpacesMin: number

  @Field()
  parkingSpacesMax: number

  @Field()
  locationType: string

  @Field(() => [String])
  locationOptions: string[]

  @Field(() => GraphQLISODateTime, { nullable: true })
  archivedOn: Date

  @Field()
  fromArchive: boolean

  @Field(() => ApplicantBuying)
  buying: ApplicantBuying

  @Field({ nullable: true })
  renting: string

  @Field(() => ApplicantExternalArea)
  externalArea: ApplicantExternalArea

  @Field(() => ApplicantInternalArea)
  internalArea: ApplicantInternalArea

  @Field(() => ApplicantSource)
  source: ApplicantSource

  @Field({ nullable: true })
  commercial: string

  @Field({ nullable: true })
  regional: string

  @Field(() => [Office])
  offices?: Office[]

  @Field(() => [Negotiator])
  negotiators?: Negotiator[]

  // TODO solve related type
  // @Field()
  // related: []

  metadata?: any
}

@InputType()
export class ApplicantInput {
  @Field()
  marketingMode: string

  @Field()
  currency: string

  @Field()
  active: boolean

  @Field()
  notes: string

  @Field({ nullable: true })
  sellingStatus: string

  @Field({ nullable: true })
  sellingPosition: string

  @Field()
  lastCall: string

  @Field()
  nextCall: string

  @Field(() => [String])
  type: string[]

  @Field(() => [String])
  style: string[]

  @Field(() => [String])
  situation: string[]

  @Field(() => [String])
  parking: string[]

  @Field(() => [String])
  age: string[]

  @Field(() => [String])
  locality: string[]

  @Field({ nullable: true })
  specialFeatures: string

  @Field()
  bedroomsMin: number

  @Field()
  bedroomsMax: number

  @Field()
  receptionsMin: number

  @Field()
  receptionsMax: number

  @Field()
  bathroomsMin: number

  @Field()
  bathroomsMax: number

  @Field()
  parkingSpacesMin: number

  @Field()
  parkingSpacesMax: number

  @Field()
  locationType: string

  @Field(() => [String])
  locationOptions: string[]

  @Field(() => GraphQLISODateTime, { nullable: true })
  archivedOn: Date

  @Field()
  fromArchive: boolean

  @Field(() => ApplicantBuying)
  buying: ApplicantBuying

  @Field({ nullable: true })
  renting: string

  @Field(() => ApplicantExternalArea)
  externalArea: ApplicantExternalArea

  @Field(() => ApplicantInternalArea)
  internalArea: ApplicantInternalArea

  @Field(() => ApplicantSource)
  source: ApplicantSource

  @Field({ nullable: true })
  commercial: string

  @Field({ nullable: true })
  regional: string

  @Field(() => [String], { description: '@idOf(Negotiator)' })
  negotiatorIds: string[]

  @Field(() => [String], { description: '@idOf(Office)' })
  officeIds: string[]

  // @Field({ description: '@idOf(Department)' })
  // departmentId: string

  // @Field({ description: '@idOf(Solicitor)' })
  // solicitorId: string

  metadata?: any
}

export const ApplicantFragment = gql`
  ${NegotiatorFragment}
  ${OfficeFragment}
  fragment ApplicantFragment on ApplicantModel {
    id
    created
    modified
    marketingMode
    currency
    active
    notes
    sellingStatus
    sellingPosition
    lastCall
    nextCall
    type
    style
    situation
    parking
    age
    locality
    specialFeatures
    bedroomsMin
    bedroomsMax
    receptionsMin
    receptionsMax
    bathroomsMin
    bathroomsMax
    parkingSpacesMin
    parkingSpacesMax
    locationType
    locationOptions
    archivedOn
    fromArchive
    buying
    renting
    externalArea
    internalArea
    source
    commercial
    regional

    _embedded {
      offices {
        ...OfficeFragment
      }
      negotiators {
        ...NegotiatorFragment
      }
    }
    _eTag
  }
`
