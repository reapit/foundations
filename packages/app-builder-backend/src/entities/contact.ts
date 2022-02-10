import { gql } from 'apollo-server-core'
import { ObjectType, Field, ID, InputType, registerEnumType } from 'type-graphql'

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

  metadata?: any
}

export const ContactFragment = gql`
  fragment ContactFragment on ContactModel {
    id
    title
    forename
    surname
    email
    marketingConsent
    metadata
  }
`
