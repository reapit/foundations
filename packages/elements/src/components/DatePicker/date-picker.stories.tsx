import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { DatePicker } from '.'
import { Form, Formik } from 'formik'
import { Section } from '@/components/Layout'

storiesOf('DatePicker', module)
  .add('Primary', () => (
    <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
      <Formik
        initialValues={{ demo: new Date() }}
        onSubmit={values => {
          action('Form Values' + values)
        }}
      >
        {() => (
          <Form>
            <div className="column is-half-desktop">
              <DatePicker name="demo" labelText="demo" id="demo" popperPlacement="top" />
            </div>
          </Form>
        )}
      </Formik>
    </Section>
  ))
  .add('Date Picker - Empty', () => (
    <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
      <Formik
        initialValues={{ demo: '' }}
        onSubmit={values => {
          action('Form Values' + values)
        }}
      >
        {() => (
          <Form>
            <div className="column is-half-desktop">
              <DatePicker name="demo" labelText="demo" id="demo" popperPlacement="top" />
            </div>
          </Form>
        )}
      </Formik>
    </Section>
  ))
  .add('Date Picker - Error', () => {
    const Parent = () => {
      return (
        <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
          <Formik
            initialValues={{ demo: '' }}
            onSubmit={values => {
              action('Form Values' + values)
            }}
          >
            {() => (
              <Form>
                <div className="column is-half-desktop">
                  <DatePicker required name="demo" labelText="Demo" id="test" />
                </div>
              </Form>
            )}
          </Formik>
        </Section>
      )
    }

    return <Parent />
  })
