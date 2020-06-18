import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { ImageCropper, generateBase64FromCanvas, ImageCropperWithInput } from './index'
import { action } from '@storybook/addon-actions'
import { ImageInput } from '../ImageInput'
import { Button } from '../Button'
import { Form, Formik } from 'formik'

storiesOf('ImageCropper', module).add('Integrate with ImageInput', () => {
  return (
    <section className="section">
      <Formik
        initialValues={{ imageInput: '' }}
        onSubmit={values => {
          console.log(values.imageInput)
        }}
      >
        {() => (
          <Form>
            <ImageCropperWithInput />
          </Form>
        )}
      </Formik>
    </section>
  )
})
