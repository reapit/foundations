import React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { RadioSelect, RadioSelectProps } from '.'
import { Formik, Form } from 'formik'
import { action } from '@storybook/addon-actions'
import { Button } from '../Button'

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
        <div className="column is-half-desktop">
          <RadioSelect setFieldValue={setFieldValue} state={values[mockProps.name]} {...mockProps} />
        </div>
        <Button variant={'primary'} type={'submit'}>
          Submit
        </Button>
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
        <div className="column is-half-desktop">
          <RadioSelect isHorizontal setFieldValue={setFieldValue} state={values[mockProps.name]} {...mockProps} />
        </div>
        <Button variant={'primary'} type={'submit'}>
          Submit
        </Button>
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
