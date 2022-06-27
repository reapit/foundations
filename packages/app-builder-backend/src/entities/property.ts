import { ObjectType, Field, ID, InputType, GraphQLISODateTime } from 'type-graphql'
import { gql } from 'apollo-server-core'
import { PropertyImage } from './property-image'

export const PropertyFragment = gql`
  fragment PropertyFragment on PropertyModel {
    id
    created
    modified
    type
    description
    bedrooms
    receptions
    bathrooms
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
    letting {
      rent
      rentFrequency
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
}

@ObjectType()
class PropertySelling {
  @Field()
  price: number
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

  @Field(() => [String])
  type?: string[]

  @Field({ nullable: true })
  description?: string

  @Field()
  bedrooms?: number

  @Field()
  receptions?: number

  @Field()
  bathrooms?: number

  @Field(() => PropertyAddress)
  address?: PropertyAddress

  @Field({ nullable: true })
  lettingRentPrice?: number

  @Field({ nullable: true })
  lettingRentFrequency?: string

  @Field({ nullable: true })
  salePrice?: number

  @Field(() => [PropertyImage], { nullable: true })
  images?: PropertyImage[]

  @Field({ nullable: true })
  marketingMode?: string

  @Field({ nullable: true })
  saleOrLetting?: string

  @Field({ nullable: true })
  status?: string

  @Field(() => PropertyLetting, { nullable: true })
  letting: PropertyLetting

  @Field(() => PropertySelling, { nullable: true })
  selling: PropertySelling

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
class PropertyLettingInput {
  @Field()
  rent: number

  @Field()
  rentFrequency: string
}

@InputType()
class PropertySellingInput {
  @Field()
  price: number
}

@InputType()
export class PropertyInput {
  @Field(() => [String])
  type?: string[]

  @Field({ nullable: true })
  description?: string

  @Field()
  bedrooms?: number

  @Field()
  receptions?: number

  @Field()
  bathrooms?: number

  @Field(() => PropertyAddressInput)
  address?: PropertyAddressInput

  @Field({ nullable: true })
  lettingRentPrice?: number

  @Field({ nullable: true })
  lettingRentFrequency?: string

  @Field({ nullable: true })
  salePrice?: number

  @Field({ nullable: true })
  marketingMode?: string

  @Field({ nullable: true })
  saleOrLetting?: string

  @Field({ nullable: true })
  status?: string

  @Field(() => PropertyLettingInput, { nullable: true })
  letting: PropertyLettingInput

  @Field(() => PropertySellingInput, { nullable: true })
  selling: PropertySellingInput

  metadata?: any
}
