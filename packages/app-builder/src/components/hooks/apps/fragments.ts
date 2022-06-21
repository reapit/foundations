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

export const AppFragment = gql`
  ${NodeFragment}
  fragment AppFragment on _App {
    id
    name
    clientId
    subdomain
    createdAt
    updatedAt
    developerName
    pages {
      id
      name
      nodes {
        ...NodeFragment
      }
    }
    header {
      ...NodeFragment
    }
    footer {
      ...NodeFragment
    }
    navConfig {
      id
      name
      icon
      destination
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
  nodes: Array<Node>
}

export type NavConfig = {
  id: string
  name: string
  icon: string
  destination: string
}

export type App = {
  id: string
  name: string
  clientId: string
  createdAt: string
  updatedAt: string
  subdomain: string
  developerName: string
  pages: Array<Page>
  header: Array<Node>
  footer: Array<Node>
  navConfig: Array<NavConfig>
}
