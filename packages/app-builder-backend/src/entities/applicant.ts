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

  @Field(() => Department)
  department: Department

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
  parkingSpacesMin: number

  @Field()
  parkingSpacesMax: number

  @Field()
  locationType: string

  @Field(() => [String])
  locationOptions: string[]

  @Field(() => ApplicantBuying)
  buying: ApplicantBuying

  @Field(() => ApplicantRenting)
  renting: ApplicantRenting

  @Field(() => ApplicantExternalArea)
  externalArea: ApplicantExternalArea

  @Field(() => ApplicantInternalArea)
  internalArea: ApplicantInternalArea

  @Field(() => ApplicantSource)
  source: ApplicantSource

  @Field(() => [Office])
  offices?: Office[]

  @Field()
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
export class ApplicantSourceInput {
  @Field()
  id: string

  @Field()
  type: string
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

  @Field(() => ApplicantRentingInput)
  renting: ApplicantRentingInput

  @Field()
  parkingSpacesMin: number

  @Field()
  parkingSpacesMax: number

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
    parkingSpacesMin
    parkingSpacesMax
    description
    locationType
    locationOptions
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
