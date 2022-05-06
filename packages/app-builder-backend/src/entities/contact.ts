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
  title: string

  @Field()
  email: string

  @Field(() => MarketingConsent)
  marketingConsent: MarketingConsent

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

  metadata?: any
}

@InputType()
export class ContactInput {
  @Field()
  forename: string

  @Field()
  surname: string

  @Field()
  title: string

  @Field()
  email: string

  @Field(() => MarketingConsent)
  marketingConsent: MarketingConsent

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

  metadata?: any
}

export const ContactFragment = gql`
  ${NegotiatorFragment}
  ${OfficeFragment}
  fragment ContactFragment on ContactModel {
    id
    title
    forename
    surname
    email
    marketingConsent
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
