import * as React from 'react'
import { shallow, mount } from 'enzyme'
import { TextArea, TextAreaProps } from '../index'
import { Formik, Form } from 'formik'
import toJson from 'enzyme-to-json'

const props: TextAreaProps = {
  id: 'username',
  name: 'username',
  labelText: 'User name',
}

describe('Input', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<TextArea {...props} />))).toMatchSnapshot()
  })

  it('should work when integrating with Formik', () => {
    const wrapper = mount(
      <Formik initialValues={{ username: '' }} onSubmit={jest.fn()}>
        {() => (
          <Form>
            <TextArea {...props} />
          </Form>
        )}
      </Formik>,
    )
    expect(wrapper.find('label')).toHaveLength(1)
    wrapper.find('textarea').simulate('change', {
      target: {
        value: 'abcxyz',
        name: 'username',
      },
    })
    expect(wrapper.find('textarea').prop('value')).toEqual('abcxyz')
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
