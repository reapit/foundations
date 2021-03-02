import * as React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import { ImageInput, ImageInputProps } from '.'
import { Form, Formik } from 'formik'

export default {
  title: 'Rereshed-Docs/ImageInput',
  component: ImageInput,
}

export const Primary: Story<ImageInputProps> = (args) => (
  <Formik
    initialValues={{ imageInput: '' }}
    onSubmit={(values) => {
      action('Form Values' + values)
    }}
  >
    <Form>
      <div className="column is-half-desktop">
        <ImageInput {...args} />
      </div>
    </Form>
  </Formik>
)
Primary.args = {
  id: 'imageInput',
  allowClear: true,
  name: 'imageInput',
  labelText: 'Image Input',
}
