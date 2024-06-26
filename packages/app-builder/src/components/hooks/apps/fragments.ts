import { gql } from '@apollo/client'

export const NodeFragment = gql`
  fragment NodeFragment on _Node {
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
`

export const PageFragment = gql`
  ${NodeFragment}
  fragment PageFragment on _Page {
    id
    name
    pageType
    entityName
    nodes {
      ...NodeFragment
    }
  }
`

export const AppFragment = gql`
  fragment AppFragment on _App {
    id
    name
    clientId
    subdomain
    createdAt
    updatedAt
    developerName
  }
`

export const AppWithPagesFragment = gql`
  ${PageFragment}
  fragment AppWithPagesFragment on _App {
    id
    name
    clientId
    subdomain
    createdAt
    updatedAt
    developerName
    pages {
      ...PageFragment
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
  parent: string | null
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
  entityName:
    | 'applicant'
    | 'appointment'
    | 'company'
    | 'contact'
    | 'department'
    | 'negotiator'
    | 'offer'
    | 'office'
    | 'property'
    | 'propertyimage'
  pageType: 'create' | 'update' | 'list'
  nodes: Array<Node>
}

export type App = {
  id: string
  name: string
  clientId: string
  createdAt: string
  updatedAt: string
  subdomain: string
  developerName: string
  pages?: Array<Page>
}

export type AppWithPages = App & {
  pages: Array<Page>
}
