import * as React from 'react'
import { Field } from 'formik'
import bulmaStyles from '@/styles/vendor/bulma'
import fileInputStyles from './file-input.scss?mod'

const { isPrimary, isDanger, hasTextDanger } = bulmaStyles
const { useState } = React

interface FileInputTestProps {
  waitUntilDataReaderLoadResolver?: any
}

export interface FileInputProps {
  label: string
  name: string
  dataTest?: string
  id?: string
  accept?: string

  // props specialized for unit test
  testProps?: FileInputTestProps
}

const FileInput = ({ testProps, name, dataTest, id = name, label, accept = '' }: FileInputProps) => {
  const [fileName, setFileName] = useState()

  return (
    <Field
      name={name}
      render={({ field, form: { touched, errors, setFieldValue } }) => {
        const hasError = touched[field.name] && errors[field.name]
        const hasFile = fileName || field.value
        const containerClassName = `${hasError ? isDanger : isPrimary} ${bulmaStyles.file} ${
          hasFile ? bulmaStyles.hasName : ''
        }`

        const onChange = e => {
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

        return (
          <div className={bulmaStyles.field}>
            <div className={containerClassName}>
              <label className={bulmaStyles.fileLabel}>
                <div data-test="file-input-label" className={fileInputStyles.label}>
                  {label}
                </div>
                <input
                  id={id}
                  className={bulmaStyles.fileInput}
                  type="file"
                  data-test={dataTest || ''}
                  onChange={onChange}
                  accept={accept}
                />
                <span className={bulmaStyles.fileCta}>
                  <span className={bulmaStyles.fileLabel}>Choose a file…</span>
                </span>
                {hasFile && (
                  <span data-test="fileUploadFileName" className={bulmaStyles.fileName}>
                    {fileName || field.value}
                  </span>
                )}
              </label>
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
