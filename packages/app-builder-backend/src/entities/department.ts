import { gql } from 'apollo-server-core'
import { ObjectType, Field, ID } from 'type-graphql'

export const DepartmentFragment = gql`
  fragment DepartmentFragment on DepartmentModel {
    id
    created
    modified
    name
    typeOptions
    styleOptions
    situationOptions
    parkingOptions
    ageOptions
    localityOptions
  }
`

@ObjectType({ description: '@labelKeys(name)' })
export class Department {
  @Field(() => ID)
  id: string

  @Field()
  created: string

  @Field()
  modified: string

  @Field()
  name: string

  @Field(() => [String])
  typeOptions: string[]

  @Field(() => [String])
  styleOptions: string[]

  @Field(() => [String])
  situationOptions: string[]

  @Field(() => [String])
  parkingOptions: string[]

  @Field(() => [String])
  ageOptions: string[]

  @Field(() => [String])
  localityOptions: string[]
}
