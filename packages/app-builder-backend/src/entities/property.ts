import { ObjectType, Field, ID, InputType, registerEnumType } from 'type-graphql'
import { gql } from 'apollo-server-core'
import { PropertyImage, PropertyImageFragment } from './property-image'
import { Negotiator, NegotiatorFragment } from './negotiator'
import { Office, OfficeFragment } from './office'
import { Department, DepartmentFragment } from './department'

export const PropertyFragment = gql`
  ${NegotiatorFragment}
  ${OfficeFragment}
  ${DepartmentFragment}
  ${PropertyImageFragment}
  fragment PropertyFragment on PropertyModel {
    id
    _eTag
    created
    modified
    type
    description
    strapline
    parking
    internetAdvertising
    parkingSpaces
    notes
    marketingMode
    externalArea {
      type
      min
      max
    }
    internalArea {
      type
      min
      max
    }
    receptions
    address {
      line1
      line2
      line3
      line4
      buildingName
      buildingNumber
      postcode
      geolocation {
        latitude
        longitude
      }
    }
    selling {
      price
      status
    }
    letting {
      rent
      rentFrequency
      status
    }
    _embedded {
      images {
        ...PropertyImageFragment
      }
      negotiator {
        ...NegotiatorFragment
      }
      offices {
        ...OfficeFragment
      }
      department {
        ...DepartmentFragment
      }
    }
    metadata
  }
`

@ObjectType()
class GeoLocation {
  @Field({ nullable: true })
  latitude?: number

  @Field({ nullable: true })
  longitude?: number
}

@ObjectType()
class PropertyAddress {
  @Field({ nullable: true })
  line1?: string

  @Field({ nullable: true })
  line2?: string

  @Field({ nullable: true })
  line3?: string

  @Field({ nullable: true })
  line4?: string

  @Field({ nullable: true })
  buildingName?: string

  @Field({ nullable: true })
  buildingNumber?: string

  @Field({ nullable: true })
  postcode?: string

  @Field(() => GeoLocation)
  geolocation?: GeoLocation
}

export enum PropertyLettingStatus {
  valuation = 'valuation',
  toLet = 'toLet',
  toLetUnavailable = 'toLetUnavailable',
  underOffer = 'underOffer',
  underOfferUnavailable = 'underOfferUnavailable',
  arrangingTenancyUnavailable = 'arrangingTenancyUnavailable',
  arrangingTenancy = 'arrangingTenancy',
  tenancyCurrentUnavailable = 'tenancyCurrentUnavailable',
  tenancyCurrent = 'tenancyCurrent',
  tenancyFinished = 'tenancyFinished',
  tenancyCancelled = 'tenancyCancelled',
  sold = 'sold',
  letByOtherAgent = 'letByOtherAgent',
  letPrivately = 'letPrivately',
  provisional = 'provisional',
  withdrawn = 'withdrawn',
  none = '',
}
registerEnumType(PropertyLettingStatus, {
  name: 'PropertyLettingStatus',
  description: 'PropertyLettingStatus',
})

@ObjectType()
class PropertyLetting {
  @Field()
  rent: number

  @Field()
  rentFrequency: string

  @Field(() => PropertyLettingStatus)
  status: PropertyLettingStatus
}

@ObjectType()
class PropertySelling {
  @Field()
  price: number

  @Field(() => PropertySellingStatus, { nullable: true })
  status: PropertySellingStatus
}

export enum ExternalAreaType {
  acres = 'acres',
  hectares = 'hectares',
}
registerEnumType(ExternalAreaType, {
  name: 'ExternalAreaType',
  description: 'ExternalAreaType',
})

@ObjectType()
class ExternalArea {
  @Field({ nullable: true })
  type: ExternalAreaType

  @Field({ nullable: true })
  min: number

  @Field({ nullable: true })
  max: number
}

export enum InternalAreaType {
  squareFeet = 'squareFeet',
  squareMetres = 'squareMetres',
}
registerEnumType(InternalAreaType, {
  name: 'InternalAreaType',
  description: 'InternalAreaType',
})

@ObjectType()
class InternalArea {
  @Field({ nullable: true })
  type: InternalAreaType

  @Field({ nullable: true })
  min: number

  @Field({ nullable: true })
  max: number
}

@ObjectType()
class Room {
  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  dimensions?: string

  @Field({ nullable: true })
  description?: string
}

@ObjectType({
  description: '@supportsCustomFields() @labelKeys(address)',
})
export class Property {
  @Field(() => ID, {
    description: '@acKey(prpCode)',
  })
  id: string

  @Field({ nullable: true })
  strapline?: string

  @Field({ nullable: true })
  description?: string

  @Field(() => [String], { nullable: true })
  parking?: string[]

  @Field({ nullable: true })
  internetAdvertising?: boolean

  @Field({ nullable: true })
  notes?: string

  @Field(() => ExternalArea, { nullable: true })
  externalArea?: ExternalArea

  @Field(() => InternalArea, { nullable: true })
  internalArea?: InternalArea

  @Field(() => [Room], { nullable: true })
  rooms?: Room[]

  @Field({ nullable: true })
  receptions?: number

  @Field({ nullable: true })
  bathrooms?: number

  @Field({ nullable: true })
  bedrooms?: number

  @Field(() => PropertyAddress, { nullable: true })
  address?: PropertyAddress

  @Field(() => [PropertyImage], { nullable: true })
  images?: PropertyImage[]

  @Field(() => PropertyMarketingMode)
  marketingMode?: PropertyMarketingMode

  @Field(() => Negotiator, { nullable: true })
  negotiator?: Negotiator

  @Field(() => [Office], { nullable: true })
  offices?: Office[]

  @Field(() => Department, { nullable: true })
  department?: Department

  @Field(() => PropertySelling, { nullable: true })
  selling: PropertySelling

  @Field(() => PropertyLetting, { nullable: true })
  letting: PropertyLetting

  metadata?: any
}

@InputType()
class PropertyGeoLocationInput {
  @Field({ nullable: true })
  latitude?: number

  @Field({ nullable: true })
  longitude?: number
}

export enum PropertyLettingFrequency {
  weekly = 'weekly',
  monthly = 'monthly',
  yearly = 'yearly',
}
registerEnumType(PropertyLettingFrequency, {
  name: 'PropertyLettingFrequency',
})

@InputType()
class PropertyLettingInput {
  @Field()
  rent: number

  @Field(() => PropertyLettingFrequency)
  rentFrequency: PropertyLettingFrequency

  @Field(() => PropertyLettingStatus)
  status: PropertyLettingStatus
}

@InputType()
export class PropertyAddressInput {
  @Field({ nullable: true })
  line1?: string

  @Field({ nullable: true })
  line2?: string

  @Field({ nullable: true })
  line3?: string

  @Field({ nullable: true })
  line4?: string

  @Field({ nullable: true })
  buildingName?: string

  @Field({ nullable: true })
  buildingNumber?: string

  @Field({ nullable: true })
  postcode?: string

  @Field(() => PropertyGeoLocationInput, { nullable: true })
  geolocation?: PropertyGeoLocationInput
}

@InputType()
class PropertySellingInput {
  @Field()
  price: number

  @Field(() => PropertySellingStatus)
  status: PropertySellingStatus
}

@InputType()
class ExternalAreaInput {
  @Field(() => ExternalAreaType)
  type: ExternalAreaType

  @Field()
  min: number

  @Field()
  max: number
}

@InputType()
class InternalAreaInput {
  @Field(() => InternalAreaType)
  type: InternalAreaType

  @Field()
  min: number

  @Field()
  max: number
}

@InputType()
class RoomInput {
  @Field()
  name?: string

  @Field()
  dimensions?: string

  @Field()
  description?: string
}

enum PropertyMarketingMode {
  selling = 'selling',
  letting = 'letting',
  sellingAndLetting = 'sellingAndLetting',
}
registerEnumType(PropertyMarketingMode, {
  name: 'PropertyMarketingMode',
  description: 'Property marketing mode',
})

export enum PropertySellingStatus {
  preAppraisal = 'preAppraisal',
  valuation = 'valuation',
  paidValuation = 'paidValuation',
  forSale = 'forSale',
  forSaleUnavailable = 'forSaleUnavailable',
  underOffer = 'underOffer',
  underOfferUnavailable = 'underOfferUnavailable',
  reserved = 'reserved',
  exchanged = 'exchanged',
  completed = 'completed',
  soldExternally = 'soldExternally',
  withdrawn = 'withdrawn',
  none = '',
}
registerEnumType(PropertySellingStatus, {
  name: 'PropertySellingStatus',
  description: 'Property selling status',
})

@InputType()
export class PropertyInput {
  @Field({ nullable: true })
  description?: string

  @Field()
  receptions?: number

  @Field(() => PropertyAddressInput)
  address?: PropertyAddressInput

  @Field(() => PropertyMarketingMode)
  marketingMode: PropertyMarketingMode

  @Field(() => PropertySellingInput, {
    nullable: true,
    description: '@onlyIf({ "marketingMode": ["selling", "sellingAndLetting"] })',
  })
  selling?: PropertySellingInput

  @Field(() => PropertyLettingInput, {
    nullable: true,
    description: '@onlyIf({ "marketingMode": ["letting", "sellingAndLetting"] })',
  })
  letting?: PropertyLettingInput

  @Field({ description: '@idOf(Negotiator)' })
  negotiatorId: string

  @Field(() => [String], { description: '@idOf(Office)' })
  officeIds: string[]

  @Field({ description: '@idOf(Department)' })
  departmentId: string

  @Field({ nullable: true })
  strapline?: string

  @Field({ nullable: true })
  parkingSpaces?: number

  @Field(() => [String], { nullable: true })
  parking?: string[]

  @Field()
  internetAdvertising?: boolean

  @Field({ nullable: true })
  notes?: string

  @Field(() => ExternalAreaInput, { nullable: true })
  externalArea?: ExternalAreaInput

  @Field(() => InternalAreaInput, { nullable: true })
  internalArea?: InternalAreaInput

  @Field(() => [RoomInput], { nullable: true })
  rooms?: RoomInput[]

  metadata?: any
}
