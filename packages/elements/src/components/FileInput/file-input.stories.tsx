import * as React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { Form, Formik } from 'formik'
import { action } from '@storybook/addon-actions'
import { FileInput, FileInputProps } from '.'
import { Section } from '@/components/Layout'

export default {
  title: 'Rereshed-Docs/FileInput',
  component: FileInput,
  // NOTE: this component doesn't work without Formik, so it's purely a react component.
  // How do we want to show the CSS part of it?
  decorators: [
    (Story: Story) => (
      <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
        <Formik
          initialValues={{ fileInput: '' }}
          onSubmit={values => {
            action('Form Values' + values)
          }}
        >
          <Form>
            <Story />
          </Form>
        </Formik>
      </Section>
    ),
  ],
}

export const Primary: Story<FileInputProps> = args => <FileInput {...args} />
Primary.args = {
  id: 'fileInput',
  allowClear: true,
  name: 'fileInput',
  labelText: 'File Input',
}

export const Required: Story<FileInputProps> = args => <FileInput {...args} />
Required.args = {
  required: true,
  id: 'fileInput',
  allowClear: true,
  name: 'fileInput',
  labelText: 'File Input',
}

export const Disabled: Story<FileInputProps> = args => <FileInput {...args} />
Disabled.args = {
  id: 'fileInput',
  allowClear: true,
  name: 'fileInput',
  labelText: 'File Input',
  inputProps: { disabled: true },
}
