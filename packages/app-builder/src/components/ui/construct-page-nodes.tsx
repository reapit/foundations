import { NodeTree, SerializedNode, serializeNode, Element } from '@craftjs/core'
import React from 'react'
import { ParsedArg } from '../hooks/use-introspection/query-generators'
import { resolver } from '../pages/home'
import { Container, Form, FormInput, Text } from './user/ejectable'
import { argToFormInput } from './user/form'

export const constructPageNodes = (
  typeName: string,
  operationType: 'list' | 'form' | string,
  reactElementToNodeTree: (element: React.ReactElement) => NodeTree,
  args?: ParsedArg[],
  sourcePageId?: string,
  pageTitle?: string,
  formType: 'create' | 'update' = 'update',
  fields: string[] = [],
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
    const titleNodeTree = reactElementToNodeTree(
      <Element is={Text} typographyType={'title'} width={12} fontSize={21} text={pageTitle || ''} />,
    )
    nodes['atitle'] = serializeNode(titleNodeTree.nodes[titleNodeTree.rootNodeId].data, resolver)
    nodes['btable'] = {
      type: { resolvedName: 'Table' },
      isCanvas: false,
      props: { width: 12, typeName, includedFields: fields },
      displayName: 'Table',
      custom: null,
      parent: 'ROOT',
      hidden: false,
      nodes: ['atitle'],
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
    const inputs = objInput.fields
      ?.map((arg) => argToFormInput(arg, { formType: formType, typeName }))
      .flat()
      .filter((arg) => !fields.length || fields.includes(arg.name))
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
