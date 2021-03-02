import * as React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import { Form, Formik } from 'formik'
import { DatePicker, DatePickerProps } from '.'
import { Section } from '@/components/Layout'

export default {
  title: 'Components/DatePicker',
  component: DatePicker,
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

export const Primary: Story<DatePickerProps> = (args) => (
  <Formik
    initialValues={{ demo: new Date() }}
    onSubmit={(values) => {
      action('Form Values' + values)
    }}
  >
    <Form>
      <div className="column is-half-desktop">
        <DatePicker {...args} />
      </div>
    </Form>
  </Formik>
)
Primary.args = {
  name: 'demo',
  labelText: 'demo',
  id: 'demo',
  popperPlacement: 'top',
}

// NOTE: in this story the component doesn't actually change at all, the only change is with the way Formik is set up
export const Empty: Story<DatePickerProps> = (args) => (
  <Formik
    initialValues={{ demo: '' }}
    onSubmit={(values) => {
      action('Form Values' + values)
    }}
  >
    {() => (
      <Form>
        <div className="column is-half-desktop">
          <DatePicker {...args} />
        </div>
      </Form>
    )}
  </Formik>
)
Empty.args = {
  name: 'demo',
  labelText: 'demo',
  id: 'demo',
  popperPlacement: 'top',
}

// NOTE: this story also doesn't demonstrate the DatePicker component, it demos the Formik wrapper
export const Error: Story<DatePickerProps> = (args) => (
  <Formik
    initialValues={{ demo: '' }}
    onSubmit={(values) => {
      action('Form Values' + values)
    }}
  >
    {() => (
      <Form>
        <div className="column is-half-desktop">
          <DatePicker {...args} />
        </div>
      </Form>
    )}
  </Formik>
)
Error.args = {
  name: 'demo',
  labelText: 'Demo',
  id: 'test',
  required: true,
}
