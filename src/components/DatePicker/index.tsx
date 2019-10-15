import * as React from 'react'
import { Field } from 'formik'
import ReactDatePicker from 'react-datepicker'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
;(dayjs as any).extend(customParseFormat)

const { useState, useEffect } = React

export interface DatePickerProps {
  name: string
  id: string
  labelText: string
}

const Input = ({
  onChange,
  value,
  id,
  onClick,
  className
}: {
  onChange?: any
  placeholder?: any
  value?: any
  id?: any
  onClick?: any
  className: string
}) => {
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

    let oldStart = castedInputElement.selectionStart
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
          value: parsedTransformedTextFieldValue
        }
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

  const onBlur = () => {
    setInputValue(value)
  }

  return (
    <input
      type="input"
      className={className}
      placeholder="DD/MM/YYYY"
      value={inputValue}
      id={id}
      onChange={_onChange}
      onKeyDown={onKeyUp}
      onBlur={onBlur}
      onClick={onClick}
    />
  )
}

export const DatePicker = ({ name, id, labelText }: DatePickerProps) => {
  return (
    <Field
      name={name}
      render={({ field, form: { touched, errors, setFieldValue } }) => {
        const fieldValue = field.value
        const parsedDayJsValue = dayjs(fieldValue)
        let parsedValue = ''
        let parseDate: Date | undefined = undefined

        if (!parsedDayJsValue.isValid()) {
          parsedValue = ''
        } else {
          parsedValue = parsedDayJsValue.format('DD/MM/YYYY')
          parseDate = parsedDayJsValue.toDate()
        }

        const hasError = touched[field.name] && errors[field.name]
        const className = hasError ? 'input is-danger' : 'input is-primary'

        return (
          <div className="field pb-2">
            <div className="control">
              <label className="label" htmlFor={id}>
                {labelText}
              </label>
              <ReactDatePicker
                className={className}
                name={name}
                id={id}
                labelText={labelText}
                {...field}
                value={parsedValue}
                selected={parseDate}
                onChange={value => {
                  setFieldValue(name, dayjs(value).format('YYYY-MM-DDTHH:mm:ss'))
                }}
                customInput={<Input className={className} />}
              />
              {hasError && (
                <div className="has-text-danger" data-test="input-error">
                  {errors[field.name]}
                </div>
              )}
            </div>
          </div>
        )
      }}
    />
  )
}
