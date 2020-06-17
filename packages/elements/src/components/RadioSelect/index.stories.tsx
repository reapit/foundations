import React from 'react'

import { storiesOf } from '@storybook/react'
import { RadioSelect } from '.'
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

storiesOf('RadioSelect', module)
  .add('Primary', () => {
    return (
      <section className="section">
        <Formik
          initialValues={{ [mockProps.name]: '' }}
          onSubmit={values => {
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
      </section>
    )
  })
  .add('Horizontal layout', () => {
    return (
      <section className="section">
        <Formik
          initialValues={{ [mockProps.name]: '' }}
          onSubmit={values => {
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
      </section>
    )
  })
  .add('Disabled', () => (
    <section className="section">
      <Formik
        initialValues={{ [mockProps.name]: '' }}
        onSubmit={values => {
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
    </section>
  ))
