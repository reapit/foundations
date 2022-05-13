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

// @ObjectType()
// class ApplicantRenting {
//   @Field()

// }

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
  locationType: string

  @Field(() => [String])
  locationOptions: string[]

  @Field(() => ApplicantBuying)
  buying: ApplicantBuying

  @Field(() => ApplicantExternalArea)
  externalArea: ApplicantExternalArea

  @Field(() => ApplicantInternalArea)
  internalArea: ApplicantInternalArea

  @Field(() => ApplicantSource)
  source: ApplicantSource

  // @Field({ nullable: true })
  // commercial: string

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
  locationType: string

  @Field(() => [String])
  locationOptions: string[]

  @Field(() => ApplicantBuying)
  buying: ApplicantBuying

  @Field(() => ApplicantExternalArea)
  externalArea: ApplicantExternalArea

  @Field(() => ApplicantInternalArea)
  internalArea: ApplicantInternalArea

  @Field(() => ApplicantSource)
  source: ApplicantSource

  // @Field({ nullable: true })
  // commercial: string

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
    lastCall
    nextCall
    type
    style
    situation
    parking
    age
    locality
    bedroomsMin
    bedroomsMax
    receptionsMin
    receptionsMax
    bathroomsMin
    bathroomsMax
    locationType
    locationOptions
    buying {
      priceFrom
      priceTo
    }
    externalArea {
      type
      amountFrom
      amountTo
    }
    internalArea {
      type
      amount
    }
    source {
      id
      type
    }

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
