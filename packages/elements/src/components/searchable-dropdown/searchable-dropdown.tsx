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

export interface SearchableDropdownProps<T> extends React.InputHTMLAttributes<HTMLInputElement> {
  getResults: (query: string) => Promise<T[]>
  getResultValue: (result: T) => string
  getResultLabel: (result: T) => string
  icon?: IconNames
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
    ...inputProps
  }: ControlledSearchableDropdownProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>,
) => (
  <ElSearchableDropdownContainer>
    <input style={{ display: 'none' }} value={selectedValue} ref={ref} />
    <ElSearchableDropdownSearchInputAddOn>
      <Icon icon={icon} />
    </ElSearchableDropdownSearchInputAddOn>
    <ElSearchableDropdownSearchInput value={value} {...inputProps} />
    {isResultsListVisible && (
      <ElSearchableDropdownResultsContainer>
        {resultsList.map((result) => (
          <ElSearchableDropdownResult key={result.label} onClick={() => onResultClick(result)}>
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

export const ControlledSearchableDropdown = forwardRef(SearchableDropdownControlledInner) as <T>(
  props: ControlledSearchableDropdownProps<T> & { ref?: React.ForwardedRef<HTMLInputElement> },
) => ReturnType<typeof SearchableDropdownControlledInner>

export const SearchableDropdownInner = <T extends unknown>(
  { getResults, icon, getResultValue, getResultLabel, onChange, ...inputProps }: SearchableDropdownProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>,
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
