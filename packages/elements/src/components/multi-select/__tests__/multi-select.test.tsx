import React, { ChangeEvent } from 'react'
import { render } from '../../../tests/react-testing'
import {
  MultiSelectChip,
  MultiSelect,
  MultiSelectInput,
  handleSetNativeInput,
  handleSelectedOptions,
  MultiSelectSelected,
  MultiSelectUnSelected,
  handleResetDefaultValues,
} from '../index'

describe('MultiSelectChip', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(
      <MultiSelectChip id="test-id">
        <span>Some Value</span>
      </MultiSelectChip>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('MultiSelect', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(
      <MultiSelect>
        <span>Some Value</span>
      </MultiSelect>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('MultiSelectSelected', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(
      <MultiSelectSelected>
        <span>Some Value</span>
      </MultiSelectSelected>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('MultiSelectUnSelected', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(
      <MultiSelectUnSelected>
        <span>Some Value</span>
      </MultiSelectUnSelected>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('MultiSelectInput', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(
      <MultiSelectInput
        id="react-example"
        options={[
          { name: 'Item one', value: 'item-one' },
          { name: 'Item two', value: 'item-two' },
          { name: 'Item three', value: 'item-three' },
        ]}
        defaultValues={['item-one']}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot and render non selected message where there are no selected items', () => {
    const wrapper = render(
      <MultiSelectInput
        id="react-example"
        noneSelectedLabel="No items selected"
        options={[
          { name: 'Item one', value: 'item-one' },
          { name: 'Item two', value: 'item-two' },
          { name: 'Item three', value: 'item-three' },
        ]}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('handleSetNativeInput', () => {
  it('should set the value of an input', () => {
    const id = 'some-id'
    const selectedOptionValues = ['some-value']
    const input = document.createElement('input')
    const testFunc = jest.fn()

    input.id = id
    document.body.appendChild(input)

    const curried = handleSetNativeInput(id, selectedOptionValues, testFunc)

    curried()

    expect(testFunc).toHaveBeenCalledWith(selectedOptionValues)
  })
})

describe('handleResetDefaultValues', () => {
  it('should allow the resetting of default values if they do not match', () => {
    const setSelectedOptionValues = jest.fn()
    const setSelectedDefaultValues = jest.fn()
    const defaultValues = ['someValue', 'someValue']
    const selectedDefaultValues = ['someValue', 'someOtherValue']

    const curried = handleResetDefaultValues(
      setSelectedOptionValues,
      setSelectedDefaultValues,
      defaultValues,
      selectedDefaultValues,
    )

    curried()

    expect(setSelectedOptionValues).toHaveBeenCalledWith(defaultValues)
    expect(setSelectedDefaultValues).toHaveBeenCalledWith(defaultValues)
  })

  it('should not allow the resetting of default values if they match', () => {
    const setSelectedOptionValues = jest.fn()
    const setSelectedDefaultValues = jest.fn()
    const defaultValues = ['someValue', 'someValue']
    const selectedDefaultValues = ['someValue', 'someValue']

    const curried = handleResetDefaultValues(
      setSelectedOptionValues,
      setSelectedDefaultValues,
      defaultValues,
      selectedDefaultValues,
    )

    curried()

    expect(setSelectedOptionValues).not.toHaveBeenCalled()
    expect(setSelectedDefaultValues).not.toHaveBeenCalled()
  })
})

describe('handleSelectedOptions', () => {
  it('should deselect an option', () => {
    const value = 'some-value'
    const selectedOptionValues = ['some-value']
    const setSelectedOptionValues = jest.fn()
    const event = {
      target: {
        checked: false,
      },
    } as ChangeEvent<HTMLInputElement>
    const curried = handleSelectedOptions(value, selectedOptionValues, setSelectedOptionValues)

    curried(event)

    expect(setSelectedOptionValues).toHaveBeenCalledWith([])
  })

  it('should select an option', () => {
    const value = 'some-value'
    const selectedOptionValues = []
    const setSelectedOptionValues = jest.fn()
    const event = {
      target: {
        checked: true,
      },
    } as ChangeEvent<HTMLInputElement>
    const curried = handleSelectedOptions(value, selectedOptionValues, setSelectedOptionValues)

    curried(event)

    expect(setSelectedOptionValues).toHaveBeenCalledWith(['some-value'])
  })
})
