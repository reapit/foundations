import * as React from 'react'
import { render } from '../../../tests/react-testing'
import { FieldInputProps, Formik } from 'formik'
import {
  TextAreaEditor,
  TextAreaEditorProps,
  handleTextAreaOnChange,
  handleTextAreaOnBlur,
  handleTextAreaOnPaste,
} from '../index'

const props: TextAreaEditorProps = {
  id: 'username',
  name: 'username',
  labelText: 'User name',
  placeholder: 'enter your name here',
}

describe('TextAreaEditor', () => {
  it('should match a snapshot', () => {
    expect(
      render(
        <Formik onSubmit={jest.fn()} initialValues={{}}>
          {() => <TextAreaEditor {...props} />}
        </Formik>,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot when required', () => {
    expect(
      render(
        <Formik onSubmit={jest.fn()} initialValues={{}}>
          {() => <TextAreaEditor {...props} required />}
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

  describe('handleTextAreaOnPaste', () => {
    afterAll(() => {
      Object.defineProperty(document, 'queryCommandSupported', {
        value: jest.fn(() => true),
        writable: true,
      })
    })
    const eventMock = {
      stopPropagation: jest.fn(),
      preventDefault: jest.fn(),
      clipboardData: { getData: jest.fn(() => 'copiedText') },
    } as any

    it('should call execCommand insertText with correct plaintext if supported', () => {
      const fn = handleTextAreaOnPaste()
      fn(eventMock)
      const spy = jest.spyOn(document, 'execCommand')
      expect(spy).toHaveBeenCalledWith('insertText', false, 'copiedText')
    })

    it('should call execCommand paste with correct plaintext if not supported', () => {
      Object.defineProperty(document, 'queryCommandSupported', {
        value: jest.fn(() => false),
        writable: true,
      })
      const fn = handleTextAreaOnPaste()
      fn(eventMock)
      const spy = jest.spyOn(document, 'execCommand')
      expect(spy).toHaveBeenCalledWith('paste', false, 'copiedText')
    })
    it('should fallback to window.clipboardData if not supported', () => {
      Object.defineProperty(window, 'clipboardData', {
        value: { getData: jest.fn(() => 'copiedText') },
        writable: true,
      })
      const eventMock = {
        stopPropagation: jest.fn(),
        preventDefault: jest.fn(),
      } as any
      const spy = jest.spyOn((window as any).clipboardData, 'getData')
      const fn = handleTextAreaOnPaste()
      fn(eventMock)
      expect(spy).toHaveBeenCalledWith('Text')
    })
  })
})
