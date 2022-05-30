import React from 'react'
import { render } from '../../../tests/react-testing'
import RadioSelect, { renderAdditionalField } from '../index'
import { Formik, Form, FormikValues, FormikProps } from 'formik'

describe('RadioSelect', () => {
  it('should match snapshot', () => {
    const mockProps = {
      name: 'mockName',
      labelText: 'mockLabelText',
      id: 'mockId',
      dataTest: 'mockDatatest',
      options: [
        { label: 'label', value: 'value' },
        { label: 'label1', value: 'value1' },
      ],
    }
    const wrapper = render(<RadioSelect setFieldValue={jest.fn()} state={'value'} {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should work when integrating with Formik', () => {
    const mockProps = {
      name: 'mockName',
      labelText: 'mockLabelText',
      id: 'mockId',
      dataTest: 'mockDatatest',
      options: [
        { label: 'label', value: 'value' },
        { label: 'label1', value: 'value1' },
      ],
    }
    const wrapper = render(
      <Formik initialValues={{ username: '' } as FormikValues} onSubmit={jest.fn()}>
        {({ setFieldValue, values }) => (
          <Form>
            <RadioSelect setFieldValue={setFieldValue} state={values[mockProps.name]} {...mockProps} />
          </Form>
        )}
      </Formik>,
    )
    expect(wrapper.find('label')).toHaveLength(3)
    expect(wrapper.find('input')).toHaveLength(2)
  })
})

describe('renderAdditionalField', () => {
  it('should run correctly', () => {
    const additionalField = jest.fn()
    const form = {} as FormikProps<any>
    renderAdditionalField(additionalField, form)
    expect(additionalField).toBeCalledWith(form)
  })
})
