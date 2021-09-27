import React, { ChangeEvent } from 'react'
import { shallow } from 'enzyme'
import { MultiSelectChip, MultiSelect, MultiSelectInput, handleSetNativeInput, handleSelectedOptions } from '../index'

describe('MultiSelectChip', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = shallow(
      <MultiSelectChip id="test-id">
        <span>Some Value</span>
      </MultiSelectChip>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('MultiSelect', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = shallow(
      <MultiSelect>
        <span>Some Value</span>
      </MultiSelect>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('MultiSelectInput', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = shallow(
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
