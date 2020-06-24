import React from 'react'
import { FileInput, FileInputProps } from '../FileInput'
import { isImageType, getTypeFromBase64 } from '@reapit/utils'

export const ImageInput = (props: FileInputProps) => (
  <FileInput
    dataTest={props.dataTest}
    name={props.name}
    labelText={props.labelText}
    id={props.id}
    allowClear={props.allowClear}
    accept="image/*"
    afterLoadedImage={props.afterLoadedImage}
    croppedImage={props.croppedImage}
    validate={validateType}
  />
)

export const validateType = (value: string): string => {
  const fileType = getTypeFromBase64(value)
  if (!isImageType(fileType)) return 'You must select the image file!'
  return ''
}
