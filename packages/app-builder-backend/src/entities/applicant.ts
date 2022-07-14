import { gql } from 'apollo-server-core'
import { ObjectType, Field, ID, InputType, GraphQLISODateTime } from 'type-graphql'
import { GraphQLDate } from 'graphql-iso-date'
import { Negotiator, NegotiatorFragment } from './negotiator'
import { Office, OfficeFragment } from './office'
import { Department, DepartmentFragment } from './department'

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
class ApplicantRenting {
  @Field({ nullable: true })
  rentingTo?: number

  @Field({ nullable: true })
  rentingFrom?: number

  @Field({ nullable: true })
  rentingFrequency?: string
}

@ObjectType({ description: '@labelKeys(title, forename, surname) @supportsCustomFields()' })
export class Applicant {
  @Field(() => ID)
  id: string

  @Field(() => GraphQLISODateTime)
  created: Date

  @Field(() => GraphQLISODateTime)
  modified: Date

  @Field({ nullable: true })
  marketingMode: string

  @Field({ nullable: true })
  currency: string

  @Field({ nullable: true })
  active: boolean

  @Field({ nullable: true })
  notes: string

  @Field(() => Department, { nullable: true })
  department?: Department

  @Field({ nullable: true })
  solicitorId: string

  @Field(() => [String])
  type: string[]

  @Field(() => [String])
  style: string[]

  @Field(() => [String])
  situation: string[]

  @Field(() => [String])
  parking: string[]

  @Field({ nullable: true })
  bedroomsMin: number

  @Field({ nullable: true })
  bedroomsMax: number

  @Field({ nullable: true })
  receptionsMin: number

  @Field({ nullable: true })
  receptionsMax: number

  @Field({ nullable: true })
  bathroomsMin: number

  @Field({ nullable: true })
  bathroomsMax: number

  @Field(() => GraphQLDate, { nullable: true })
  lastCall: Date

  @Field(() => GraphQLDate, { nullable: true })
  nextCall: Date

  @Field({ nullable: true })
  parkingSpacesMin: number

  @Field({ nullable: true })
  parkingSpacesMax: number

  @Field(() => ApplicantBuying, { nullable: true })
  buying: ApplicantBuying

  @Field(() => ApplicantRenting, { nullable: true })
  renting: ApplicantRenting

  @Field(() => ApplicantExternalArea, { nullable: true })
  externalArea: ApplicantExternalArea

  @Field(() => ApplicantInternalArea, { nullable: true })
  internalArea: ApplicantInternalArea

  @Field(() => [Office], { nullable: true })
  offices?: Office[]

  @Field(() => [Negotiator], { nullable: true })
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
export class ApplicantRentingInput {
  @Field({ nullable: true })
  rentFrequency?: string

  @Field({ nullable: true })
  rentFrom?: number

  @Field({ nullable: true })
  rentTo?: number
}

@InputType()
export class ApplicantInput {
  @Field()
  description: string

  @Field()
  marketingMode: string

  @Field({ nullable: true })
  currency?: string

  @Field({ nullable: true })
  active?: boolean

  @Field({ nullable: true })
  notes?: string

  @Field(() => GraphQLDate, { nullable: true })
  lastCall?: Date

  @Field(() => GraphQLDate, { nullable: true })
  nextCall?: Date

  @Field(() => [String], { nullable: true })
  type?: string[]

  @Field(() => [String], { nullable: true })
  style?: string[]

  @Field(() => [String], { nullable: true })
  situation?: string[]

  @Field(() => [String], { nullable: true })
  parking?: string[]

  @Field({ nullable: true })
  bedroomsMin?: number

  @Field({ nullable: true })
  bedroomsMax?: number

  @Field({ nullable: true })
  receptionsMin?: number

  @Field({ nullable: true })
  receptionsMax?: number

  @Field({ nullable: true })
  bathroomsMin?: number

  @Field({ nullable: true })
  bathroomsMax?: number

  @Field(() => ApplicantBuyingInput, { nullable: true })
  buying?: ApplicantBuyingInput

  @Field(() => ApplicantRentingInput, { nullable: true })
  renting?: ApplicantRentingInput

  @Field({ nullable: true })
  parkingSpacesMin?: number

  @Field({ nullable: true })
  parkingSpacesMax?: number

  @Field(() => ApplicantExternalAreaInput, { nullable: true })
  externalArea?: ApplicantExternalAreaInput

  @Field(() => ApplicantInternalAreaInput, { nullable: true })
  internalArea?: ApplicantInternalAreaInput

  @Field(() => [String], { description: '@idOf(Negotiator)', nullable: true })
  negotiatorIds?: string[]

  @Field(() => [String], { description: '@idOf(Office)', nullable: true })
  officeIds?: string[]

  @Field({ description: '@idOf(Contact)' })
  contactId: string

  @Field(() => String, { description: '@idOf(Department)' })
  departmentId: string

  metadata?: any
}

export const ApplicantFields = `
  id
  created
  modified
  marketingMode
  currency
  active
  nextCall
  lastCall
  notes
  type
  style
  situation
  parking
  bedroomsMin
  bedroomsMax
  receptionsMin
  receptionsMax
  bathroomsMin
  bathroomsMax
  parkingSpacesMin
  parkingSpacesMax
  buying {
    priceFrom
    priceTo
  }
  renting {
    rentFrom
    rentTo
    rentFrequency
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
`

export const ApplicantFragment = gql`
  ${NegotiatorFragment}
  ${OfficeFragment}
  ${DepartmentFragment}

  fragment ApplicantFragment on ApplicantModel {
    ${ApplicantFields}

    _embedded {
      offices {
        ...OfficeFragment
      }
      negotiators {
        ...NegotiatorFragment
      }
      department {
        ...DepartmentFragment
      }
    }
    _eTag
  }
`
