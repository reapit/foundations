import React, { FC, forwardRef, HTMLAttributes, useEffect } from 'react'
import {
  ElSearchableDropdownCloseButton,
  ElSearchableDropdownContainer,
  ElSearchableDropdownResult,
  ElSearchableDropdownResultsContainer,
  ElSearchableDropdownSearchInput,
  ElSearchableDropdownSearchInputAddOn,
  ElSearchableDropdownSearchLabel,
  ElSearchableDropdownSearchLoader,
} from './__styles__'
import { Icon, IconNames } from '../icon'
import { handleSetNativeInput } from '../multi-select'
import { v4 as uuid } from 'uuid'

export interface SearchableDropdownProps<T> extends React.InputHTMLAttributes<HTMLInputElement> {
  getResults: (query: string) => Promise<T[]>
  getResultValue: (result: T) => string
  getResultLabel: (result: T) => string
  icon?: IconNames
  defaultVal?: T
}

export interface ControlledSearchableDropdownProps<T> extends React.InputHTMLAttributes<HTMLInputElement> {
  isResultsListVisible: boolean
  isClearVisible: boolean
  loading: boolean
  selectedValue: string
  resultsList: { label: string; result: T }[]
  onResultClick: (result: { label: string; result: T }) => void
  onClear: () => void
  icon?: IconNames
}

const generateRandomId = () => uuid()

export const SearchableDropdownControlledInner = <T extends unknown>(
  {
    isResultsListVisible,
    icon = 'searchSystem',
    loading,
    resultsList,
    onResultClick,
    onClear,
    isClearVisible,
    value,
    selectedValue,
    id,
    ...inputProps
  }: ControlledSearchableDropdownProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>,
) => {
  return (
    <ElSearchableDropdownContainer>
      <input id={id} style={{ display: 'none' }} readOnly value={selectedValue} ref={ref} />
      <ElSearchableDropdownSearchInputAddOn>
        <Icon icon={icon} />
      </ElSearchableDropdownSearchInputAddOn>
      <ElSearchableDropdownSearchInput data-testid="search-input" value={value} {...inputProps} />
      {isResultsListVisible && (
        <ElSearchableDropdownResultsContainer>
          {resultsList.map((result, index) => (
            <ElSearchableDropdownResult
              data-testid={`dropdown-result-${index}`}
              key={generateRandomId()}
              onClick={() => onResultClick(result)}
            >
              {result.label}
            </ElSearchableDropdownResult>
          ))}
          {!loading && !resultsList.length && <ElSearchableDropdownResult>No results found</ElSearchableDropdownResult>}
        </ElSearchableDropdownResultsContainer>
      )}
      {loading && <ElSearchableDropdownSearchLoader />}
      {isClearVisible && <ElSearchableDropdownCloseButton icon="closeSystem" onClick={onClear} />}
    </ElSearchableDropdownContainer>
  )
}

export const ControlledSearchableDropdown = forwardRef(SearchableDropdownControlledInner) as <T>(
  props: ControlledSearchableDropdownProps<T> & { ref?: React.ForwardedRef<HTMLInputElement> },
) => ReturnType<typeof SearchableDropdownControlledInner>

export const SearchableDropdownInner = <T extends unknown>(
  {
    getResults,
    icon,
    getResultValue,
    getResultLabel,
    onChange,
    defaultVal,
    id,
    ...inputProps
  }: SearchableDropdownProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>,
) => {
  const defaultValue = defaultVal ? getResultValue(defaultVal) : ''
  const dropdownId = id ?? generateRandomId()
  const [value, setValue] = React.useState(defaultVal ? getResultLabel(defaultVal) : '')
  const [loading, setLoading] = React.useState(false)
  const [resultsList, setResultsList] = React.useState<T[]>(defaultVal ? [defaultVal] : [])
  const [resultsVisible, setResultsVisible] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState(defaultValue)

  useEffect(() => {
    if (value.length > 2 && !resultsList.map(getResultLabel).includes(value)) {
      setLoading(true)
      getResults(value)
        .then((results) => {
          setResultsList(results)
          setLoading(false)
          setResultsVisible(true)
        })
        .catch((error) => console.error(error))
    }
  }, [value])

  useEffect(handleSetNativeInput(dropdownId, [value]), [value])

  const handleSelectionChange = (label: string, value: string) => {
    setValue(label)
    setSelectedValue(value)
    setResultsVisible(false)
    if (onChange) {
      onChange(({
        target: {
          ...inputProps,
          value,
        },
      } as unknown) as React.ChangeEvent<HTMLInputElement>)
    }
  }

  let blurTimeout

  return (
    <ControlledSearchableDropdown<T>
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
      isResultsListVisible={resultsVisible}
      icon={icon || 'searchSystem'}
      loading={loading}
      resultsList={resultsList.map((result) => ({
        label: getResultLabel(result),
        result,
      }))}
      onResultClick={({ label, result }) => {
        handleSelectionChange(label, getResultValue(result))
      }}
      selectedValue={selectedValue}
      onClear={() => handleSelectionChange('', '')}
      isClearVisible={!!selectedValue && !loading}
      id={dropdownId}
      {...inputProps}
    />
  )
}

export const SearchableDropdown = forwardRef(SearchableDropdownInner) as <T>(
  props: SearchableDropdownProps<T> & { ref?: React.ForwardedRef<HTMLInputElement> },
) => ReturnType<typeof SearchableDropdownInner>

export const SearchableDropdownSearchLabel: FC<HTMLAttributes<HTMLLabelElement>> = ({ children, ...rest }) => {
  return <ElSearchableDropdownSearchLabel {...rest}>{children}</ElSearchableDropdownSearchLabel>
}
