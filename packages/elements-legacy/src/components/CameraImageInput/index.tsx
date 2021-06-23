import React from 'react'
import { FileInput, FileInputProps } from '../FileInput'

export const CameraImageInput = (props: FileInputProps) => {
  const { inputProps, ...rest } = props
  return (
    <FileInput
      {...rest}
      inputProps={{
        ...inputProps,
        capture: 'camera',
      }}
    />
  )
}
