import * as React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import { TextArea, TextAreaProps } from '.'
import { Form, Formik } from 'formik'
import { Section } from '@/components/Layout'

export default {
  title: 'Components/TextArea',
  component: TextArea,
  // NOTE: this component doesn't work without Formik, so it's purely a react component.
  // How do we want to show the CSS part of it?
  decorators: [
    (Story: Story) => (
      <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
        <Story />
      </Section>
    ),
  ],
}

export const Primary: Story<TextAreaProps> = (args) => (
  <Formik
    initialValues={{ primary: '', isDanger: '' }}
    onSubmit={(values) => {
      action('Form Values' + values)
    }}
  >
    <Form>
      <div className="column is-half-desktop">
        <TextArea {...args} />
      </div>
    </Form>
  </Formik>
)
Primary.args = {
  id: 'text',
  placeholder: 'Some text here',
  name: 'primary',
  labelText: 'Primary',
}
