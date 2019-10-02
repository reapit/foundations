import * as React from 'react'
import { shallow, mount } from 'enzyme'
import { DatePicker, DatePickerProps } from '../index'
import { Formik, Form } from 'formik'
import toJson from 'enzyme-to-json'

jest.unmock('dayjs')

const props: DatePickerProps = {
  name: 'abc',
  labelText: 'abc',
  id: '123'
}

describe('Date-time picker', () => {
  it('should map value correctly to text box', done => {
    const wrapper = mount(
      <Formik
        initialValues={{ test: '11/20/1997' }}
        onSubmit={jest.fn()}
        render={() => {
          return (
            <Form>
              <DatePicker name="test" id="test" labelText="test" />
            </Form>
          )
        }}
      />
    )

    const input = wrapper.find('input')
    expect(input.props().value).toBe('11/20/1997')
    input.simulate('change', {
      target: {
        value: '1'
      }
    })

    // onChange
    setTimeout(() => {
      // Element found is just a snapshoot. Have to get a new snapshoot again.
      const input = wrapper.find('input')
      expect(input.props().value).toBe('1_/__/____')
      done()
    }, 1)
  })

  it('should match a snapshot', () => {
    expect(toJson(shallow(<DatePicker {...props} />))).toMatchSnapshot()
  })

  it('should work when integrating with Formik', () => {
    const wrapper = mount(
      <Formik
        initialValues={{ test: false }}
        onSubmit={jest.fn()}
        render={() => (
          <Form>
            <DatePicker {...props} />
          </Form>
        )}
      />
    )
    expect(wrapper.find('label')).toHaveLength(1)
  })
})
