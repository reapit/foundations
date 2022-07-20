import { gql } from 'apollo-server-core'
import { Field, GraphQLISODateTime, ID, InputType, ObjectType } from 'type-graphql'
import { ContactAddressInput, ContactAddress } from './contact'

@ObjectType({ description: '@labelKeys(value)' })
export class CompanyType {
  @Field(() => ID)
  id: string

  @Field()
  value: string
}

@ObjectType()
export class Company {
  @Field(() => ID)
  id: string

  @Field(() => GraphQLISODateTime)
  created: Date

  @Field(() => GraphQLISODateTime)
  modified: Date

  @Field(() => ContactAddress)
  address: ContactAddress

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

  @Field(() => [CompanyType])
  types: CompanyType[]

  typeIds: string[]

  metadata: any
}

@InputType()
export class CompanyInput {
  @Field(() => ContactAddressInput)
  address: ContactAddressInput

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

  @Field(() => [String], { description: '@idOf(CompanyType)' })
  typeIds: string[]

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
    typeIds
    metadata
    address {
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
