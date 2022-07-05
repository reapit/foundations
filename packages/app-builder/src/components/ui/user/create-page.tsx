import { NodeTree, SerializedNode, useEditor, Element, serializeNode } from '@craftjs/core'
import { newPage } from '../header/PageSelector'
import { useUpdatePage } from '@/components/hooks/apps/use-update-app'
import { nodesObjtoToArr } from '@/components/hooks/apps/node-helpers'
import { usePageId } from '@/components/hooks/use-page-id'
import { useApp } from '@/components/hooks/apps/use-app'
import { emptyState } from '@/components/hooks/apps/emptyState'
import { useObjectMutate } from '@/components/hooks/objects/use-object-mutate'
import { ParsedArg } from '@/components/hooks/use-introspection/query-generators'
import { FormInput } from './form-input'
import Form from './form'
import { resolver } from '@/components/pages/home'
import React from 'react'
import Container from './container'
import Text from './text'
import { PlusButton } from '../components'

const constructPageNodes = (
  typeName: string,
  operationType: string,
  reactElementToNodeTree: (element: React.ReactElement) => NodeTree,
  args?: ParsedArg[],
  sourcePageId?: string,
  pageTitle?: string,
): Record<string, SerializedNode> => {
  const { ROOT } = emptyState

  const nodes = {}

  if (operationType === 'list') {
    nodes['table'] = {
      type: { resolvedName: 'Table' },
      isCanvas: false,
      props: { width: 12, typeName },
      displayName: 'Table',
      custom: null,
      parent: 'ROOT',
      hidden: false,
      nodes: [],
      linkedNodes: {},
    }
  } else {
    const nodesArr: string[] = []
    const formNodes = {
      ROOT: {
        ...ROOT,
        nodes: nodesArr,
      },
    }
    if (!args) {
      return formNodes
    }

    const inputs = args[0].fields?.map(({ name, isRequired }) => ({
      name,
      typeName,
      formType: operationType,
      isRequired,
    }))

    if (inputs) {
      const containerNodeTree = reactElementToNodeTree(<Element canvas is={Container} width={12} />)
      const formNodeTree = reactElementToNodeTree(
        <Element is={Form} canvas width={12} typeName={typeName} formType={operationType} destination={sourcePageId} />,
      )
      const titleNodeTree = reactElementToNodeTree(
        <Element is={Text} width={12} fontSize={21} text={pageTitle || ''} />,
      )
      const titleEle = serializeNode(titleNodeTree.nodes[titleNodeTree.rootNodeId].data, resolver)
      const formEle = serializeNode(formNodeTree.nodes[formNodeTree.rootNodeId].data, resolver)
      const containerEle = serializeNode(containerNodeTree.nodes[containerNodeTree.rootNodeId].data, resolver)

      containerNodeTree.nodes[containerNodeTree.rootNodeId].data.nodes.push(formNodeTree.rootNodeId)

      inputs
        .map((props) => reactElementToNodeTree(<FormInput {...props} />))
        .forEach((nodeTree) => {
          Object.entries(nodeTree.nodes).forEach(([key, node]) => {
            const serializedNode = serializeNode(node.data, resolver)
            serializedNode.parent = formNodeTree.rootNodeId
            formNodes[key] = serializedNode
          })
          formEle.nodes.push(nodeTree.rootNodeId)
        })

      nodesArr.push(titleNodeTree.rootNodeId)
      nodesArr.push(containerNodeTree.rootNodeId)
      formNodes[containerNodeTree.rootNodeId] = containerEle
      containerEle.parent = 'ROOT'
      formNodes[formNodeTree.rootNodeId] = formEle
      formEle.parent = containerNodeTree.rootNodeId
      formNodes[titleNodeTree.rootNodeId] = titleEle
      titleEle.parent = 'ROOT'
    }

    return formNodes
  }

  return {
    ROOT: {
      ...ROOT,
      nodes: Object.keys(nodes),
    },
    ...nodes,
  }
}

export const CreatePage = ({
  typeName,
  operationType,
  onCreate,
}: {
  typeName: string | undefined
  operationType?: 'list' | string
  onCreate: (pageId: string) => void
}) => {
  const { appId, pageId: sourcePageId } = usePageId()
  const { updatePage, loading } = useUpdatePage(appId)
  const { app } = useApp(appId)
  const { args } = useObjectMutate(operationType || '', operationType ? typeName : undefined)
  const { parseReactElement } = useEditor((state, query) => ({
    parseReactElement: query.parseReactElement,
  }))

  const onClick = () => {
    if (!typeName || !operationType) {
      return
    }
    const pageId = [typeName, operationType].join('-')
    if (!app?.pages.some((page) => page.id === pageId)) {
      const page = newPage(pageId)
      page.nodes = constructPageNodes(
        typeName,
        operationType,
        (element: any) => {
          return parseReactElement(element).toNodeTree()
        },
        args,
        sourcePageId,
        [operationType, typeName].join(' '),
      )
      updatePage(
        {
          ...page,
          nodes: nodesObjtoToArr(appId, page.id, page.nodes),
        },
        { header: app?.header || [], footer: app?.footer || [] },
      ).then(() => {
        onCreate(pageId)
      })
    }
  }

  return <PlusButton onClick={onClick} loading={loading} />
}
