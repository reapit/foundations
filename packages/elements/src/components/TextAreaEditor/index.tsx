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
  allowPasteRichText?: boolean
  required?: boolean
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

export const handleTextAreaOnPaste = () => e => {
  // Stop data actually being pasted into div
  e.stopPropagation()
  e.preventDefault()
  // Get pasted data via clipboard API
  const clipboardData = e.clipboardData || (window as any).clipboardData
  const pastedData = clipboardData ? clipboardData.getData('Text') : ''

  // need to check for browser compatible
  if (document.queryCommandSupported('insertText')) {
    document.execCommand('insertText', false, pastedData)
  } else {
    document.execCommand('paste', false, pastedData)
  }
}

export const TextAreaEditor = ({
  name,
  labelText,
  placeholder,
  id,
  allowPasteRichText = false,
  required = false,
  ...restProps
}: TextAreaEditorProps) => {
  const [field, meta, helpers] = useField(name)

  const hasError = checkError(meta)

  return (
    <>
      <div className="field">
        <div className="control">
          <label className={`label ${required ? 'required-label' : ''}`} htmlFor={id}>
            {labelText}
          </label>
          <Editor
            hasError={hasError}
            placeholder={placeholder}
            defaultContent={field.value}
            onChange={handleTextAreaOnChange({ field })}
            onPaste={allowPasteRichText ? undefined : handleTextAreaOnPaste()}
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
