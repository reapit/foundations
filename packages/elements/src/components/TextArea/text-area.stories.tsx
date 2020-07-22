import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { TextArea } from '.'
import { Form, Formik } from 'formik'
import { Section } from '@/components/Layout'

storiesOf('TextArea', module).add('Primary', () => (
  <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
    <Formik
      initialValues={{ primary: '', isDanger: '' }}
      onSubmit={values => {
        action('Form Values' + values)
      }}
    >
      {() => (
        <Form>
          <div className="column is-half-desktop">
            <TextArea id="text" placeholder="Some text here" name="primary" labelText="Primary" />
          </div>
        </Form>
      )}
    </Formik>
  </Section>
))
