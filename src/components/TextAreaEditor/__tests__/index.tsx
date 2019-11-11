import * as React from 'react'
import { shallow } from 'enzyme'
import { TextAreaEditor, TextAreaEditorProps, handleOnChange, renderForm } from '../index'
import toJson from 'enzyme-to-json'

const props: TextAreaEditorProps = {
  id: 'username',
  name: 'username',
  labelText: 'User name',
  placeholder: 'enter your name here'
}

describe('TextAreaEditor', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<TextAreaEditor {...props} />))).toMatchSnapshot()
  })
  describe('onChange', () => {
    const mockField = {
      onChange: jest.fn()
    }
    const fn = handleOnChange({ field: mockField, name: '' })
    fn('<div></div>')
    expect(mockField.onChange).toBeCalledWith({ target: { value: '<div></div>', name: '' } })
  })
  describe('renderForm', () => {
    it('should match snapshot', () => {
      const mockProps = {
        labelText: 'mockLabel',
        id: '123',
        placeholder: 'mockPlaceholder'
      }
      const fn = renderForm(mockProps)
      const mockField = {
        field: {
          name: '123'
        }
      }
      const mockForm = {
        touched: ['123'],
        errors: ['123']
      }
      const component = fn({ field: mockField, form: mockForm })
      const wrapper = shallow(<div>{component}</div>)
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot', () => {
      const mockProps = {
        labelText: 'mockLabel',
        id: '123',
        placeholder: 'mockPlaceholder'
      }
      const fn = renderForm(mockProps)
      const mockField = {
        field: {
          name: '123'
        }
      }
      const mockForm = {
        touched: [],
        errors: ['123']
      }
      const component = fn({ field: mockField, form: mockForm })
      const wrapper = shallow(<div>{component}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
