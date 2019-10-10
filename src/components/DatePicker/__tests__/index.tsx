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
  it('should map value correctly from textbox to formik', (done) => {
    const submitCallback = jest.fn()
    const wrapper = mount(
      <Formik
        initialValues={{ test: '1997-11-20T17:00:00' }}
        onSubmit={submitCallback}
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
    input.simulate('change', {
      target: {
        value: '22/11/1997'
      }
    })

    // onChange
    const form = wrapper.find('form') 
    form.simulate('submit')

    setTimeout(() => {
      expect(submitCallback.mock.calls[0][0]).toMatchObject({test: '1997-11-22T00:00:00'})
      done()
    }, 1);
  })

  it('should map value correctly from formik to text box', done => {
    const wrapper = mount(
      <Formik
        initialValues={{ test: '1997-11-20T17:00:00' }}
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
    expect(input.props().value).toBe('20/11/1997')
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
