import * as React from 'react'
import { Field, FieldInputProps, FieldProps } from 'formik'
import { checkError } from '../../utils/form'
import { Editor } from '../Editor'

export interface TextAreaEditorProps {
  placeholder?: string
  id: string
  labelText: string
  name: string
}

export type HandleTextAreaOnChangeParams = {
  field: FieldInputProps<string>
  name: string
}

export const handleTextAreaOnChange = ({ field, name }: HandleTextAreaOnChangeParams) => (html: string) => {
  field.onChange({ target: { value: html, name } })
}

export const renderTextAreaEditor = ({ labelText, id, placeholder }) => ({ field, meta }: FieldProps<string>) => {
  const hasError = checkError(meta)
  return (
    <div className="field pb-2">
      <div className="control">
        <label className="label" htmlFor={id}>
          {labelText}
        </label>
        <Editor
          hasError={hasError}
          placeholder={placeholder}
          defaultContent={field.value}
          onChange={handleTextAreaOnChange({ field, name })}
        />
      </div>
      {hasError && (
        <div data-test="input-error" className="has-text-danger">
          {meta.error}
        </div>
      )}
    </div>
  )
}

export const TextAreaEditor = ({ name, labelText, placeholder, id }: TextAreaEditorProps) => (
  <Field name={name}>{renderTextAreaEditor({ labelText, id, placeholder })}</Field>
)
