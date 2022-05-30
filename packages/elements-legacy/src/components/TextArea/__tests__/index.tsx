import * as React from 'react'
import { render } from '../../../tests/react-testing'
import { TextArea, TextAreaProps } from '../index'
import { Formik, Form } from 'formik'
import toJson from 'enzyme-to-json'
import { act } from 'react-dom/test-utils'

const props: TextAreaProps = {
  id: 'username',
  name: 'username',
  labelText: 'User name',
}

describe('Input', () => {
  it('should match a snapshot', () => {
    expect(toJson(render(<TextArea {...props} />))).toMatchSnapshot()
  })

  it('should match a snapshot when required', () => {
    expect(toJson(render(<TextArea {...props} required />))).toMatchSnapshot()
  })

  it('should work when integrating with Formik', async () => {
    const wrapper = render(
      <Formik initialValues={{ username: '' }} onSubmit={jest.fn()}>
        {() => (
          <Form>
            <TextArea {...props} />
          </Form>
        )}
      </Formik>,
    )
    expect(wrapper.find('label')).toHaveLength(1)
    await act(async () => {
      wrapper.find('textarea').simulate('change', {
        target: {
          value: 'abcxyz',
          name: 'username',
        },
      })
    })
    wrapper.update()
    expect(wrapper.find('textarea').prop('value')).toEqual('abcxyz')
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
