import { gql } from '@apollo/client'

export const CustomEntityFragment = gql`
  fragment CustomEntityFragment on _CustomEntity {
    id
    name
    fields {
      id
      name
      type
    }
  }
`

export type CustomEntityField = {
  id: string
  name: string
  type: string
}

export type CustomEntity = {
  id: string
  name: string
  fields: CustomEntityField[]
}
