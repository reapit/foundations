import * as React from 'react'
import { Field, FieldProps } from 'formik'
import ReactDatePicker from 'react-datepicker'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { checkError } from '../../utils/form'
import { fieldValidateRequire } from '../../utils/validators'
import { cx } from 'linaria'
;(dayjs as any).extend(customParseFormat)

const { useState, useEffect } = React

export type CustomInputType = {
  onChange?: any
  onBlur?: any
  onFocus?: any
  placeholder?: string
  value?: any
  id?: string
  onClick?: any
  className: string
}

export const CustomInput = React.forwardRef<HTMLInputElement, CustomInputType>(
  ({ onChange, onBlur, value, id, onClick, className, ...rest }: CustomInputType, ref) => {
    const [inputValue, setInputValue] = useState(value)

    // sync with the real value
    useEffect(() => {
      setInputValue(value)
    }, [value])

    const [isBackspaceKeyPressed, setIsBackspaceKeyPressed] = useState(false)

    // COOKED https://stackoverflow.com/questions/12578507/implement-an-input-with-a-mask
    const _onChange = e => {
      const inputElement = e.target
      const mask = '__/__/____'

      if (!inputElement) {
        return
      }

      const castedInputElement = inputElement as HTMLInputElement

      const oldStart = castedInputElement.selectionStart
      const textFieldValue = e.target.value

      const splitTextFieldValue = textFieldValue.split('').filter(char => char !== '/')

      const transformedTextFieldValue = mask
        .split('')
        .map(maskChar => {
          if (maskChar !== '_') {
            return maskChar
          }
          if (textFieldValue.length === 0) return maskChar

          const extractedSplitTextFieldValue = splitTextFieldValue.shift()
          if (!extractedSplitTextFieldValue) {
            return maskChar
          }
          return extractedSplitTextFieldValue
        })
        .join('')

      setInputValue(transformedTextFieldValue)

      const parsedTransformedTextFieldValue = dayjs(transformedTextFieldValue, 'DD/MM/YYYY')

      if (parsedTransformedTextFieldValue.isValid()) {
        onChange({
          target: {
            value: parsedTransformedTextFieldValue,
          },
        })
      }

      // set state ^ affect asynchronous. event loop thing...
      setTimeout(() => {
        if (oldStart) {
          /**
           * handle
           * "11<cusor>/" -> press 1 -> "11/<cursor>1"
           */
          if (!isBackspaceKeyPressed && transformedTextFieldValue[oldStart - 1] === '/') {
            castedInputElement.selectionStart = oldStart + 1
            castedInputElement.selectionEnd = oldStart + 1
            return
          }

          /**
           * Reset the flag if it happened
           */
          if (isBackspaceKeyPressed) {
            setIsBackspaceKeyPressed(false)
          }
        }

        castedInputElement.selectionStart = oldStart
        castedInputElement.selectionEnd = oldStart
      }, 1)
    }

    const onKeyUp = e => {
      const inputChar = String.fromCharCode(e.keyCode)

      // Allow: cmd + anything, ctrl + anything (copy, paste, select all... etc)
      if (e.metaKey || e.ctrlKey) {
        return
      }

      // prevent user from input number
      if (![8, 37, 38, 39, 40].includes(e.keyCode) && !inputChar.match(/[0-9]/)) {
        e.preventDefault()
      }

      // flag to checked if backspace key was pressed
      if (e.keyCode === 8) {
        setIsBackspaceKeyPressed(true)
      }
    }

    const _onBlur = e => {
      setInputValue(value)
      onBlur(e)
    }

    return (
      <input
        ref={ref}
        type="input"
        className={className}
        placeholder="DD/MM/YYYY"
        value={inputValue}
        id={id}
        onChange={_onChange}
        onKeyDown={onKeyUp}
        onBlur={_onBlur}
        onClick={onClick}
        {...rest}
      />
    )
  },
)

CustomInput.displayName = 'CustomInput'

export interface DatePickerProps {
  name: string
  id: string
  labelText?: string
  required?: boolean
  reactDatePickerProps?: any
  useCustomInput?: boolean
  popperPlacement?: string
  containerClassName?: string
}

export const DatePicker = ({
  name,
  id,
  labelText,
  required = false,
  reactDatePickerProps = {},
  useCustomInput = true,
  popperPlacement = 'top',
  containerClassName = '',
}: DatePickerProps) => {
  return (
    <Field name={name} validate={required ? fieldValidateRequire : null}>
      {({ field, meta }: FieldProps<string>) => {
        const { dateFormat } = reactDatePickerProps
        const parsedDayJsValue = dayjs(field.value)
        let fieldValue: string = ''
        let parseDate: Date | undefined = undefined

        if (!parsedDayJsValue.isValid()) {
          fieldValue = ''
        } else {
          fieldValue = parsedDayJsValue.startOf('day').format(dateFormat || 'DD/MM/YYYY')
          parseDate = parsedDayJsValue.startOf('day').toDate()
        }

        const hasError = checkError(meta)
        const className = hasError ? 'input is-danger' : 'input is-primary'

        return (
          <div className={cx('field', containerClassName)}>
            <div className="control">
              {labelText && (
                <label className={`label ${required ? 'required-label' : ''}`} htmlFor={id}>
                  {labelText}
                </label>
              )}
              <ReactDatePicker
                popperPlacement={popperPlacement}
                className={className}
                id={id}
                {...reactDatePickerProps}
                {...field}
                value={fieldValue}
                selected={parseDate}
                onChange={value => {
                  if (!value) {
                    return
                  }
                  field.onChange({ target: { value: dayjs(value).format('YYYY-MM-DDTHH:mm:ss'), name: field.name } })
                }}
                onSelect={value => {
                  if (!value) {
                    return
                  }
                  field.onChange({ target: { value: dayjs(value).format('YYYY-MM-DDTHH:mm:ss'), name: field.name } })
                }}
                customInput={useCustomInput && <CustomInput className={className} />}
              />
              {hasError && (
                <div className="has-text-danger" data-test="input-error">
                  {meta.error}
                </div>
              )}
            </div>
          </div>
        )
      }}
    </Field>
  )
}
