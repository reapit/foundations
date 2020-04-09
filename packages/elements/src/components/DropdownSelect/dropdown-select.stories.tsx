import React from 'react'
import { Form, Formik } from 'formik'

import { storiesOf } from '@storybook/react'
import { DropdownSelect } from '.'
import { action } from '@storybook/addon-actions'

const options = [
  { value: 'jack', label: 'Jack' },
  { value: 'lucy', label: 'Lucy' },
  { value: 'yiminghe', label: 'Yiminghe' },
]

storiesOf('DropdownSelect', module).add('Primary', () => {
  return (
    <section className="section">
      <Formik
        initialValues={{ value: '' }}
        onSubmit={values => {
          action('Form Values' + values)
        }}
      >
        <Form>
          <DropdownSelect name="dropdown-select-field" mode="tags" labelText="Dropdown Select" options={options} />
        </Form>
      </Formik>
    </section>
  )
})
