import * as React from 'react'
import { shallow, mount } from 'enzyme'
import { DatePicker, DatePickerProps } from '../index'
import { Formik, Form } from 'formik'
import toJson from 'enzyme-to-json'

const props: DatePickerProps = {
  name: 'abc',
  labelText: 'abc',
  id: '123'
}

describe('Checkbox', () => {
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

  afterEach(() => {
    jest.resetAllMocks()
  })
})
