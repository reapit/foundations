import { gql } from 'apollo-server-core'
import { ObjectType, Field, ID, InputType, registerEnumType } from 'type-graphql'
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

// TODO: add officeIds and negotiatorIds
@ObjectType({ description: '@labelKeys(title, forename, surname) @supportsCustomFields()' })
export class Contact {
  @Field(() => ID)
  id: string

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
    _embedded {
      offices {
        ...OfficeFragment
      }
      negotiators {
        ...NegotiatorFragment
      }
    }
  }
`
