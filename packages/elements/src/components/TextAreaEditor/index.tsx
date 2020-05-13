import * as React from 'react'
import { FieldInputProps, FieldHelperProps, useField } from 'formik'
import { checkError } from '../../utils/form'
import { Editor, EditorProps } from '../Editor'

export interface TextAreaEditorProps extends EditorProps {
  placeholder?: string
  id: string
  labelText: string
  name: string
  dataTest?: string
}

export type HandleTextAreaOnChangeParams = {
  field: FieldInputProps<string>
}

export type HandleTextAreaOnBlurParams = {
  helpers: FieldHelperProps<string>
}

export const handleTextAreaOnChange = ({ field }: HandleTextAreaOnChangeParams) => (html: string) => {
  field.onChange({ target: { value: html, name: field.name } })
}

export const handleTextAreaOnBlur = ({ helpers }: HandleTextAreaOnBlurParams) => () => {
  helpers.setTouched(true)
}

export const TextAreaEditor = ({ name, labelText, placeholder, id, ...restProps }: TextAreaEditorProps) => {
  const [field, meta, helpers] = useField(name)

  const hasError = checkError(meta)

  return (
    <>
      <div className="field pb-2">
        <div className="control">
          <label className="label" htmlFor={id}>
            {labelText}
          </label>
          <Editor
            hasError={hasError}
            placeholder={placeholder}
            defaultContent={field.value}
            onChange={handleTextAreaOnChange({ field })}
            onBlur={handleTextAreaOnBlur({ helpers })}
            {...restProps}
          />
        </div>
        {hasError && (
          <div data-test="input-error" className="has-text-danger">
            {meta.error}
          </div>
        )}
      </div>
    </>
  )
}
