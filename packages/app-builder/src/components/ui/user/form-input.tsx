import { useEditor, useNode } from '@craftjs/core'
import React from 'react'
import { ToolbarItem, ToolbarItemType, ToolbarSection } from '../toolbar'

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
  <>
    <ToolbarSection
      title="Search"
      props={['isReadOnly']}
      summary={({ isReadOnly }: any) => {
        return `${isReadOnly ? 'Is' : 'Is not'} Read Only`
      }}
    >
      <ToolbarItem type={ToolbarItemType.Select} propKey="isReadOnly" title="Read Only?">
        <option value="true">Yes</option>
        <option value="">No</option>
      </ToolbarItem>
    </ToolbarSection>
  </>
)

FormInput.craft = {
  related: {
    toolbar: FormInputSettings,
  },
}