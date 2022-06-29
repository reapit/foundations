import { gql } from 'apollo-server-core'
import { ObjectType, Field, ID, InputType, registerEnumType, GraphQLISODateTime } from 'type-graphql'
import { Negotiator, NegotiatorFragment } from './negotiator'
import { Office, OfficeFragment } from './office'

export enum MarketingConsent {
  grant = 'grant',
  deny = 'deny',
  notAsked = 'notAsked',
}
registerEnumType(MarketingConsent, {
  name: 'MarketingConsent',
})

@ObjectType()
class ContactAddress {
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

@ObjectType({ description: '@labelKeys(title, forename, surname) @supportsCustomFields()' })
export class Contact {
  @Field(() => ID)
  id: string

  @Field(() => GraphQLISODateTime)
  created: Date

  @Field(() => GraphQLISODateTime)
  modified: Date

  @Field()
  forename: string

  @Field()
  surname: string

  @Field()
  email: string

  @Field(() => [Office])
  offices?: Office[]

  @Field(() => [Negotiator])
  negotiators?: Negotiator[]

  @Field({ nullable: true })
  homePhone: string

  @Field({ nullable: true })
  workPhone: string

  @Field({ nullable: true })
  mobilePhone: string

  @Field({ nullable: true })
  communicationPreferenceLetter: boolean

  @Field({ nullable: true })
  communicationPreferenceEmail: boolean

  @Field({ nullable: true })
  communicationPreferenceSMS: boolean

  @Field({ nullable: true })
  communicationPreferencePhone: boolean

  @Field(() => ContactAddress, { nullable: true })
  primaryAddress?: ContactAddress

  metadata?: any
}

@InputType()
class ContactAddressInput {
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
export class ContactInput {
  @Field()
  forename: string

  @Field()
  surname: string

  @Field()
  email: string

  @Field(() => [String], { description: '@idOf(Negotiator)' })
  negotiatorIds: string[]

  @Field(() => [String], { description: '@idOf(Office)' })
  officeIds: string[]

  @Field({ nullable: true })
  homePhone: string

  @Field({ nullable: true })
  workPhone: string

  @Field({ nullable: true })
  mobilePhone: string

  @Field({ nullable: true })
  communicationPreferenceLetter: boolean

  @Field({ nullable: true })
  communicationPreferenceEmail: boolean

  @Field({ nullable: true })
  communicationPreferenceSMS: boolean

  @Field({ nullable: true })
  communicationPreferencePhone: boolean

  @Field(() => ContactAddressInput, { nullable: true })
  primaryAddress?: ContactAddressInput

  metadata?: any
}

export const ContactFragment = gql`
  ${NegotiatorFragment}
  ${OfficeFragment}
  fragment ContactFragment on ContactModel {
    id
    forename
    surname
    email
    metadata
    communicationPreferenceLetter
    communicationPreferenceEmail
    communicationPreferenceSMS
    communicationPreferencePhone
    created
    modified
    homePhone
    workPhone
    mobilePhone
    primaryAddress {
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
