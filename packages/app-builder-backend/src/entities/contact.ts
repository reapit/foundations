import { CountryCode } from '../utils/country-code-enum'
import { gql } from 'apollo-server-core'
import { ObjectType, Field, ID, InputType, registerEnumType } from 'type-graphql'
import { Negotiator, NegotiatorFragment } from './negotiator'
import { Office, OfficeFragment } from './office'
import { LiberalGraphQLISODateTime } from './LiberalGraphQLISODateTime'

export enum MarketingConsent {
  grant = 'grant',
  deny = 'deny',
  notAsked = 'notAsked',
}
registerEnumType(MarketingConsent, {
  name: 'MarketingConsent',
})
registerEnumType(CountryCode, {
  name: 'CountryCode',
})

@ObjectType()
export class ContactAddress {
  @Field(() => ContactAddressType, { nullable: true })
  type?: ContactAddressType

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

  @Field(() => String, { nullable: true })
  countryId?: CountryCode
}

@ObjectType({ description: '@labelKeys(title, forename, surname) @supportsCustomFields()' })
export class Contact {
  @Field(() => ID)
  id: string

  @Field(() => LiberalGraphQLISODateTime)
  created: Date

  @Field(() => LiberalGraphQLISODateTime)
  modified: Date

  @Field()
  forename: string

  @Field()
  surname: string

  @Field(() => MarketingConsent)
  marketingConsent: MarketingConsent

  @Field({ nullable: true })
  email?: string

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

export enum ContactAddressType {
  primary = 'primary',
  secondary = 'secondary',
  home = 'home',
  work = 'work',
  forwarding = 'forwarding',
  company = 'company',
  previous = 'previous',
}

registerEnumType(ContactAddressType, {
  name: 'ContactAddressType',
})

@InputType()
export class ContactAddressInput {
  @Field(() => ContactAddressType, { nullable: true })
  type?: ContactAddressType

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

  @Field(() => String, { nullable: true })
  countryId?: CountryCode
}

@InputType()
export class ContactInput {
  @Field()
  forename: string

  @Field()
  surname: string

  @Field(() => MarketingConsent)
  marketingConsent: MarketingConsent

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
    marketingConsent
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
      countryId
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
