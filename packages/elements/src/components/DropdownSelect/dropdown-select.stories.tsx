import React from 'react'
import { Form, Formik } from 'formik'

import { storiesOf } from '@storybook/react'
import { DropdownSelect } from '.'
import { action } from '@storybook/addon-actions'
import { options } from './__stubs__/options'

storiesOf('DropdownSelect', module).add('Primary', () => {
  return (
    <section className="section">
      <Formik
        initialValues={{ desktopTypes: [] }}
        onSubmit={values => {
          action('Form Values' + values)
        }}
      >
        <Form>
          <DropdownSelect
            id="desktopTypes"
            placeholder="Please select"
            name="desktopTypes"
            labelText="Dropdown Select"
            options={options}
          />
        </Form>
      </Formik>
    </section>
  )
})
