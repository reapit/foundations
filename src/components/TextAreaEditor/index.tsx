import * as React from 'react'
import { Field } from 'formik'
import { Editor } from '../Editor'

export interface TextAreaEditorProps {
  placeholder?: string
  id: string
  labelText: string
  name: string
}

export const handleOnChange = ({ field, name }) => (html: string) => {
  field.onChange({ target: { value: html, name } })
}

export const renderForm = ({ labelText, id, placeholder }) => ({ field, form: { touched, errors } }) => {
  const hasError = touched[field.name] && errors[field.name]
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
          onChange={handleOnChange({ field, name })}
        />
      </div>
      {hasError && (
        <div data-test="input-error" className="has-text-danger">
          {errors[field.name]}
        </div>
      )}
    </div>
  )
}

export const TextAreaEditor = ({ name, labelText, placeholder, id }: TextAreaEditorProps) => (
  <Field name={name} render={renderForm({ labelText, id, placeholder })} />
)
