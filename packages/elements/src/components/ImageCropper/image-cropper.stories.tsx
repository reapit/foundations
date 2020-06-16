import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Cropper from './image-cropper'
import { Form, Formik } from 'formik'

storiesOf('ImageCropper', module).add('Default', () => (
  <section className="section">
    <Formik
      initialValues={{ imageInput: '' }}
      onSubmit={values => {
        action('Form Values' + values)
      }}
    >
      {() => (
        <Form>
          <div className="column is-half-desktop">
            <Cropper />
          </div>
        </Form>
      )}
    </Formik>
  </section>
))
