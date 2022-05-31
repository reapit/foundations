import * as React from 'react'
import { render } from '@testing-library/react'
import { Checkbox, CheckboxProps, handleOnCheckboxChange } from '../index'
import { Formik } from 'formik'

const props: CheckboxProps = {
  id: 'test',
  name: 'test',
  labelText: 'Test checkbox',
}

describe('Checkbox', () => {
  it('should match a snapshot', () => {
    expect(
      render(<Formik initialValues={{}} onSubmit={jest.fn()} render={() => <Checkbox {...props} />} />),
    ).toMatchSnapshot()
  })

  describe('handleOnCheckboxChange', () => {
    it('should remove item', () => {
      const mockField = {
        value: ['1', '2'],
        name: 'mockName',
        multiple: true,
        checked: true,
        onChange: jest.fn(),
        onBlur: jest.fn(),
      }
      const fn = handleOnCheckboxChange({ field: mockField, value: '1' })
      fn()
      expect(mockField.onChange).toBeCalledWith({ target: { value: ['2'], name: 'mockName' } })
    })
    it('should add item', () => {
      const mockField = {
        value: ['2'],
        name: 'mockName',
        multiple: true,
        checked: true,
        onChange: jest.fn(),
        onBlur: jest.fn(),
      }
      const fn = handleOnCheckboxChange({ field: mockField, value: '1' })
      fn()
      expect(mockField.onChange).toBeCalledWith({ target: { value: ['2', '1'], name: 'mockName' } })
    })

    it('should add item', () => {
      const mockField = {
        value: '1',
        name: 'mockName',
        multiple: true,
        checked: true,
        onChange: jest.fn(),
        onBlur: jest.fn(),
      }
      const fn = handleOnCheckboxChange({ field: mockField, value: '1' })
      fn()
      expect(mockField.onChange).toBeCalledWith({ target: { value: false, name: 'mockName', checked: false } })
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
