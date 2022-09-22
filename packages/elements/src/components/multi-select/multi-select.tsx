import React, {
  ChangeEvent,
  Dispatch,
  FC,
  forwardRef,
  HTMLAttributes,
  InputHTMLAttributes,
  LegacyRef,
  RefAttributes,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { cx } from '@linaria/core'
import {
  ElMultiSelectCheckbox,
  ElMultiSelect,
  ElMultiSelectLabel,
  ElMultiSelectInput,
  elHasGreyChips,
  ElMultiSelectSelected,
  ElMultiSelectUnSelected,
  ElMultiSelectInputWrapper,
} from './__styles__/index'
import { generateRandomId } from '../../storybook/random-id'
import { Icon } from '../icon'
import { elMl2 } from '../../styles/spacing'

export interface MultiSelectProps extends HTMLAttributes<HTMLDivElement> {}

export interface MultiSelectOption {
  value: string
  name: string
}

export interface MultiSelectInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  options: MultiSelectOption[]
  defaultValues?: string[]
  noneSelectedLabel?: string
}

export type MultiSelectInputWrapped = React.ForwardRefExoticComponent<
  MultiSelectInputProps & RefAttributes<InputHTMLAttributes<HTMLInputElement>>
>

export interface MultiSelectChipProps extends InputHTMLAttributes<HTMLInputElement> {}

const setNativeInputValue = (element: HTMLElement, value: string[], testFunc?: (value: string[]) => void) => {
  const valueSetter = Object.getOwnPropertyDescriptor(element, 'value')?.set
  const prototype = Object.getPrototypeOf(element)
  const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value')?.set

  if (valueSetter && valueSetter !== prototypeValueSetter) {
    prototypeValueSetter?.call(element, value)
  } else {
    valueSetter?.call(element, value)
    if (testFunc) testFunc(value)
  }
}

export const handleSetNativeInput = (
  id: string,
  selectedOptionValues: string[],
  testFunc?: (value: string[]) => void,
) => () => {
  const input = document.getElementById(id)
  if (input) {
    setNativeInputValue(input, selectedOptionValues, testFunc)
    const changeEvent = new Event('change', { bubbles: true })
    input.dispatchEvent(changeEvent)
  }
}

export const handleResetDefaultValues = (
  setSelectedOptionValues: Dispatch<SetStateAction<string[]>>,
  setSelectedDefaultValues: Dispatch<SetStateAction<string[]>>,
  defaultValues?: string[],
  selectedDefaultValues?: string[],
) => () => {
  if (defaultValues && JSON.stringify(defaultValues) !== JSON.stringify(selectedDefaultValues)) {
    setSelectedOptionValues(defaultValues)
    setSelectedDefaultValues(defaultValues)
  }
}

export const handleSelectedOptions = (
  value: string,
  selectedOptionValues: string[],
  setSelectedOptionValues: Dispatch<SetStateAction<string[]>>,
) => (event: ChangeEvent<HTMLInputElement>) => {
  const isChecked = event.target.checked

  const newSelected = isChecked
    ? [...selectedOptionValues, value]
    : selectedOptionValues.filter((option) => option !== value)

  setSelectedOptionValues(newSelected)
}

export const MultiSelectChip: FC<MultiSelectChipProps> = ({ className, children, id, ...rest }) => {
  const chipId = useMemo(() => {
    if (id) return id
    return generateRandomId()
  }, [id])

  return (
    <>
      <ElMultiSelectCheckbox id={id ?? chipId} type="checkbox" {...rest} />
      <ElMultiSelectLabel htmlFor={id ?? chipId} className={cx(className)}>
        {children}
      </ElMultiSelectLabel>
    </>
  )
}

export const MultiSelect: FC<MultiSelectProps> = ({ className, children, ...rest }) => (
  <ElMultiSelect className={cx(className)} {...rest}>
    {children}
  </ElMultiSelect>
)

export const MultiSelectSelected: FC<MultiSelectProps> = ({ className, children, ...rest }) => (
  <ElMultiSelectSelected className={cx(className)} {...rest}>
    {children}
  </ElMultiSelectSelected>
)

export const MultiSelectUnSelected: FC<MultiSelectProps> = ({ className, children, ...rest }) => (
  <ElMultiSelectUnSelected className={cx(className)} {...rest}>
    {children}
  </ElMultiSelectUnSelected>
)

/** This looks like I have had a bit of a meltdown but promise it makes sense!
 * I want the component to behave like an input ie accept refs and onChange handlers and respond as a standard
 * input would. To do this, I have a hidden input apply all the input props to (onChange included) and I forward
 * any refs to this input. Intutitively I should be able to update the value of the input from the component state
 * however, this does not trigger on change. As such, I have to treat the input as a native element, get the
 * global setter and call it on the input with the value. I then dispatch a real DOM change event and that triggers
 * the React handler, which hands back to my form lib or similar. It's adapted from this suggested workaround below:
 *  https://github.com/facebook/react/issues/11095#issuecomment-334305739  */
export const MultiSelectInput: MultiSelectInputWrapped = forwardRef(
  (
    { className, options, defaultValues, noneSelectedLabel, id, ...rest },
    ref: React.ForwardedRef<React.InputHTMLAttributes<HTMLInputElement>>,
  ) => {
    const [selectedOptionValues, setSelectedOptionValues] = useState<string[]>(defaultValues ?? [])
    const [selectedDefaultValues, setSelectedDefaultValues] = useState<string[]>(defaultValues ?? [])

    useEffect(handleSetNativeInput(id, selectedOptionValues), [selectedOptionValues])

    useEffect(
      handleResetDefaultValues(setSelectedOptionValues, setSelectedDefaultValues, defaultValues, selectedDefaultValues),
      [defaultValues],
    )

    return (
      <ElMultiSelectInputWrapper>
        <ElMultiSelectInput id={id} {...rest} ref={(ref as unknown) as LegacyRef<HTMLInputElement>} />
        <MultiSelectSelected className={className}>
          {selectedOptionValues.length ? (
            options.map((option) => {
              return selectedOptionValues.includes(option.value) ? (
                <MultiSelectChip
                  onChange={handleSelectedOptions(option.value, selectedOptionValues, setSelectedOptionValues)}
                  key={option.value}
                  defaultChecked
                >
                  {option.name}
                </MultiSelectChip>
              ) : null
            })
          ) : (
            <>
              <Icon className={elMl2} icon="selectInfographic" iconSize="medium" />
              <p>{noneSelectedLabel ? noneSelectedLabel : 'Please select from the options below'}</p>
            </>
          )}
        </MultiSelectSelected>
        {selectedOptionValues.length < options.length && (
          <MultiSelectUnSelected className={className}>
            {options.map((option) => {
              return !selectedOptionValues.includes(option.value) ? (
                <MultiSelectChip
                  className={elHasGreyChips}
                  onChange={handleSelectedOptions(option.value, selectedOptionValues, setSelectedOptionValues)}
                  key={option.value}
                  defaultChecked={false}
                >
                  {option.name}
                </MultiSelectChip>
              ) : null
            })}
          </MultiSelectUnSelected>
        )}
      </ElMultiSelectInputWrapper>
    )
  },
)
