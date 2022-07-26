import { NodeTree, SerializedNode, useEditor, Element, serializeNode } from '@craftjs/core'
import { useCreatePage, useUpdatePageNodes } from '@/components/hooks/apps/use-update-app'
import { nodesObjtoToArr } from '@/components/hooks/apps/node-helpers'
import { usePageId } from '@/components/hooks/use-page-id'
import { useObjectMutate } from '@/components/hooks/objects/use-object-mutate'
import { ParsedArg } from '@/components/hooks/use-introspection/query-generators'
import { FormInput } from './form-input'
import Form, { argToFormInput } from './form'
import { resolver } from '@/components/pages/home'
import React, { useState } from 'react'
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
  const nodes = {}
  const nodesArr: string[] = []
  const rootNode = {
    type: { resolvedName: 'Container' },
    isCanvas: true,
    props: { width: 12, background: 'white', padding: 40 },
    displayName: 'Container',
    custom: { displayName: 'App' },
    // @ts-ignore until they update their types
    parent: null,
    hidden: false,
    linkedNodes: {},
    nodes: nodesArr,
  } as unknown as SerializedNode

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
    const formNodes = {
      ROOT: rootNode,
    }
    if (!args) {
      return formNodes
    }

    const [objInput] = args.filter((a) => a.name !== 'id')
    if (!objInput) {
      return formNodes
    }
    const inputs = objInput.fields?.map((arg) => argToFormInput(arg, { formType: 'update', typeName })).flat()
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
      ...rootNode,
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
  const [loading, setLoading] = useState(false)
  const { updatePageNodes } = useUpdatePageNodes(appId)
  const { createPage } = useCreatePage(appId)
  const { args } = useObjectMutate(operationType || '', operationType ? typeName : undefined)
  const { parseReactElement } = useEditor((state, query) => ({
    parseReactElement: query.parseReactElement,
  }))

  const onClick = async () => {
    if (!typeName || !operationType) {
      return
    }
    setLoading(true)
    const pageId = [typeName, operationType].join('-')
    const app = await createPage(pageId)
    const page = app.pages.find((page) => page.id === pageId)
    if (!page) {
      return
    }
    const nodes = constructPageNodes(
      typeName,
      operationType,
      (element: any) => {
        return parseReactElement(element).toNodeTree()
      },
      args,
      sourcePageId,
      [operationType, typeName].join(' '),
    )
    console.log(nodes)
    await updatePageNodes(nodesObjtoToArr(appId, page.id, nodes), page.id)
    setLoading(false)
    onCreate(pageId)
  }

  return <PlusButton onClick={onClick} loading={loading} />
}
