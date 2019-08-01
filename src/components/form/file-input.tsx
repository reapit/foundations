import * as React from 'react'
import { Field } from 'formik'
import bulmaStyles from '@/styles/vendor/bulma'

const { isPrimary, isDanger, hasTextDanger } = bulmaStyles
const { useState } = React

interface FileInputTestProps {
  waitUntilDataReaderLoadResolver?: any
}

export interface FileInputProps {
  labelText: string
  name: string
  dataTest?: string
  id?: string
  accept?: string

  // props specialized for unit test
  testProps?: FileInputTestProps
}

const { file, hasName, fileName, fileLabel, fileInput, fileCta, control } = bulmaStyles

const FileInput = ({ testProps, name, dataTest, id = name, labelText, accept = '' }: FileInputProps) => {
  const [fileUrl, setFileName] = useState()

  return (
    <Field
      name={name}
      render={({ field, form: { touched, errors, setFieldValue } }) => {
        const hasError = touched[field.name] && errors[field.name]
        const hasFile = fileUrl || field.value
        const containerClassName = `${hasError ? isDanger : isPrimary} ${file} ${hasFile ? hasName : ''}`

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
              <div className={`${control} pb-2`}>
                <label data-test="file-input-label" className={fileLabel} htmlFor={id}>
                  <input
                    id={id}
                    className={fileInput}
                    type="file"
                    data-test={dataTest || ''}
                    onChange={onChange}
                    accept={accept}
                  />
                  <span className={fileCta}>
                    <span className={fileLabel}>{labelText}</span>
                  </span>
                  {hasFile && (
                    <span data-test="fileUploadFileName" className={fileName}>
                      {fileUrl || field.value}
                    </span>
                  )}
                  {hasFile && (
                    <a
                      className={`${bulmaStyles.delete} ml-2 mt-2`}
                      onClick={e => {
                        e.preventDefault()
                        setFieldValue(name, '')
                        setFileName('')
                      }}
                    />
                  )}
                </label>
              </div>
            </div>
            {hasError && (
              <div className={hasTextDanger} data-test="input-error">
                {errors[field.name]}
              </div>
            )}
          </div>
        )
      }}
    />
  )
}

export default FileInput
