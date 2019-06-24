import * as React from 'react'
import { shallow, mount } from 'enzyme'
import Input, { InputProps } from '../input'
import { Formik, Form } from 'formik'
import toJson from 'enzyme-to-json'

const props: InputProps = {
  id: 'username',
  name: 'username',
  label: 'User name',
  type: 'text'
}

describe('Input', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<Input {...props} />))).toMatchSnapshot()
  })

  it('should work when integrating with Formik', () => {
    const wrapper = mount(
      <Formik
        initialValues={{ username: '' }}
        onSubmit={jest.fn()}
        render={() => (
          <Form>
            <Input {...props} />
          </Form>
        )}
      />
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
