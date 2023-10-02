import React, { forwardRef, InputHTMLAttributes, LegacyRef, RefAttributes, useEffect, useState } from 'react'
import {
  ElMultiSelectInput,
  ElMultiSelectInputWrapper,
  FlexContainer,
  InputGroup,
  elMb5,
  MultiSelectChip,
  MultiSelectSelected,
  handleResetDefaultValues,
  handleSelectedOptions,
  handleSetNativeInput,
  MultiSelectInputProps,
} from '@reapit/elements'

export type FreeformMultiSelectInputWrapped = React.ForwardRefExoticComponent<
  Omit<MultiSelectInputProps, 'options'> & RefAttributes<InputHTMLAttributes<HTMLInputElement>>
>

/** This looks like I have had a bit of a meltdown but promise it makes sense!
 * I want the component to behave like an input ie accept refs and onChange handlers and respond as a standard
 * input would. To do this, I have a hidden input apply all the input props to (onChange included) and I forward
 * any refs to this input. Intutitively I should be able to update the value of the input from the component state
 * however, this does not trigger on change. As such, I have to treat the input as a native element, get the
 * global setter and call it on the input with the value. I then dispatch a real DOM change event and that triggers
 * the React handler, which hands back to my form lib or similar. It's adapted from this suggested workaround below:
 *  https://github.com/facebook/react/issues/11095#issuecomment-334305739  */
export const FreeformMultiSelectInput: FreeformMultiSelectInputWrapped = forwardRef(
  (
    { className, defaultValues, noneSelectedLabel, id, ...rest },
    ref: React.ForwardedRef<React.InputHTMLAttributes<HTMLInputElement>>,
  ) => {
    const [inputValue, setInputValue] = useState('')
    const [selectedOptionValues, setSelectedOptionValues] = useState<string[]>(defaultValues ?? [])
    const [selectedDefaultValues, setSelectedDefaultValues] = useState<string[]>(defaultValues ?? [])

    useEffect(handleSetNativeInput(id, selectedOptionValues), [selectedOptionValues])

    useEffect(
      handleResetDefaultValues(setSelectedOptionValues, setSelectedDefaultValues, defaultValues, selectedDefaultValues),
      [defaultValues],
    )

    return (
      <>
        <FlexContainer className={elMb5} isFlexAlignCenter isFlexJustifyBetween isFlexWrap>
          <InputGroup
            onChange={(e) => setInputValue(e.currentTarget.value)}
            value={inputValue}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                e.stopPropagation()
                setSelectedOptionValues([...selectedOptionValues, inputValue])
                setInputValue('')
              }
            }}
            label="Semi-structured Fields"
            placeholder="Type and press enter to add a field"
          />
        </FlexContainer>
        <ElMultiSelectInputWrapper>
          <ElMultiSelectInput id={id} {...rest} ref={ref as unknown as LegacyRef<HTMLInputElement>} />
          <MultiSelectSelected className={className}>
            {selectedOptionValues.length ? (
              selectedOptionValues.map((option) => (
                <MultiSelectChip
                  onChange={handleSelectedOptions(option, selectedOptionValues, setSelectedOptionValues)}
                  key={option}
                  defaultChecked
                >
                  {option}
                </MultiSelectChip>
              ))
            ) : (
              <>
                <p>
                  {noneSelectedLabel
                    ? noneSelectedLabel
                    : 'Please enter a semi-structured field name above, then press enter.'}
                </p>
              </>
            )}
          </MultiSelectSelected>
        </ElMultiSelectInputWrapper>
      </>
    )
  },
)
