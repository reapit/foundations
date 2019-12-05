import * as React from 'react'
import { shallow, mount } from 'enzyme'
import { Input, InputProps, requiredValidate } from '../index'
import { Formik, Form } from 'formik'
import toJson from 'enzyme-to-json'
import { FaSearch } from 'react-icons/fa'
import { fieldValidateRequire } from '../../../utils/validators'

const props: InputProps = {
  id: 'username',
  name: 'username',
  labelText: 'User name',
  type: 'text'
}

const hasRightIconInputProps: InputProps = {
  id: 'username',
  name: 'username',
  labelText: 'User name',
  type: 'text',
  rightIcon: <FaSearch />
}

const requiredInputProps: InputProps = {
  id: 'username',
  name: 'username',
  labelText: 'User name',
  type: 'text',
  required: true
}

describe('Input', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<Input {...props} />))).toMatchSnapshot()
  })

  it('should match a snapshot with right icon', () => {
    expect(toJson(shallow(<Input {...hasRightIconInputProps} />))).toMatchSnapshot()
  })

  it('should match a snapshot if field is required', () => {
    expect(toJson(shallow(<Input {...requiredInputProps} />))).toMatchSnapshot()
  })

  it('should work when integrating with Formik', () => {
    const wrapper = mount(
      <Formik initialValues={{ username: '' }} onSubmit={jest.fn()}>
        {() => (
          <Form>
            <Input {...props} />
          </Form>
        )}
      </Formik>
    )
    expect(wrapper.find('label')).toHaveLength(1)
    wrapper.find('input').simulate('change', {
      target: {
        value: 'abcxyz',
        name: 'username'
      }
    })
    expect(wrapper.find('input').prop('value')).toEqual('abcxyz')
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})

describe('requiredValidate', () => {
  it('should run correctly', () => {
    const value = '';
<<<<<<< HEAD
    expect(fieldValidateRequire(value)).toEqual('Required')
=======
    expect(requiredValidate(value)).toEqual('Required')
>>>>>>> [CLD-391] Implement required field in elements
  })
})