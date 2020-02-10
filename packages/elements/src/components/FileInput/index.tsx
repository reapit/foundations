import * as React from 'react'
import { Field, FieldProps } from 'formik'
import { isBase64 } from '../../utils/is-base64'
import { checkError } from '../../utils/form'

const { useState } = React

export interface FileInputTestProps {
  waitUntilDataReaderLoadResolver?: any
}

export interface FileInputProps {
  name: string
  labelText: string
  id?: string
  dataTest?: string
  accept?: string
  allowClear?: boolean
  // props specialized for unit test
  testProps?: FileInputTestProps
  inputProps?: Record<string, any>
  required?: boolean
}

export const FileInput = ({
  name,
  labelText,
  id = name,
  dataTest = '',
  accept = '',
  allowClear = false,
  testProps,
  inputProps,
  required = false,
}: FileInputProps) => {
  const [fileUrl, setFileName] = useState<string>()
  const inputFile = React.useRef<HTMLInputElement>(null)

  return (
    <Field name={name}>
      {({ field, meta }: FieldProps<string>) => {
        const hasError = checkError(meta)
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
              field.onChange({ target: { value: base64, name: field.name } })
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
          <React.Fragment>
            <div className={`${containerClassName} field pb-2`}>
              <div className="file-input-container control">
                <label data-test="file-input-label" className="file-label" htmlFor={id}>
                  <input
                    {...inputProps}
                    ref={inputFile}
                    id={id}
                    className="file-input"
                    type="file"
                    data-test={dataTest}
                    onChange={onChange}
                    accept={accept}
                  />
                  <span className={`file-cta ${required && !hasFile ? 'required-label' : ''}`}>{labelText}</span>
                  {hasFile && (
                    <span data-test="fileUploadFileName" className="file-name">
                      {!isBase64(field.value) ? (
                        <a href={field.value} target="_blank" rel="noopener noreferrer">
                          {fileUrl || field.value}
                        </a>
                      ) : (
                        fileUrl || field.value
                      )}
                    </span>
                  )}
                  {hasFile && allowClear && (
                    <a
                      className="delete is-large"
                      onClick={e => {
                        e.preventDefault()
                        field.onChange({ target: { value: '', name: field.name } })
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
                {meta.error}
              </div>
            )}
          </React.Fragment>
        )
      }}
    </Field>
  )
}
