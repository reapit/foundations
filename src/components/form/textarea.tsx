import * as React from 'react'
import { Field } from 'formik'

export interface InputProps {
  placeholder?: string
  id: string
  label: string
  name: string
  dataTest?: string
}

const TextArea = ({ name, label, id, dataTest, placeholder = '' }: InputProps) => (
  <Field
    name={name}
    render={({ field, form: { touched, errors } }) => {
      const hasError = touched[field.name] && errors[field.name]
      return (
        <div className="form-group">
          <label htmlFor={id}>{label}</label>
          <textarea
            data-test={dataTest || ''}
            id={id}
            placeholder={placeholder}
            className={'form-control' + (hasError ? ' is-invalid' : '')}
            {...field}
          />
          {hasError && <div className="invalid-feedback">{errors[field.name]}</div>}
        </div>
      )
    }}
  />
)

export default TextArea
