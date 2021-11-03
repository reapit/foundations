import React, { useEffect } from 'react'
import Container from './container'
import { ToolbarItem, ToolbarItemType, ToolbarSection } from '../toolbar'
import { useTypeList } from '../../hooks/objects/use-type-list'
import { useEditor, useNode, Node, NodeHelpersType } from '@craftjs/core'
import { DestinationPage } from './link'
import { FormProps, Form as EForm } from './ejectable/form'
import { useObjectSpecials } from '../../hooks/objects/use-object-specials'
import { FormInput } from './form-input'
import { FormInputProps } from './ejectable/form-input'
import { useObjectMutate } from '../../hooks/objects/use-object-mutate'

const defaultProps = {
  destination: '/',
}

const Form = (props: FormProps) => {
  const { isEditing } = useEditor((state) => ({
    isEditing: state.options.enabled,
  }))
  const {
    connectors: { connect, drag },
  } = useNode()

  return <EForm {...defaultProps} {...props} ref={(ref) => ref && connect(drag(ref))} disabled={isEditing} />
}

const ContainerSettings = Container.craft.related.toolbar

const FormSettings = () => {
  const { data, loading } = useTypeList()
  const {
    props: { typeName, formType },
    nodeId,
  } = useNode((node) => {
    return {
      nodeId: node.id,
      props: node.data.props,
    }
  })
  const { args } = useObjectMutate(formType, typeName)

  const { setInputs, actions } = useEditor((state, query) => {
    return {
      setInputs: (inputs: FormInputProps[], parentNodeId: string) => {
        query
          .node(parentNodeId)
          .decendants()
          .forEach((str) => {
            try {
              actions.delete(str)
            } catch (e) {
              // do nothing
            }
          })
        inputs
          .map((props) => query.parseReactElement(<FormInput {...props} />).toNodeTree())
          .forEach((nodeTree) => {
            actions.addNodeTree(nodeTree, parentNodeId)
          })
      },
    }
  })
  const [shouldUpdate, setShouldUpdate] = React.useState(false)
  const { specials } = useObjectSpecials(typeName)
  useEffect(() => {
    if (args && args[0] && shouldUpdate) {
      const inputs = args[0].fields.map(({ name, isRequired }) => ({
        name,
        typeName,
        formType,
        isRequired,
      }))
      setInputs(inputs, nodeId)
      setShouldUpdate(false)
    }
  }, [shouldUpdate, args])

  return (
    <>
      <ContainerSettings />
      <ToolbarSection
        title="Type Name"
        props={['typeName']}
        summary={({ typeName }: any) => {
          return `Form of ${typeName || ''}${typeName ? 's' : ''}`
        }}
      >
        <ToolbarItem
          type={ToolbarItemType.Select}
          onChange={() => {
            setTimeout(() => {
              setShouldUpdate(true)
            }, 100)
          }}
          propKey="typeName"
          title="Object Type"
        >
          {(data || []).map((typeName) => (
            <option key={typeName} value={typeName}>
              {typeName}
            </option>
          ))}
          <option value="" disabled>
            {loading ? 'Loading...' : 'Select a Type'}
          </option>
        </ToolbarItem>
        <ToolbarItem
          type={ToolbarItemType.Select}
          onChange={() => {
            setTimeout(() => {
              setShouldUpdate(true)
            }, 100)
          }}
          propKey="formType"
          title="Form Type"
        >
          {['create', 'update', ...specials.map(({ name }) => name)].map((formType) => (
            <option key={formType} value={formType}>
              {formType}
            </option>
          ))}
          <option value="" disabled>
            Select a Type
          </option>
        </ToolbarItem>
      </ToolbarSection>
      <DestinationPage propKey="destination" title="Redirect To" />
    </>
  )
}

Form.craft = {
  props: {
    ...defaultProps,
    ...Container.craft.props,
  },
  related: {
    toolbar: FormSettings,
  },
  rules: {
    // don't allow form inputs to enter or leave the form
    canMoveOut: (outgoingNode: Node) => {
      return outgoingNode.data.displayName !== FormInput.name
    },
    canMoveIn: (incomingNode: Node, currentNode: Node, helper: NodeHelpersType) => {
      if (incomingNode.data.displayName === FormInput.name) {
        // still allow moving in if the input is already a part of the form
        return helper(currentNode.id).descendants(true).includes(incomingNode.id)
      }
      return true
    },
  },
}

export default Form
