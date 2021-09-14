import { ObjectType, Field, ID } from 'type-graphql'
import { gql } from 'apollo-server-core'

export const PropertyFragment = gql`
  fragment PropertyFragment on PropertyModel {
    id
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
        order
      }
    }
  }
`

@ObjectType()
class Geolocation {
  @Field()
  latitude?: number

  @Field()
  longitude?: number
}

@ObjectType()
class Address {
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

  @Field(() => Geolocation)
  geolocation?: Geolocation
}

@ObjectType()
class Image {
  @Field(() => ID)
  id: string

  @Field()
  url: string

  @Field()
  order: number
}

@ObjectType()
export class Property {
  @Field(() => ID)
  id: string

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

  @Field(() => Address)
  address?: Address

  @Field({ nullable: true })
  lettingRentPrice?: number

  @Field({ nullable: true })
  lettingRentFrequency?: string

  @Field({ nullable: true })
  salePrice?: number

  @Field(() => [Image])
  images: Image[]

  @Field({ nullable: true })
  marketingMode?: string
}
