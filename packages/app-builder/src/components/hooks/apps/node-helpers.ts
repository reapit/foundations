import { ReduceCompType, SerializedNode, ROOT_NODE } from '@craftjs/core'
import { Page, Node } from './fragments'
import { notEmpty } from '../use-introspection/helpers'
export type { Page, Node } from './fragments'
export const NAV_NODE = 'NavNode'

export const extractBodyNodes = (nodes: Node[]): Node[] => {
  const rootNode = nodes.find((n) => n.nodeId === ROOT_NODE)
  if (!rootNode) {
    throw new Error('unable to find root node')
  }
  const bodyNode = nodes.find((n) => n.nodeId === 'body')
  if (!bodyNode) {
    throw new Error('unable to find body node')
  }

  const bodyNodes = bodyNode.nodes.map((nodeId) => {
    const node = nodes.find((n) => n.nodeId === nodeId)
    if (!node) {
      throw new Error(`unable to find node with id ${nodeId}`)
    }
    return node
  })

  const otherNodes = nodes.filter((n) => n.parent && n.parent !== 'body')

  const newNodes = bodyNodes.map((node) => ({
    ...node,
    parent: rootNode.nodeId,
  }))
  const newRootNode = {
    ...rootNode,
    nodes: newNodes.map((n) => n.nodeId),
  }

  return [newRootNode, ...newNodes, ...otherNodes]
}

const nodeDoesntContainerSelf = (node: Node): Node => ({
  ...node,
  nodes: node.nodes.filter((n) => n !== node.nodeId),
})

export const mergeNavIntoPage = (nodes: Node[]): Node[] => {
  const rootNode = nodes.find((n) => n.nodeId === ROOT_NODE)
  if (!rootNode) {
    throw new Error('unable to find root node')
  }

  const bodyNode = {
    ...rootNode,
    nodes: rootNode.nodes.filter((node) => node !== 'body'),
    id: `${rootNode.id}-body`,
    nodeId: 'body',
    parent: rootNode.nodeId,
    displayName: 'Container',
    type: {
      resolvedName: 'Container',
    },
    isCanvas: true,
    props: {
      width: 12,
      background: 'white',
      padding: 40,
    },
  }

  const navNode: Node = {
    id: `${rootNode.id}-${NAV_NODE}`,
    nodeId: NAV_NODE,
    type: {
      resolvedName: 'Navigation',
    },
    nodes: [],
    parent: ROOT_NODE,
    props: {},
    custom: {},
    displayName: 'Navigation',
    hidden: false,
    isCanvas: false,
    linkedNodes: {},
  }

  return [
    nodeDoesntContainerSelf(bodyNode),
    navNode,
    ...nodes
      .filter((node) => node.nodeId !== ROOT_NODE)
      .map((node) => ({
        ...node,
        parent: node.parent === ROOT_NODE ? 'body' : node.parent,
      })),
    {
      ...rootNode,
      nodes: ['body', NAV_NODE].filter(notEmpty),
      displayName: 'Container',
      isCanvas: false,
      type: {
        resolvedName: 'Container',
      },
    },
  ]
}

export const isInitialLoad = (nodes: Record<string, SerializedNode>) => {
  if (Object.keys(nodes).length <= 2) {
    return nodes['ROOT'].displayName === 'div'
  }
  return false
}

export const nodesArrToObj = (nodes: Page['nodes']): Record<string, SerializedNode> => {
  const obj = {}
  nodes.forEach((node) => {
    obj[node.nodeId] = {
      ...node,
    }
    delete obj[node.nodeId].id
    delete obj[node.nodeId].nodeId
    delete obj[node.nodeId].__typename
    if (obj[node.nodeId].type) {
      obj[node.nodeId].type = {
        ...obj[node.nodeId].type,
      }
      delete obj[node.nodeId].type.__typename
    }
    if (node.custom) {
      obj[node.nodeId].custom = node.custom
    } else {
      delete obj[node.nodeId].custom
    }
  })
  return obj
}

const normalizeAmbiguousNodeType = (type: ReduceCompType): { resolvedName: string } => {
  if (typeof type === 'string') {
    return { resolvedName: type }
  }

  return {
    resolvedName: type.resolvedName,
  }
}

export const nodesObjtoToArr = (
  appId: string,
  pageId: string,
  nodes: Record<string, SerializedNode>,
): Page['nodes'] => {
  const arr: Array<Page['nodes'][0]> = []
  Object.keys(nodes).forEach((key) => {
    arr.push({
      ...nodes[key],
      id: `${appId}${pageId}${key}`,
      nodeId: key,
      type: normalizeAmbiguousNodeType(nodes[key].type),
    })
  })
  return arr
}
