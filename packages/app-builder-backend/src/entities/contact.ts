import { gql } from 'apollo-server-core'
import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType({ description: '@labelKeys(title, forename, surname)' })
export class Contact {
  @Field(() => ID)
  id: string

  @Field()
  forename: string

  @Field()
  surname: string

  @Field()
  title: string
}

export const ContactFragment = gql`
  fragment ContactFragment on ContactModel {
    id
    title
    forename
    surname
  }
`
