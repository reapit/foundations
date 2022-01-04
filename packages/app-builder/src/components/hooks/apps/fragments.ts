import { gql } from '@apollo/client'

export const AppFragment = gql`
  fragment AppFragment on _App {
    id
    name
    clientId
    subdomain
    createdAt
    updatedAt
    pages {
      id
      name
      nodes {
        id
        nodeId
        displayName
        hidden
        isCanvas
        nodes
        linkedNodes
        props
        parent
        custom
        type {
          resolvedName
        }
      }
    }
  }
`

export type Node = {
  id: string
  nodeId: string
  displayName: string
  hidden: boolean
  isCanvas: boolean
  nodes: Array<string>
  linkedNodes: Record<string, string>
  props: any
  custom?: any
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
  clientId: string
  createdAt: string
  updatedAt: string
  subdomain: string
  pages: Array<Page>
}
