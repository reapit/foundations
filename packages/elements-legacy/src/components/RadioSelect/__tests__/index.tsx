import React from 'react'
import { render } from '@testing-library/react'
import RadioSelect, { renderAdditionalField } from '../index'
import { Formik, FormikProps } from 'formik'

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
    const wrapper = render(
      <Formik
        initialValues={{}}
        onSubmit={jest.fn()}
        render={() => <RadioSelect setFieldValue={jest.fn()} state={'value'} {...mockProps} />}
      />,
    )
    expect(wrapper).toMatchSnapshot()
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
