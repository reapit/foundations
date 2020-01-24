import React from 'react'

import { storiesOf } from '@storybook/react'
import { TextAreaEditor } from '.'
import { Input } from '../Input'
import { Form, Formik } from 'formik'
import { Button } from '../Button'

const validate = values => {
  let errors = { description: '', text: '' }

  if (!values.description) {
    errors.description = 'Required'
  }
  if (!values.text) {
    errors.text = 'Required'
  }

  return errors
}

storiesOf('TextAreaEditor', module).add('Sample Form', () => (
  <section className="section">
    <Formik
      initialValues={{ description: '', text: '' }}
      onSubmit={values => {
        console.log('Form Values', values)
      }}
      validate={validate}
    >
      {() => (
        <Form>
          <div className="column is-half-desktop">
            <Input id="text" type="text" placeholder="Some text here" name="text" labelText="Text" />
            <TextAreaEditor id="description" name="description" placeholder="Some text here" labelText="Description" />
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  </section>
))
