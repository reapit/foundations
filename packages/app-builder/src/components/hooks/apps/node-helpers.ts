import cloneDeep from 'clone-deep'
import omitDeep from 'omit-deep'
import { ReduceCompType, SerializedNode, ROOT_NODE } from '@craftjs/core'
import { Page, Node } from './fragments'
import { notEmpty } from '../use-introspection/helpers'

const getAllChildNodes = (nodeId: string, nodes: Node[]) => {
  const node = nodes.find((n) => n.nodeId === nodeId)
  if (!node) {
    return []
  }
  const children = node.nodes || []
  const childNodes = children.map((child) => getAllChildNodes(child, nodes))
  return [node, ...[].concat(...childNodes)]
}

export const splitPageNodesIntoSections = (nodes: Node[]): { header: Node[]; footer: Node[]; nodes: Node[] } => {
  const header = getAllChildNodes('header', nodes)
  const footer = getAllChildNodes('footer', nodes)
  const rootNode = nodes.find((n) => n.nodeId === ROOT_NODE)
  if (!rootNode) {
    throw new Error('unable to find root node')
  }

  return {
    header,
    footer,
    nodes: [
      ...nodes.filter((node) => !header.includes(node) && !footer.includes(node) && node.nodeId !== ROOT_NODE),
      {
        ...rootNode,
        nodes: rootNode.nodes.filter((node) => node !== 'header' && node !== 'footer'),
      },
    ],
  }
}

const nodeDoesntContainerSelf = (node: Node): Node => ({
  ...node,
  nodes: node.nodes.filter((n) => n !== node.nodeId),
})

export const mergeHeaderFooterIntoPage = (nodes: Node[], header: Node[] = [], footer: Node[] = []): Node[] => {
  const rootNode = nodes.find((n) => n.nodeId === ROOT_NODE)
  if (!rootNode) {
    throw new Error('unable to find root node')
  }

  const bodyNode = nodes.find((n) => n.nodeId === 'body') || {
    ...rootNode,
    nodes: rootNode.nodes.filter((node) => node !== 'header' && node !== 'footer' && node !== 'body'),
    id: `${rootNode.id}-body`,
    nodeId: 'body',
  }

  return [
    ...header,
    nodeDoesntContainerSelf(bodyNode),
    ...nodes
      .filter((node) => node.nodeId !== ROOT_NODE)
      .map((node) => ({
        ...node,
        parent: node.parent === ROOT_NODE ? 'body' : node.parent,
      })),
    ...footer,
    {
      ...rootNode,
      nodes: [header.length ? 'header' : undefined, 'body', footer.length ? 'footer' : undefined].filter(notEmpty),
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
      id: undefined,
      nodeId: undefined,
      custom: node.custom || undefined,
    }
  })
  return omitDeep(cloneDeep(obj), ['__typename'])
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
