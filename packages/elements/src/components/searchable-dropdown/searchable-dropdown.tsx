import React, { forwardRef, useEffect } from 'react'
import {
  ElSearchableDropdownCloseButton,
  ElSearchableDropdownContainer,
  ElSearchableDropdownResult,
  ElSearchableDropdownResultsContainer,
  ElSearchableDropdownSearchInput,
  ElSearchableDropdownSearchInputAddOn,
  ElSearchableDropdownSearchLoader,
} from './__styles__'
import { Icon, IconNames } from '../icon'

export interface SearchableDropdownProps<T> extends React.InputHTMLAttributes<HTMLInputElement> {
  getResults: (query: string) => Promise<T[]>
  getResultValue: (result: T) => string
  getResultLabel: (result: T) => string
  icon?: IconNames
}

const SearchableDropdownInner = <T extends unknown>(
  { onChange, getResults, icon, getResultValue, getResultLabel, ...inputProps }: SearchableDropdownProps<T>,
  ref: React.ForwardedRef<React.InputHTMLAttributes<HTMLInputElement>>,
) => {
  const [value, setValue] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [resultsList, setResultsList] = React.useState<T[]>([])
  const [resultsVisible, setResultsVisible] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState('')

  useEffect(() => {
    if (value.length > 2 && !resultsList.map(getResultLabel).includes(value)) {
      setLoading(true)
      getResults(value).then((results) => {
        setResultsList(results)
        setLoading(false)
        setResultsVisible(true)
      })
    }
  }, [value])

  const handleSelectionChange = (label: string, value: string) => {
    setValue(label)
    setSelectedValue(value)
    setResultsVisible(false)
    if (onChange) {
      onChange({
        target: {
          value,
        },
      } as React.ChangeEvent<HTMLInputElement>)
    }
  }

  let blurTimeout

  return (
    <ElSearchableDropdownContainer>
      <ElSearchableDropdownSearchInputAddOn>
        <Icon icon={icon || 'searchSystem'} />
      </ElSearchableDropdownSearchInputAddOn>
      <ElSearchableDropdownSearchInput
        {...inputProps}
        onChange={(e) => {
          setValue(e.target.value)
        }}
        onFocus={() => {
          if (resultsList.length > 0 && value.length > 2) {
            clearTimeout(blurTimeout)
            setResultsVisible(true)
          }
        }}
        onBlur={() => {
          blurTimeout = setTimeout(() => {
            setResultsVisible(false)
          }, 200)
        }}
        value={value}
        ref={ref}
      />
      <ElSearchableDropdownResultsContainer style={{ display: resultsVisible ? undefined : 'none' }}>
        {resultsList
          .map((result) => ({ value: getResultValue(result), label: getResultLabel(result) }))
          .map(({ value, label }) => (
            <ElSearchableDropdownResult
              key={value}
              onClick={() => {
                handleSelectionChange(label, value)
              }}
            >
              {label}
            </ElSearchableDropdownResult>
          ))}
      </ElSearchableDropdownResultsContainer>
      {loading && <ElSearchableDropdownSearchLoader />}
      {!loading && selectedValue && (
        <ElSearchableDropdownCloseButton
          icon="closeSystem"
          onClick={() => {
            handleSelectionChange('', '')
          }}
        />
      )}
    </ElSearchableDropdownContainer>
  )
}

export const SearchableDropdown = forwardRef(SearchableDropdownInner) as <T>(
  props: SearchableDropdownProps<T> & { ref?: React.ForwardedRef<HTMLInputElement> },
) => ReturnType<typeof SearchableDropdownInner>
