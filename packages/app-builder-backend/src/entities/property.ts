import { ObjectType, Field, ID, InputType, GraphQLISODateTime } from 'type-graphql'
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
    parkingSpaces
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
  @Field()
  latitude?: number

  @Field()
  longitude?: number
}

@ObjectType()
class PropertyAddress {
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

  @Field()
  desription: string

  @Field()
  status: string
}

@ObjectType()
class ExternalArea {
  @Field()
  type?: string

  @Field()
  min?: number

  @Field()
  max?: number
}

@ObjectType()
class InternalArea {
  @Field()
  type?: string

  @Field()
  min?: number

  @Field()
  max?: number
}

@ObjectType()
class Room {
  @Field()
  name?: string

  @Field()
  dimension?: string

  @Field()
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

  @Field()
  strapline?: string

  @Field(() => [String])
  type?: string[]

  @Field({ nullable: true })
  description?: string

  @Field()
  parkingSpaces?: number

  @Field()
  internetAdvertising?: boolean

  @Field()
  notes?: string

  @Field(() => ExternalArea)
  externalArea?: ExternalArea

  @Field(() => InternalArea)
  internalArea?: InternalArea

  @Field(() => [Room])
  rooms?: Room[]

  @Field()
  receptions?: number

  @Field(() => PropertyAddress)
  address?: PropertyAddress

  @Field(() => [PropertyImage], { nullable: true })
  images?: PropertyImage[]

  @Field({ nullable: true })
  marketingMode?: string

  @Field(() => Negotiator)
  negotiator: Negotiator

  @Field(() => Office)
  office: Office

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

@InputType()
export class PropertyInput {
  @Field(() => [String])
  type?: string[]

  @Field({ nullable: true })
  description?: string

  @Field()
  receptions?: number

  @Field(() => PropertyAddressInput)
  address?: PropertyAddressInput

  @Field({ nullable: true })
  marketingMode?: string

  @Field(() => PropertySellingInput, { nullable: true })
  selling: PropertySellingInput

  @Field(() => PropertyLettingInput, { nullable: true })
  letting: PropertyLettingInput

  @Field()
  strapline?: string

  @Field()
  parkingSpaces?: number

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
