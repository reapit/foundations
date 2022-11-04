import React, { useEffect } from 'react'
import { useEditor, useNode, Node, NodeHelpersType } from '@craftjs/core'

import Container from './container'
import { ToolbarItem, ToolbarItemType } from '../toolbar'
import { DestinationPage } from './link'
import { FormProps, Form as EForm } from './ejectable/form'
import { useObjectSpecials } from '../../hooks/objects/use-object-specials'
import { FormInput } from './form-input'
import { FormInputProps } from './ejectable/form-input'
import { useObjectMutate } from '../../hooks/objects/use-object-mutate'
import { IntegrationLanding } from './table'
import { TypeList } from './type-list'
import { Button } from '@reapit/elements'
import { useUpdateCustomEntity } from '@/components/hooks/custom-entities/use-update-custom-entity'
import { useCustomEntity } from '@/components/hooks/custom-entities/use-custom-entity'
import { useObject } from '@/components/hooks/objects/use-object'
import { strToCamel } from '@reapit/utils-common'
import { ParsedArg } from '@/components/hooks/use-introspection/query-generators'
import { ColumnControls } from './column-controls'

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

type FormInfo = {
  typeName: string
  formType: string
}

export const argToFormInput = ({ name, fields, isList }: ParsedArg, formInfo: FormInfo): FormInputProps[] => {
  if (fields && !isList) {
    return fields.map((field) => argToFormInput({ ...field, name: `${name}.${field.name}` }, formInfo)).flat()
  }
  return [
    {
      name,
      ...formInfo,
    },
  ]
}

const FormSettings = () => {
  const {
    props: { typeName, formType },
    nodeId,
    actions: { setProp },
  } = useNode((node) => {
    return {
      nodeId: node.id,
      props: node.data.props,
    }
  })

  const { args } = useObjectMutate(formType, typeName)
  const { updateCustomEntity } = useUpdateCustomEntity()
  const { customEntity } = useCustomEntity(typeName)
  const { object } = useObject(typeName)

  const { addInput, setInputs, actions, getInputs, removeInput } = useEditor((state, query) => {
    const addInput = (input: FormInputProps, parentNodeId: string) => {
      const nodeTree = query.parseReactElement(<FormInput {...input} />).toNodeTree()
      actions.addNodeTree(nodeTree, parentNodeId)
    }
    const removeInput = (input: FormInputProps, parentNodeId: string) => {
      query
        .node(parentNodeId)
        .descendants()
        .map(query.node)
        .map((node) => node.get())
        .filter((node) => node.data.props.name === input.name)
        .forEach((node) => {
          try {
            actions.delete(node.id)
          } catch (e) {
            // do nothing
          }
        })
    }
    return {
      addInput,
      removeInput,
      getInputs: (parentNodeId: string) =>
        query
          .node(parentNodeId)
          .descendants()
          .map(query.node)
          .map((node) => node.get().data.props.name),
      setInputs: (inputs: FormInputProps[], parentNodeId: string) => {
        query
          .node(parentNodeId)
          .descendants()
          .forEach((str) => {
            try {
              actions.delete(str)
            } catch (e) {
              // do nothing
            }
          })
        inputs.forEach((input) => addInput(input, parentNodeId))
      },
    }
  })
  const [shouldUpdate, setShouldUpdate] = React.useState(false)
  const { specials } = useObjectSpecials(typeName)
  useEffect(() => {
    if (args && args[0] && shouldUpdate) {
      const inputs = args[0].fields
        ?.filter(({ name }) => name !== 'id')
        .map((field) => argToFormInput(field, { typeName, formType }))
        .flat()
      setInputs(inputs || [], nodeId)
      setShouldUpdate(false)
    }
  }, [shouldUpdate, args])

  const updateIn100ms = () => {
    setTimeout(() => {
      setShouldUpdate(true)
    }, 100)
  }

  const availableFields = (args ? args[0].fields?.filter(({ name }) => name !== 'id') : undefined) || []
  const includedFields = [...new Set(getInputs(nodeId).map((name) => name.split('.')[0]))]
  console.log(includedFields)
  useEffect(() => {
    if (!formType) {
      setProp((props) => {
        props.formType = 'create'
        return props
      })
      updateIn100ms()
    }
  }, [formType])

  return (
    <>
      <TypeList onChange={updateIn100ms} />
      <IntegrationLanding typeName={typeName} />
      <ToolbarItem type={ToolbarItemType.Select} onChange={updateIn100ms} propKey="formType" title="Form Type">
        {['create', 'update', ...specials.map(({ name }) => name)].map((formType) => (
          <option key={formType} value={formType}>
            {formType}
          </option>
        ))}
        <option value="" disabled>
          Select a Type
        </option>
      </ToolbarItem>
      <DestinationPage propKey="destination" title="Redirect To" />
      {object?.supportsCustomFields && (
        <Button
          onClick={async () => {
            const name = strToCamel(prompt('Enter a name for the input') || '')
            if (name) {
              const existingFields = customEntity?.fields || []
              updateCustomEntity(typeName, {
                name: typeName,
                id: typeName,
                fields: [
                  ...existingFields,
                  {
                    name,
                    id: name,
                    type: 'string',
                  },
                ],
              })
              addInput(
                {
                  name,
                  typeName,
                  formType,
                },
                nodeId,
              )
            }
          }}
        >
          Add New Input
        </Button>
      )}
      <ColumnControls
        availableFields={availableFields.map(({ name }) => ({ name, isRequired: false }))}
        includedFields={includedFields}
        removeField={(name: string) => {
          if (args) {
            const field = args[0].fields?.find((field) => field.name === name)
            if (field) {
              const inputs = argToFormInput(field, { typeName, formType })
              inputs.forEach((input) => removeInput(input, nodeId))
            }
          }
        }}
        addField={(name: string) => {
          if (args) {
            const field = args[0].fields?.find((field) => field.name === name)
            if (field) {
              const inputs = argToFormInput(field, { typeName, formType })
              inputs.forEach((input) => addInput(input, nodeId))
            }
          }
        }}
      />
    </>
  )
}

Form.craft = {
  displayName: 'Form',
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
    canMoveIn: (incomingNodes: Node[], currentNode: Node, helper: NodeHelpersType) => {
      const [incomingNode] = incomingNodes
      if (incomingNode.data.displayName === FormInput.name) {
        // still allow moving in if the input is already a part of the form
        return helper(currentNode.id).descendants(true).includes(incomingNode.id)
      }
      return true
    },
  },
}

export default Form
