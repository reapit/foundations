import * as React from 'react'
import { shallow } from 'enzyme'
import { FieldProps, FieldInputProps, FieldMetaProps } from 'formik'
import { TextAreaEditor, TextAreaEditorProps, handleTextAreaOnChange, renderTextAreaEditor } from '../index'

const props: TextAreaEditorProps = {
  id: 'username',
  name: 'username',
  labelText: 'User name',
  placeholder: 'enter your name here',
}

describe('TextAreaEditor', () => {
  it('should match a snapshot', () => {
    expect(shallow(<TextAreaEditor {...props} />)).toMatchSnapshot()
  })
  describe('onChange', () => {
    const mockField = {
      onChange: jest.fn(),
      onBlur: jest.fn(),
      name: '123',
      value: '1',
    } as FieldInputProps<string>
    const fn = handleTextAreaOnChange({ field: mockField })
    fn('<div></div>')
    expect(mockField.onChange).toBeCalledWith({ target: { value: '<div></div>', name: '123' } })
  })
  describe('renderTextAreaEditor', () => {
    it('should match snapshot', () => {
      const mockProps = {
        labelText: 'mockLabel',
        id: '123',
        placeholder: 'mockPlaceholder',
      }
      const fn = renderTextAreaEditor(mockProps)
      const mockField = {
        name: '123',
        value: '1',
      } as FieldInputProps<string>
      const mockMeta = {
        touched: true,
        errors: '123',
        value: '123',
        initialValue: '123',
        initialTouched: false,
        initialError: '',
      } as FieldMetaProps<string>
      const component = fn({ field: mockField, meta: mockMeta } as FieldProps<string>)
      const wrapper = shallow(<div>{component}</div>)
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot', () => {
      const mockProps = {
        labelText: 'mockLabel',
        id: '123',
        placeholder: 'mockPlaceholder',
      }
      const fn = renderTextAreaEditor(mockProps)
      const mockField = {
        name: '123',
      } as FieldInputProps<string>
      const mockMeta = {
        touched: false,
        errors: '',
        value: '123',
        initialValue: '123',
        initialTouched: false,
        initialError: '',
      } as FieldMetaProps<string>
      const component = fn({ field: mockField, meta: mockMeta } as FieldProps<string>)
      const wrapper = shallow(<div>{component}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
