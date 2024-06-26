import { CountryCode } from '../utils/country-code-enum'
import { gql } from 'apollo-server-core'
import { ObjectType, Field, ID, GraphQLISODateTime, InputType } from 'type-graphql'

export const OfficeFragment = gql`
  fragment OfficeFragment on OfficeModel {
    id
    name
    manager
    address {
      buildingName
      buildingNumber
      line1
      line2
      line3
      line4
      postcode
      countryId
    }
    workPhone
    email
    metadata
    _eTag
  }
`

@ObjectType()
export class OfficeAddress {
  @Field({ nullable: true })
  buildingName: string

  @Field({ nullable: true })
  buildingNumber: string

  @Field({ nullable: true })
  line1: string

  @Field({ nullable: true })
  line2: string

  @Field({ nullable: true })
  line3: string

  @Field({ nullable: true })
  line4?: string

  @Field({ nullable: true })
  postcode?: string

  @Field(() => String, { nullable: true })
  countryId?: CountryCode
}

@ObjectType({ description: '@labelKeys(name) @supportsCustomFields()' })
export class Office {
  @Field(() => ID)
  id: string

  @Field()
  name: string

  @Field(() => GraphQLISODateTime, { nullable: true })
  modified: Date

  @Field(() => GraphQLISODateTime, { nullable: true })
  created: Date

  @Field({ nullable: true })
  manager: string

  @Field(() => OfficeAddress, { nullable: true })
  address: OfficeAddress

  @Field({ nullable: true })
  workPhone: string

  @Field({ nullable: true })
  email?: string

  metadata?: any
}

@InputType()
class OfficeAddressInput {
  @Field({ nullable: true })
  buildingName: string

  @Field({ nullable: true })
  buildingNumber: string

  @Field({ nullable: true })
  line1: string

  @Field({ nullable: true })
  line2: string

  @Field({ nullable: true })
  line3: string

  @Field({ nullable: true })
  line4: string

  @Field({ nullable: true })
  postcode: string

  @Field(() => String, { nullable: true })
  countryId: CountryCode
}

@InputType()
export class OfficeInput {
  @Field()
  name: string

  @Field({ nullable: true })
  manager: string

  @Field(() => OfficeAddressInput, { nullable: true })
  address: OfficeAddressInput

  @Field({ nullable: true })
  workPhone: string

  @Field()
  email: string

  metadata?: any
}
