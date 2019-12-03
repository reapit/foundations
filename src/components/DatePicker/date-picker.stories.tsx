import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { DatePicker } from '.'
import { Form, Formik } from 'formik'

storiesOf('DatePicker', module)
  .add('Primary', () => (
    <section className="section">
      <Formik
        initialValues={{ demo: '' }}
        onSubmit={values => {
          action('Form Values' + values)
        }}
      >
        {() => (
          <Form>
            <div className="column is-half-desktop">
              <DatePicker name="demo" labelText="demo" id="demo" />
            </div>
          </Form>
        )}
      </Formik>
    </section>
  ))
  .add('Date Picker - Empty', () => (
    <section className="section">
      <Formik
        initialValues={{ demo: '' }}
        onSubmit={values => {
          action('Form Values' + values)
        }}
      >
        {() => (
          <Form>
            <div className="column is-half-desktop">
              <DatePicker name="demo" labelText="demo" id="demo" />
            </div>
          </Form>
        )}
      </Formik>
    </section>
  ))
  .add('Date Picker - Error', () => {
    const Parent = () => {
      return (
        <section className="section">
          <Formik
            validate={() => {
              return {
                demo: 'error'
              }
            }}
            initialValues={{ demo: new Date() }}
            onSubmit={values => {
              action('Form Values' + values)
            }}
          >
            {() => (
              <Form>
                <div className="column is-half-desktop">
                  <DatePicker name="demo" labelText="Demo" id="test" />
                </div>
              </Form>
            )}
          </Formik>
        </section>
      )
    }

    return <Parent />
  })
