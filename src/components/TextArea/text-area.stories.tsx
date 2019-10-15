import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { TextArea } from '.'
import { Form, Formik } from 'formik'

storiesOf('TextArea', module).add('Primary', () => (
  <section className="section">
    <Formik
      initialValues={{ primary: '', isDanger: '' }}
      onSubmit={values => {
        action('Form Values' + values)
      }}
      render={() => (
        <Form>
          <div className="column is-half-desktop">
            <TextArea id="text" placeholder="Some text here" name="primary" labelText="Primary" />
          </div>
        </Form>
      )}
    />
  </section>
))
