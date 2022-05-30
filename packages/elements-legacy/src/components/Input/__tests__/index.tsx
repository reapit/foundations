import * as React from 'react'
import { render } from '../../../tests/react-testing'
import { Input, InputProps } from '../index'
import { Formik, Form } from 'formik'
import toJson from 'enzyme-to-json'
import { FaSearch } from 'react-icons/fa'
import { fieldValidateRequire } from '../../../utils/validators'
import { act } from 'react-dom/test-utils'

const props: InputProps = {
  id: 'username',
  name: 'username',
  labelText: 'User name',
  type: 'text',
}

const hasRightIconInputProps: InputProps = {
  id: 'username',
  name: 'username',
  labelText: 'User name',
  type: 'text',
  rightIcon: <FaSearch />,
}

const requiredInputProps: InputProps = {
  id: 'username',
  name: 'username',
  labelText: 'User name',
  type: 'text',
  required: true,
}

const helperTextComponentInputProps: InputProps = {
  id: 'username',
  name: 'username',
  labelText: 'User name',
  type: 'text',
  helperText: <b>Helper text</b>,
}

describe('Input', () => {
  it('should match a snapshot', () => {
    expect(toJson(render(<Input {...props} />))).toMatchSnapshot()
  })

  it('should match a snapshot with right icon', () => {
    expect(toJson(render(<Input {...hasRightIconInputProps} />))).toMatchSnapshot()
  })

  it('should match a snapshot if field is required', () => {
    expect(toJson(render(<Input {...requiredInputProps} />))).toMatchSnapshot()
  })

  it('should match a snapshot if helperText is a component', () => {
    expect(toJson(render(<Input {...helperTextComponentInputProps} />))).toMatchSnapshot()
  })

  it('should work when integrating with Formik', async () => {
    const wrapper = render(
      <Formik initialValues={{ username: '' }} onSubmit={jest.fn()}>
        {() => (
          <Form>
            <Input {...props} />
          </Form>
        )}
      </Formik>,
    )
    expect(wrapper.find('label')).toHaveLength(1)
    await act(async () => {
      wrapper.find('input').simulate('change', {
        target: {
          value: 'abcxyz',
          name: 'username',
        },
      })
    })
    wrapper.update()
    expect(wrapper.find('input').prop('value')).toEqual('abcxyz')
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})

describe('requiredValidate', () => {
  it('should run correctly', () => {
    const value = ''
    expect(fieldValidateRequire(value)).toEqual('Required')
  })
})
