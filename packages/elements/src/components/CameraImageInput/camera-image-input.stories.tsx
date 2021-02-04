import * as React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'

import { CameraImageInput } from '.'
import { FileInputProps } from '../FileInput'
import { Form, Formik } from 'formik'
import { Section } from '@/components/Layout'

export default {
  title: 'Rereshed-Docs/CameraImageInput',
  component: CameraImageInput,
}

export const Default: Story<FileInputProps> = args => (
  <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
    <Formik
      initialValues={{ imageInput: '' }}
      onSubmit={values => {
        action('Form Values' + values)
      }}
    >
      <Form>
        <div className="column is-half-desktop">
          <CameraImageInput {...args} />
        </div>
      </Form>
    </Formik>
  </Section>
)

Default.args = {
  name: 'imageInput',
  required: true,
  labelText: 'Image Input',
  id: 'imageInput',
  allowClear: true,
}
