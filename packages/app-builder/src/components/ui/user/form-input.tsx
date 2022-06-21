import { useEditor, useNode, Node } from '@craftjs/core'
import React from 'react'
import { ToolbarItem, ToolbarItemType } from '../toolbar'

import { FormInputProps, FormInput as EFormInput } from './ejectable/form-input'

export const FormInput = (props: FormInputProps) => {
  const { isEditing } = useEditor((state) => ({
    isEditing: state.options.enabled,
  }))
  const {
    connectors: { connect, drag },
  } = useNode()

  return <EFormInput {...props} ref={(ref) => ref && connect(drag(ref))} disabled={isEditing} />
}

const FormInputSettings = () => (
  <ToolbarItem type={ToolbarItemType.Select} propKey="isReadOnly" title="Read Only?">
    <option value="true">Yes</option>
    <option value="">No</option>
  </ToolbarItem>
)

FormInput.craft = {
  displayName: 'FormInput',
  related: {
    toolbar: FormInputSettings,
  },
  custom: {
    isDeletable: (node: Node) => {
      // if is required then it can't be deleted
      return !node.data.props.isRequired
    },
  },
}
