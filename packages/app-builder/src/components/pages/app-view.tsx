import React from 'react'
import { Loader } from '@reapit/elements'
import { useApp } from '../hooks/apps/use-app'
import { usePageId } from '../hooks/use-page-id'
import { Node } from '../hooks/apps/fragments'
import * as Components from '../ui/user/ejectable/index'

const RenderComponent = ({ node, allNodes }: { node: Node; allNodes: Node[] }) => {
  const { type, props, nodes } = node
  const Component = Components[type.resolvedName]
  if (!Component) {
    throw new Error(`No component found for ${type.resolvedName}`)
  }

  return (
    <Component {...props} isRoot={isRoot(node) || undefined}>
      {nodes.map((nodeId) => {
        const node = allNodes.find((n) => n.nodeId === nodeId)
        if (!node) {
          throw new Error(`No node found for id ${nodeId}`)
        }
        return RenderComponent({ node, allNodes })
      })}
    </Component>
  )
}

const isRoot = (node: Node) => node.nodeId === 'ROOT'

const AppView = () => {
  const { appId, pageId } = usePageId()
  const { app, loading } = useApp(appId)
  const page = app?.pages.find((p) => p.id === pageId)

  if (loading) {
    return <Loader fullPage />
  }

  if (!page) {
    return <div>Not Found</div>
  }

  const rootNode = page.nodes.find(isRoot)

  if (!rootNode) {
    return <div>Not Found</div>
  }

  return (
    <>
      <title>{page.name}</title>
      <RenderComponent node={rootNode} allNodes={page.nodes} />
    </>
  )
}

export default AppView
