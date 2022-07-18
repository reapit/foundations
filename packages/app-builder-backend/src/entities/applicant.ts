import { gql } from 'apollo-server-core'
import { ObjectType, Field, ID, InputType, GraphQLISODateTime, registerEnumType, Int } from 'type-graphql'
import { GraphQLDate } from 'graphql-iso-date'
import { Negotiator, NegotiatorFragment } from './negotiator'
import { Office, OfficeFragment } from './office'
import { Department, DepartmentFragment } from './department'
import { ExternalAreaType, InternalAreaType, PropertyLettingFrequency } from './property'

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
  active: boolean

  @Field({ nullable: true })
  notes: string

  @Field(() => Department, { nullable: true })
  department?: Department

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

  @Field(() => ApplicantBuying, { nullable: true, description: '@onlyIf({ "marketingMode": "buying" })' })
  buying: ApplicantBuying

  @Field(() => ApplicantRenting, { nullable: true, description: '@onlyIf({ "marketingMode": "renting" })' })
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
  @Field(() => ExternalAreaType)
  type: ExternalAreaType

  @Field(() => Int)
  amountFrom: number

  @Field(() => Int)
  amountTo: number
}

@InputType()
export class ApplicantInternalAreaInput {
  @Field(() => InternalAreaType)
  type: InternalAreaType

  @Field(() => Int)
  amount: number
}

@InputType()
export class ApplicantRentingInput {
  @Field(() => PropertyLettingFrequency)
  rentFrequency: PropertyLettingFrequency

  @Field(() => Int)
  rentFrom: number

  @Field(() => Int)
  rentTo: number
}

export enum MarketingMode {
  buying = 'buying',
  renting = 'renting',
}
registerEnumType(MarketingMode, {
  name: 'MarketingMode',
  description: 'Buying or renting',
})

@InputType()
export class ApplicantInput {
  @Field()
  description: string

  @Field(() => MarketingMode)
  marketingMode: MarketingMode

  @Field(() => String, { description: '@idOf(Department)' })
  departmentId: string

  @Field({ nullable: true })
  active?: boolean

  @Field({ nullable: true })
  notes?: string

  @Field(() => GraphQLDate, { nullable: true })
  lastCall?: Date

  @Field(() => GraphQLDate, { nullable: true })
  nextCall?: Date

  @Field(() => [String], { nullable: true, description: '@customInput(department-lookup)' })
  type?: string[]

  @Field(() => [String], { nullable: true, description: '@customInput(department-lookup)' })
  style?: string[]

  @Field(() => [String], { nullable: true, description: '@customInput(department-lookup)' })
  situation?: string[]

  @Field(() => [String], { nullable: true, description: '@customInput(department-lookup)' })
  parking?: string[]

  @Field(() => [String], { nullable: true, description: '@customInput(department-lookup)' })
  locality?: string[]

  @Field(() => Int, { nullable: true })
  bedroomsMin?: number

  @Field(() => Int, { nullable: true })
  bedroomsMax?: number

  @Field(() => Int, { nullable: true })
  receptionsMin?: number

  @Field(() => Int, { nullable: true })
  receptionsMax?: number

  @Field(() => Int, { nullable: true })
  bathroomsMin?: number

  @Field(() => Int, { nullable: true })
  bathroomsMax?: number

  @Field(() => ApplicantBuyingInput, { nullable: true, description: '@onlyIf({ "marketingMode": "buying" })' })
  buying?: ApplicantBuyingInput

  @Field(() => ApplicantRentingInput, { nullable: true, description: '@onlyIf({ "marketingMode": "renting" })' })
  renting?: ApplicantRentingInput

  @Field(() => Int, { nullable: true })
  parkingSpacesMin?: number

  @Field(() => Int, { nullable: true })
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

  metadata?: any
}

export const ApplicantFields = `
  id
  created
  modified
  marketingMode
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
  departmentId
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
