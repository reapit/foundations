import React from 'react'
import { shallow, mount } from 'enzyme'
import RadioSelect from '../index'
import { Formik, Form } from 'formik'

describe('RadioSelect', () => {
  it('should match snapshot', () => {
    const mockProps = {
      name: 'mockName',
      labelText: 'mockLabelText',
      id: 'mockId',
      dataTest: 'mockDatatest',
      options: [{ label: 'label', value: 'value' }, { label: 'label1', value: 'value1' }]
    }
    const wrapper = shallow(<RadioSelect {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should work when integrating with Formik', () => {
    const mockProps = {
      name: 'mockName',
      labelText: 'mockLabelText',
      id: 'mockId',
      dataTest: 'mockDatatest',
      options: [{ label: 'label', value: 'value' }, { label: 'label1', value: 'value1' }]
    }
    const wrapper = mount(
      <Formik
        initialValues={{ username: '' }}
        onSubmit={jest.fn()}
        render={() => (
          <Form>
            <RadioSelect {...mockProps} />
          </Form>
        )}
      />
    )
    expect(wrapper.find('label')).toHaveLength(1)
    expect(wrapper.find('input')).toHaveLength(2)
  })
})
