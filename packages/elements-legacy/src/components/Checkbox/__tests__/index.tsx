import * as React from 'react'
import { render } from '../../../tests/react-testing'
import { Checkbox, CheckboxProps, handleOnCheckboxChange } from '../index'
import { Formik, Form } from 'formik'
import toJson from 'enzyme-to-json'

const props: CheckboxProps = {
  id: 'test',
  name: 'test',
  labelText: 'Test checkbox',
}

describe('Checkbox', () => {
  it('should match a snapshot', () => {
    expect(toJson(render(<Checkbox {...props} />))).toMatchSnapshot()
  })

  it('should work when integrating with Formik', () => {
    const wrapper = render(
      <Formik initialValues={{ test: false }} onSubmit={jest.fn()}>
        {() => (
          <Form>
            <Checkbox {...props} />
          </Form>
        )}
      </Formik>,
    )
    expect(wrapper.find('label')).toHaveLength(1)
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
