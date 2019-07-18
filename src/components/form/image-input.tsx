import React from 'react'
import FileInput, { FileInputProps } from '@/components/form/file-input'

const ImageInput = (props: FileInputProps) => <FileInput name={props.name} label={props.label} id={props.id} />

export default ImageInput
