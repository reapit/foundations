import { gql } from '@apollo/client'

export const AppFragment = gql`
  fragment AppFragment on _App {
    id
    name
    userId
    createdAt
    updatedAt
    pages {
      id
      name
      nodes {
        id
        displayName
        hidden
        isCanvas
        nodes
        linkedNodes
        props
        type {
          resolvedName
        }
      }
    }
  }
`

type Node = {
  id: string
  displayName: string
  hidden: boolean
  isCanvas: boolean
  nodes: Array<string>
  linkedNodes: Record<string, string>
  props: any
  type: {
    resolvedName: string
  }
}

export type Page = {
  id: string
  name: string
  nodes: Array<Node>
}

export type App = {
  id: string
  name: string
  userId: string
  createdAt: string
  updatedAt: string
  pages: Array<Page>
}
