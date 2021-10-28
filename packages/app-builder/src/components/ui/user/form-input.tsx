import { useEditor, useNode } from '@craftjs/core'
import React from 'react'

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
