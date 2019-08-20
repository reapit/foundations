import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Checkbox } from '.'
import { Form, Formik } from 'formik'

storiesOf('form/Checkbox', module).add('Checkbox', () => (
  <section className="section">
    <Formik
      initialValues={{ checked: 0 }}
      onSubmit={values => {
        action('Form Values' + values)
      }}
      render={() => (
        <Form>
          <div className="column is-half-desktop">
            <Checkbox id="checked" name="checked" labelText="Checkbox" />
          </div>
        </Form>
      )}
    />
  </section>
))
