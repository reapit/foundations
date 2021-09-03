import cloneDeep from 'clone-deep'
import omitDeep from 'omit-deep'
import { ReduceCompType, SerializedNode } from '@craftjs/core'
import { Page } from './fragments'

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
