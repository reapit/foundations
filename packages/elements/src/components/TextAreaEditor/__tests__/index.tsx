import * as React from 'react'
import { shallow } from 'enzyme'
import { FieldInputProps, Formik } from 'formik'
import { TextAreaEditor, TextAreaEditorProps, handleTextAreaOnChange, handleTextAreaOnBlur } from '../index'

const props: TextAreaEditorProps = {
  id: 'username',
  name: 'username',
  labelText: 'User name',
  placeholder: 'enter your name here',
}

describe('TextAreaEditor', () => {
  it('should match a snapshot', () => {
    expect(
      shallow(
        <Formik onSubmit={jest.fn()} initialValues={{}}>
          {() => <TextAreaEditor {...props} />}
        </Formik>,
      ),
    ).toMatchSnapshot()
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

  describe('handleTextAreaOnBlur', () => {
    it('should call setTouched', () => {
      const mockHelpers = { setTouched: jest.fn() } as any
      const spy = jest.spyOn(mockHelpers, 'setTouched')
      const fn = handleTextAreaOnBlur({ helpers: mockHelpers })
      fn()
      expect(spy).toHaveBeenCalledWith(true)
    })
  })
})
