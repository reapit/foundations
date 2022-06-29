import { gql } from 'apollo-server-core'
import { Field, GraphQLISODateTime, InputType, ObjectType } from 'type-graphql'

@ObjectType()
class CompanyAddress {
  @Field({ nullable: true })
  type?: string

  @Field({ nullable: true })
  buildingName?: string

  @Field({ nullable: true })
  buildingNumber?: string

  @Field({ nullable: true })
  line1?: string

  @Field({ nullable: true })
  line2?: string

  @Field({ nullable: true })
  line3?: string

  @Field({ nullable: true })
  line4?: string

  @Field({ nullable: true })
  postcode?: string

  @Field({ nullable: true })
  country?: string
}

@ObjectType()
export class Company {
  @Field()
  id: string

  @Field(() => GraphQLISODateTime)
  created: Date

  @Field(() => GraphQLISODateTime)
  modified: Date

  @Field(() => CompanyAddress)
  address: CompanyAddress

  @Field()
  name: string

  @Field()
  active: boolean

  @Field({ nullable: true })
  workPhone: string

  @Field({ nullable: true })
  mobilePhone: string

  @Field({ nullable: true })
  email: string

  metadata: any
}

@InputType()
export class CompanyAddressInput {
  @Field({ nullable: true })
  type?: string

  @Field({ nullable: true })
  buildingName?: string

  @Field({ nullable: true })
  buildingNumber?: string

  @Field({ nullable: true })
  line1?: string

  @Field({ nullable: true })
  line2?: string

  @Field({ nullable: true })
  line3?: string

  @Field({ nullable: true })
  line4?: string

  @Field({ nullable: true })
  postcode?: string

  @Field({ nullable: true })
  country?: string
}

@InputType()
export class CompanyInput {
  @Field(() => GraphQLISODateTime)
  created: Date

  @Field(() => GraphQLISODateTime)
  modified: Date

  @Field(() => CompanyAddressInput)
  address: CompanyAddressInput

  @Field()
  name: string

  @Field()
  active: boolean

  @Field({ nullable: true })
  workPhone: string

  @Field({ nullable: true })
  mobilePhone: string

  @Field({ nullable: true })
  email: string

  metadata: any
}

export const CompanyFragment = gql`
  fragment CompanyFragment on CompanyModel {
    id
    created
    modified
    name
    active
    workPhone
    mobilePhone
    email
    metadata
    address {
      type
      buildingName
      buildingNumber
      line1
      line2
      line3
      line4
      postcode
      country
    }
  }
`
