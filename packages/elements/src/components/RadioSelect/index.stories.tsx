import React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { RadioSelect, RadioSelectProps } from '.'
import { Formik, Form } from 'formik'
import { action } from '@storybook/addon-actions'

const mockProps = {
  name: 'mockName',
  labelText: 'Radio Button Group Label',
  id: 'mockId',
  dataTest: 'mockDatatest',
  options: [
    { label: 'Label 1', value: 'value' },
    { label: 'Label 2', value: 'value1' },
  ],
}

export default {
  title: 'Components/RadioSelect',
  component: RadioSelect,
}

export const Primary: Story<RadioSelectProps> = () => (
  <Formik
    initialValues={{ [mockProps.name]: '' }}
    onSubmit={(values) => {
      action('Form Values' + values)
      console.log(values)
    }}
  >
    {({ setFieldValue, values }) => (
      <Form>
        <RadioSelect setFieldValue={setFieldValue} state={values[mockProps.name]} {...mockProps} />
      </Form>
    )}
  </Formik>
)

export const HorizontalLayout: Story<RadioSelectProps> = () => (
  <Formik
    initialValues={{ [mockProps.name]: '' }}
    onSubmit={(values) => {
      action('Form Values' + values)
      console.log(values)
    }}
  >
    {({ setFieldValue, values }) => (
      <Form>
        <RadioSelect isHorizontal setFieldValue={setFieldValue} state={values[mockProps.name]} {...mockProps} />
      </Form>
    )}
  </Formik>
)

export const Disabled: Story<RadioSelectProps> = () => (
  <Formik
    initialValues={{ [mockProps.name]: '' }}
    onSubmit={(values) => {
      action('Form Values' + values)
      console.log(values)
    }}
  >
    {({ setFieldValue }) => (
      <Form>
        <RadioSelect disabled setFieldValue={setFieldValue} state={'value'} {...mockProps} />
      </Form>
    )}
  </Formik>
)
