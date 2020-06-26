import React, { useState } from 'react'
import { FileInput, FileInputProps } from '../FileInput'
import { isImageType, getTypeFromBase64 } from '@reapit/utils'

export interface ImageInputProps extends FileInputProps {
  afterLoadedImage?: (base64: string) => any
}

export const ImageInput = (props: ImageInputProps) => {
  const [message, setMessage] = useState<string>('')

  const afterLoadedImage = (base64, handleClearFile) => {
    if (!validateType(base64)) {
      setMessage('Invalid file type, please upload an image')
      handleClearFile()
      return
    }
    setMessage('')
    props.afterLoadedImage && props.afterLoadedImage(base64)
  }

  return (
    <>
      <FileInput
        dataTest={props.dataTest}
        name={props.name}
        labelText={props.labelText}
        id={props.id}
        allowClear={props.allowClear}
        accept="image/*"
        afterLoadedFile={afterLoadedImage}
        croppedImage={props.croppedImage}
        required={props.required}
      />
      {message && <p className="has-text-danger">{message}</p>}
    </>
  )
}

export const validateType = (value: string): boolean => {
  const fileType = getTypeFromBase64(value)
  return isImageType(fileType)
}
