import React from 'react'
import FileInput, { FileInputProps } from './file-input'

const ImageInput = (props: FileInputProps) => (
  <FileInput dataTest={props.dataTest} name={props.name} labelText={props.labelText} id={props.id} />
)

export default ImageInput
