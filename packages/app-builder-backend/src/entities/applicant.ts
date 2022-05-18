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
  lastCall: string

  @Field({ nullable: true })
  nextCall: string

  @Field()
  departmentId: string

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

  @Field(() => [Office])
  offices?: Office[]

  @Field(() => [Negotiator])
  negotiators?: Negotiator[]

  metadata?: any
}

@InputType()
export class ApplicantBuyingInput {
  @Field()
  priceFrom: number

  @Field()
  priceTo: number
}

@InputType()
export class ApplicantExternalAreaInput {
  @Field()
  type: string

  @Field()
  amountFrom: number

  @Field()
  amountTo: number
}

@InputType()
export class ApplicantInternalAreaInput {
  @Field()
  type: string

  @Field()
  amount: number
}

@InputType()
export class ApplicantSourceInput {
  @Field()
  id: string

  @Field()
  type: string
}

@InputType()
export class ApplicantInput {
  @Field()
  marketingMode: string

  @Field()
  currency: string

  @Field()
  active: boolean

  @Field({ nullable: true })
  notes: string

  @Field({ nullable: true })
  lastCall: string

  @Field({ nullable: true })
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

  @Field(() => ApplicantBuyingInput)
  buying: ApplicantBuyingInput

  @Field(() => ApplicantExternalAreaInput)
  externalArea: ApplicantExternalAreaInput

  @Field(() => ApplicantInternalAreaInput)
  internalArea: ApplicantInternalAreaInput

  @Field(() => ApplicantSourceInput)
  source: ApplicantSourceInput

  @Field(() => [String], { description: '@idOf(Negotiator)' })
  negotiatorIds: string[]

  @Field(() => [String], { description: '@idOf(Office)' })
  officeIds: string[]

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
