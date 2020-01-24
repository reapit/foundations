import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Form, Formik } from 'formik'
import { Input } from '../../components/Input'
import { setQueryParams } from './query-params'

storiesOf('QueryParams', module).add('Primary', () => {
  return (
    <section className="section">
      <Formik
        initialValues={{ name: '', address: '', phone: '' }}
        onSubmit={values => {
          action('Form Values' + values)
        }}
        render={({ values }) => {
          const result = setQueryParams(values)
          return (
            <>
              <Form>
                <div className="column is-half-desktop">
                  <Input type="text" name="name" id="name" labelText="Name" />
                  <Input type="text" name="address" id="address" labelText="Address" />
                  <Input type="text" name="phone" id="phone" labelText="Phone" />
                </div>
              </Form>
              <p>Result function setQueryParams: {result || null}</p>
            </>
          )
        }}
      />
    </section>
  )
})
