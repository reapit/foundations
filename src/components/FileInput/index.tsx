import * as React from 'react'
import { Field } from 'formik'

const { useState } = React

export interface FileInputTestProps {
  waitUntilDataReaderLoadResolver?: any
}

export interface FileInputProps {
  labelText: string
  name: string
  dataTest?: string
  id?: string
  accept?: string
  allowClear?: boolean
  // props specialized for unit test
  testProps?: FileInputTestProps
  inputProps?: Record<string, any>
  value?: string | null
  onChange?: () => void
}

export const FileInput = ({
  testProps,
  name,
  dataTest,
  id = name,
  labelText,
  accept = '',
  allowClear = false,
  inputProps
}: FileInputProps) => {
  const [fileUrl, setFileName] = useState()
  const inputFile = React.useRef<HTMLInputElement>(null)

  return (
    <Field
      name={name}
      render={({ field, form: { touched, errors, setFieldValue } }) => {
        const hasError = touched[field.name] && errors[field.name]
        const hasFile = fileUrl || field.value
        const containerClassName = `file ${hasError ? 'is-danger' : 'is-primary'} ${hasFile ? 'has-name' : ''}`

        const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target && e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setFileName(file.name)

            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = function() {
              const base64 = reader.result
              setFieldValue(name, base64)

              if (testProps) {
                testProps.waitUntilDataReaderLoadResolver()
              }
            }
            reader.onerror = function(error) {
              console.log('Error: ', error)
            }
          }
        }

        return (
          <div className={field}>
            <div className={containerClassName}>
              <div className="control pb-2">
                <label data-test="file-input-label" className="file-label" htmlFor={id}>
                  <input
                    {...inputProps}
                    ref={inputFile}
                    id={id}
                    className="file-input"
                    type="file"
                    data-test={dataTest || ''}
                    onChange={onChange}
                    accept={accept}
                  />
                  <span className="file-cta">
                    <span className="file-label">{labelText}</span>
                  </span>
                  {hasFile && (
                    <span data-test="fileUploadFileName" className="file-name">
                      {fileUrl || field.value}
                    </span>
                  )}
                  {hasFile && allowClear && (
                    <a
                      className="delete ml-2 mt-2"
                      onClick={e => {
                        e.preventDefault()
                        setFieldValue(name, '')
                        setFileName('')
                        if (inputFile.current) {
                          inputFile.current.value = ''
                        }
                      }}
                    />
                  )}
                </label>
              </div>
            </div>
            {hasError && (
              <div className="has-text-danger" data-test="input-error">
                {errors[field.name]}
              </div>
            )}
          </div>
        )
      }}
    />
  )
}
