import * as React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'

import { CameraImageInput } from '.'
import { FileInputProps } from '../FileInput'
import { Form, Formik } from 'formik'

export default {
  title: 'Components/CameraImageInput',
  component: CameraImageInput,
}

export const Default: Story<FileInputProps> = (args) => (
  <Formik
    initialValues={{ imageInput: '' }}
    onSubmit={(values) => {
      action('Form Values' + values)
    }}
  >
    <Form>
      <div className="column is-half-desktop">
        <CameraImageInput {...args} />
      </div>
    </Form>
  </Formik>
)

Default.args = {
  name: 'imageInput',
  required: true,
  labelText: 'Image Input',
  id: 'imageInput',
  allowClear: true,
}
