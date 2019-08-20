import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { FileInput } from '.'
import { Form, Formik } from 'formik'

storiesOf('form/FileInput', module).add('File Input', () => (
  <section className="section">
    <Formik
      initialValues={{ fileInput: '' }}
      onSubmit={values => {
        action('Form Values' + values)
      }}
      render={() => (
        <Form>
          <div className="column is-half-desktop">
            <FileInput id="fileInput" allowClear name="fileInput" labelText="File Input" />
          </div>
        </Form>
      )}
    />
  </section>
))
