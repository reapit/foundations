import { gql } from 'apollo-server-core'
import { ObjectType, Field, ID, InputType, GraphQLISODateTime } from 'type-graphql'
import { GraphQLDate } from 'graphql-iso-date'
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
class ApplicantRenting {
  @Field()
  rentingTo: number

  @Field()
  rentingFrom: number

  @Field()
  rentingFrequency: string
}

@ObjectType()
class Department {
  @Field()
  id: string

  @Field()
  description: string

  @Field()
  name: string

  @Field()
  typeOptions: string

  @Field()
  styleOptions: string

  @Field()
  situationOptions: string

  @Field()
  parkingOptions: string

  @Field()
  ageOptions: string

  @Field()
  localityOptions: string

  @Field()
  specialFeaturesOptions: string

  @Field()
  commericalUseClassOptions: string

  @Field()
  commercialFloorLevelOptions: string

  @Field()
  hasBedrooms: boolean

  @Field()
  hasBathrooms: boolean

  @Field()
  hasReceptionRooms: boolean

  @Field()
  hasParkingSpaces: boolean
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

  @Field(() => Department)
  department: Department

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

  @Field(() => [Office])
  offices?: Office[]

  @Field({ nullable: true })
  description: string

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
export class ApplicantRentingInput {
  @Field()
  rentFrequency: string

  @Field()
  rentFrom: number

  @Field()
  rentTo: number
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

export const ApplicantFragment = gql`
  ${NegotiatorFragment}
  ${OfficeFragment}
  fragment DepartmentFragment on DepartmentModel {
    id
    description
    name
    typeOptions
    styleOptions
    situationOptions
    parkingOptions
    ageOptions
    localityOptions
    specialFeaturesOptions
    commericalUseClassOptions
    commercialFloorLevelOptions
    hasBedrooms
    hasBathrooms
    hasReceptionRooms
    hasParkingSpaces
  }

  fragment ApplicantFragment on ApplicantModel {
    id
    created
    modified
    marketingMode
    currency
    active
    firstCall
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
    description
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
