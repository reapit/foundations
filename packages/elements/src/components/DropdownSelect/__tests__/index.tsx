import * as React from 'react'
import { shallow, mount } from 'enzyme'
import { DropdownSelect, DropdownSelectProps } from '../index'
import { Formik, Form } from 'formik'
import toJson from 'enzyme-to-json'
import { options as mockOptions } from '../__stubs__/options'

const dropdownSelectProps: DropdownSelectProps = {
  name: 'demo',
  labelText: 'demo',
  options: mockOptions,
}

const createFormikWrapper = () => {
  const wrapper = mount(
    <Formik onSubmit={jest.fn()} initialValues={{ demo: 'b' }}>
      {() => (
        <Form>
          <div className="column is-half-desktop">
            <DropdownSelect name="demo" mode="tags" labelText="Demo" options={mockOptions} />
          </div>
        </Form>
      )}
    </Formik>,
  )

  return wrapper
}

describe('Dropdown-select', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<DropdownSelect {...dropdownSelectProps} />))).toMatchSnapshot()
  })

  it('Render label correctly', () => {
    const wrapper = createFormikWrapper()
    const label = wrapper.find('label').first()
    expect(label.text()).toBe('Demo')
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
