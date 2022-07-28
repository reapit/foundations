import { CountryCode } from '../utils/country-code-enum'
import { gql } from 'apollo-server-core'
import { Field, GraphQLISODateTime, ID, InputType, ObjectType } from 'type-graphql'
import { ContactAddressType } from './contact'

@ObjectType({ description: '@labelKeys(value)' })
export class CompanyType {
  @Field(() => ID)
  id: string

  @Field()
  value: string
}

@InputType('CompanyTypeInput')
@ObjectType()
export class CompanyAddress {
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

  country?: CountryCode

  type?: ContactAddressType

  @Field(() => CountryCode, { nullable: true })
  countryId?: CountryCode
}

@ObjectType()
export class Company {
  @Field(() => ID)
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

  @Field(() => [CompanyType])
  companyTypes: CompanyType[]

  typeIds: string[]

  metadata: any
}

@InputType()
export class CompanyInput {
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

  typeIds: string[]
  @Field(() => [String], { description: '@idOf(CompanyType)' })
  companyTypeIds: string[]

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
    _eTag
  }
`
