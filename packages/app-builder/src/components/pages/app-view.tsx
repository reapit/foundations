import React, { useEffect } from 'react'
import { Loader } from '@reapit/elements'
import { useAppWithPages } from '../hooks/apps/use-app'
import { usePageId } from '../hooks/use-page-id'
import { Node } from '../hooks/apps/fragments'
import * as Components from '../ui/user/ejectable/index'
import { mergeNavIntoPage } from '../hooks/apps/node-helpers'
import { ROOT_NODE } from '@craftjs/core'
import { AddContainer } from '../ui/render-node/add-container'

const RenderComponent = ({ node, allNodes }: { node: Node; allNodes: Node[] }) => {
  const { type, props, nodes, nodeId } = node
  const Component = Components[type.resolvedName]
  if (!Component) {
    throw new Error(`No component found for ${type.resolvedName}`)
  }

  return (
    <AddContainer nodeId={nodeId}>
      <Component {...props} isRoot={isRoot(node) || undefined}>
        {nodes.map((nodeId) => {
          const node = allNodes.find((n) => n.nodeId === nodeId)
          if (!node) {
            throw new Error(`No node found for id ${nodeId}`)
          }
          return <RenderComponent key={nodeId} node={node} allNodes={allNodes} />
        })}
      </Component>
    </AddContainer>
  )
}

const isRoot = (node: Node) => node.nodeId === ROOT_NODE

const AppView = () => {
  const { appId, pageId, setPageId } = usePageId()
  const { app, loading } = useAppWithPages(appId)
  const page = app?.pages.find((p) => p.id === pageId)
  const firstPageId = app?.pages[0].id

  useEffect(() => {
    if (!loading && firstPageId && pageId === '~' && !page) {
      setPageId(firstPageId)
    }
  }, [pageId, loading, page, firstPageId])

  const nodes = page?.nodes ? mergeNavIntoPage(page.nodes || []) : []
  if (loading) {
    return <Loader fullPage />
  }

  if (!page) {
    return <div>Not Found</div>
  }

  const rootNode = nodes.find(isRoot)

  if (!rootNode) {
    return <div>Not Found</div>
  }

  return (
    <>
      <title>{page.name}</title>
      <RenderComponent node={rootNode} allNodes={nodes} />
    </>
  )
}

export default AppView
