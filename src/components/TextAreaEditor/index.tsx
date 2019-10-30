import * as React from 'react'
import { Field } from 'formik'
import { Editor } from '../Editor'

export interface TextAreaEditorProps {
  placeholder?: string
  id: string
  labelText: string
  name: string
}

export const TextAreaEditor = ({ name, labelText, placeholder, id }: TextAreaEditorProps) => (
  <Field
    name={name}
    render={({ field, form: { touched, errors } }) => {
      const hasError = touched[field.name] && errors[field.name]
      return (
        <div className="field pb-4">
          <div className="control">
            <label className="label" htmlFor={id}>
              {labelText}
            </label>
            <Editor
              hasError={hasError}
              placeholder={placeholder}
              onChange={(html: string) => {
                field.onChange({ target: { value: html, name } })
              }}
            />
          </div>
          {hasError && (
            <div data-test="input-error" className="has-text-danger">
              {errors[field.name]}
            </div>
          )}
        </div>
      )
    }}
  />
)
