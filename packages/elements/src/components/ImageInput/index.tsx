import React from 'react'
import { FileInput, FileInputProps } from '../FileInput'

export const ImageInput = (props: FileInputProps) => (
  <FileInput
    dataTest={props.dataTest}
    name={props.name}
    labelText={props.labelText}
    id={props.id}
    allowClear={props.allowClear}
  />
)
