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
  useState,
} from 'react'
import { cx } from '@linaria/core'
import {
  ElMultiSelectCheckbox,
  ElMultiSelect,
  ElMultiSelectLabel,
  ElMultiSelectInput,
  elHasGreyChips,
} from './__styles__/index'

export interface MultiSelectProps extends HTMLAttributes<HTMLDivElement> {}

export interface MultiSelectOption {
  value: string
  name: string
}

export interface MultiSelectInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  options: MultiSelectOption[]
  selectedOptions?: string[]
  hasGreyChips?: boolean
}

export type MultiSelectInputWrapped = React.ForwardRefExoticComponent<
  MultiSelectInputProps & RefAttributes<InputHTMLAttributes<HTMLInputElement>>
>

export interface MultiSelectChipProps extends HTMLAttributes<HTMLInputElement> {}

const setNativeInputValue = (element: HTMLElement, value: string | string[]) => {
  const valueSetter = Object.getOwnPropertyDescriptor(element, 'value')?.set
  const prototype = Object.getPrototypeOf(element)
  const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value')?.set

  if (valueSetter && valueSetter !== prototypeValueSetter) {
    prototypeValueSetter?.call(element, value)
  } else {
    valueSetter?.call(element, value)
  }
}

export const handleSelectedOptions = (
  selectedOption: string,
  selectedOptions: string[],
  setSelectedOptions: Dispatch<SetStateAction<string[]>>,
) => (event: ChangeEvent<HTMLInputElement>) => {
  const isChecked = event.target.checked
  const newIds = isChecked
    ? [...selectedOptions, selectedOption]
    : selectedOptions.filter((option) => option !== selectedOption)

  setSelectedOptions([...new Set(newIds)])
}

export const MultiSelectChip: FC<MultiSelectChipProps> = ({ className, children, id, ...rest }) => (
  <>
    <ElMultiSelectCheckbox id={id} type="checkbox" {...rest} />
    <ElMultiSelectLabel htmlFor={id} className={cx(className && className)}>
      {children}
    </ElMultiSelectLabel>
  </>
)

export const MultiSelect: FC<MultiSelectProps> = ({ className, children, ...rest }) => (
  <ElMultiSelect className={cx(className && className)} {...rest}>
    {children}
  </ElMultiSelect>
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
    { options, className, selectedOptions: defaultSelectedOptions, hasGreyChips, id, ...rest },
    ref: React.ForwardedRef<React.InputHTMLAttributes<HTMLInputElement>>,
  ) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>(defaultSelectedOptions ?? [])

    useEffect(() => {
      const input = document.getElementById(id)
      if (input) {
        setNativeInputValue(input, selectedOptions)
        const changeEvent = new Event('change', { bubbles: true })
        input.dispatchEvent(changeEvent)
      }
    }, [selectedOptions])

    return (
      <MultiSelect className={className}>
        <ElMultiSelectInput id={id} {...rest} ref={ref as LegacyRef<HTMLInputElement>} />
        {options.map((option) => (
          <MultiSelectChip
            className={cx(hasGreyChips && elHasGreyChips)}
            onChange={handleSelectedOptions(option.value, selectedOptions, setSelectedOptions)}
            key={option.value}
            id={option.value}
            defaultChecked={selectedOptions.includes(option.value)}
          >
            {option.name}
          </MultiSelectChip>
        ))}
      </MultiSelect>
    )
  },
)
