import React, { useState } from 'react'
import { FileInput, FileInputProps } from '../FileInput'

/*
  import { isImageType, getTypeFromBase64 } from '@reapit/utils'
  due to configuration issues ^ don't work
  TODO: fix in element v2 next mile stone
*/
export const isImageType = (type: string) => {
  console.warn(
    /* eslint-disable-next-line */
    'This function (isImageType) will be removed in the next elements version (for internal use only), please do not use it',
  )
  const regex = /^image\//
  return regex.test(type)
}

export const getTypeFromBase64 = (base64: string): string => {
  console.warn(
    /* eslint-disable-next-line */
    'This function (getTypeFromBase64) will be removed in the next elements version (for internal use only), please do not use it',
  )
  try {
    const type = base64.split(';')[0].split(':')[1]
    return type
  } catch (error) {
    return ''
  }
}

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
