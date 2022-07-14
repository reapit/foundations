import { ObjectType, Field, ID, InputType, GraphQLISODateTime, registerEnumType } from 'type-graphql'
import { gql } from 'apollo-server-core'
import { PropertyImage } from './property-image'
import { Negotiator } from './negotiator'
import { Office } from './office'

export const PropertyFragment = gql`
  fragment PropertyFragment on PropertyModel {
    id
    created
    modified
    type
    description
    strapline
    parking
    internetAdvertising
    notes
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
    }
    _embedded {
      images {
        id
        url
        type
        created
        modified
        caption
        order
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

@ObjectType()
class PropertyLetting {
  @Field()
  rent: number

  @Field()
  rentFrequency: string

  @Field()
  status: string
}

@ObjectType()
class PropertySelling {
  @Field()
  price: number

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  status?: string
}

@ObjectType()
class ExternalArea {
  @Field({ nullable: true })
  type?: string

  @Field({ nullable: true })
  min?: number

  @Field({ nullable: true })
  max?: number
}

@ObjectType()
class InternalArea {
  @Field({ nullable: true })
  type?: string

  @Field({ nullable: true })
  min?: number

  @Field({ nullable: true })
  max?: number
}

@ObjectType()
class Room {
  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  dimension?: string

  @Field({ nullable: true })
  description?: string
}

@ObjectType({
  description: '@supportsCustomFields()',
})
export class Property {
  @Field(() => ID, {
    description: '@acKey(prpCode)',
  })
  id: string

  @Field(() => GraphQLISODateTime)
  created: Date

  @Field(() => GraphQLISODateTime)
  modified: Date

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
  marketingMode: PropertyMarketingMode

  @Field(() => Negotiator, { nullable: true })
  negotiator?: Negotiator

  @Field(() => Office, { nullable: true })
  office?: Office

  @Field(() => PropertySelling, { nullable: true })
  selling: PropertySelling

  @Field(() => PropertyLetting, { nullable: true })
  letting: PropertyLetting

  metadata?: any
}

@InputType()
class PropertyGeoLocationInput {
  @Field()
  latitude?: number

  @Field()
  longitude?: number
}

@InputType()
class PropertyLettingInput {
  @Field()
  rent: number

  @Field()
  rentFrequency: string

  @Field()
  status: string
}

@InputType()
export class PropertyAddressInput {
  @Field()
  line1?: string

  @Field()
  line2?: string

  @Field()
  line3?: string

  @Field()
  line4?: string

  @Field()
  buildingName?: string

  @Field()
  buildingNumber?: string

  @Field()
  postcode?: string

  @Field(() => PropertyGeoLocationInput)
  geolocation?: PropertyGeoLocationInput
}

@InputType()
class PropertySellingInput {
  @Field()
  price: number

  @Field()
  description: string

  @Field()
  status: string
}

@InputType()
class ExternalAreaInput {
  @Field()
  type?: string

  @Field()
  min?: number

  @Field()
  max?: number
}

@InputType()
class InternalAreaInput {
  @Field()
  type?: string

  @Field()
  min?: number

  @Field()
  max?: number
}

@InputType()
class RoomInput {
  @Field()
  name?: string

  @Field()
  dimension?: string

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
  selling: PropertySellingInput

  @Field(() => PropertyLettingInput, {
    nullable: true,
    description: '@onlyIf({ "marketingMode": ["letting", "sellingAndLetting"] })',
  })
  letting: PropertyLettingInput

  @Field()
  strapline?: string

  @Field()
  parking?: number

  @Field()
  internetAdvertising?: boolean

  @Field()
  notes?: string

  @Field(() => ExternalAreaInput)
  externalArea?: ExternalAreaInput

  @Field(() => InternalAreaInput)
  internalArea?: InternalAreaInput

  @Field(() => [RoomInput])
  rooms?: RoomInput[]

  metadata?: any
}
