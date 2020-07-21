import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { CameraImageInput } from '.'
import { Form, Formik } from 'formik'
import { Section } from '@/components/Layout'

storiesOf('CameraImageInput', module).add('Primary', () => (
  <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
    <Formik
      initialValues={{ imageInput: '' }}
      onSubmit={values => {
        action('Form Values' + values)
      }}
    >
      {() => (
        <Form>
          <div className="column is-half-desktop">
            <CameraImageInput required id="imageInput" allowClear name="imageInput" labelText="Image Input" />
          </div>
        </Form>
      )}
    </Formik>
  </Section>
))
