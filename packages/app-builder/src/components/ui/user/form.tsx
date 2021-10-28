import React from 'react'
import Container from './container'
import { ToolbarItem, ToolbarItemType, ToolbarSection } from '../toolbar'
import { useTypeList } from '../../hooks/objects/use-type-list'
import { useEditor, useNode } from '@craftjs/core'
import { DestinationPage } from './link'
import { FormProps, Form as EForm } from './ejectable/form'
import { useObjectSpecials } from '../../hooks/objects/use-object-specials'
import { FormInput } from './form-input'

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

  return (
    <EForm
      FormInputComponent={FormInput}
      {...defaultProps}
      {...props}
      ref={(ref) => ref && connect(drag(ref))}
      disabled={isEditing}
    />
  )
}

const ContainerSettings = Container.craft.related.toolbar

const FormSettings = () => {
  const { data, loading } = useTypeList()
  const { typeName } = useNode((node) => node.data.props)
  const { specials } = useObjectSpecials(typeName)

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
        <ToolbarItem type={ToolbarItemType.Select} propKey="typeName" title="Object Type">
          {(data || []).map((typeName) => (
            <option key={typeName} value={typeName}>
              {typeName}
            </option>
          ))}
          <option value="" disabled>
            {loading ? 'Loading...' : 'Select a Type'}
          </option>
        </ToolbarItem>
        <ToolbarItem type={ToolbarItemType.Select} propKey="formType" title="Form Type">
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
    // canMoveOut: (outgoingNode: Node, currentNode: Node) => {
    //   console.log('canMoveOut', outgoingNode, currentNode)
    //   // verify outgoingNode's property name is in currentNode's list of properties
    //   // and that the property is not a required property of the currentNode
    //   return false
    // },
    // canMoveIn: (incomingNode: Node, currentNode: Node) => {
    //   console.log('canMoveIn', incomingNode, currentNode)
    //   // verify incomingNode's property name is in currentNode's list of properties
    //   // and that there's not a property of the same name in the currentNode
    //   return false
    // },
  },
}

export default Form
