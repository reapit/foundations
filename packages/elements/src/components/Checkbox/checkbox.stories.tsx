import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Checkbox } from '.'
import { Form, Formik } from 'formik'
import { Section } from '@/components/Layout'

storiesOf('Checkbox', module)
  .add('Primary', () => (
    <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
      <Formik
        initialValues={{ checked: 0 }}
        onSubmit={values => {
          action('Form Values' + values)
        }}
      >
        <Form>
          <div className="column is-half-desktop">
            <Checkbox id="checked" name="checked" labelText="Checkbox" />
          </div>
        </Form>
      </Formik>
    </Section>
  ))
  .add('Use as Group', () => (
    <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
      <Formik
        initialValues={{ checkboxGroup: ['checkboxA'] }}
        onSubmit={values => {
          console.log(values)
          action('Form Values' + values)
        }}
      >
        <Form>
          <div className="column is-half-desktop">
            <Checkbox name="checkboxGroup" id="checkboxA" labelText="Checkbox A" value="checkboxA" />
            <Checkbox name="checkboxGroup" id="checkboxB" labelText="Checkbox B" value="checkboxB" />
          </div>
        </Form>
      </Formik>
    </Section>
  ))
