import React from 'react'
import { FileInput, FileInputProps } from '../FileInput'

export const CameraImageInput = (props: FileInputProps) => (
  <FileInput
    inputProps={{
      capture: 'camera'
    }}
    dataTest={props.dataTest}
    name={props.name}
    labelText={props.labelText}
    id={props.id}
    allowClear={props.allowClear}
  />
)
