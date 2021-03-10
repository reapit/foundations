import * as React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import { Checkbox, CheckboxProps } from '.'
import { Form, Formik } from 'formik'

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  // NOTE: this component doesn't work without Formik, so it's purely a react component.
  // How do we want to show the CSS part of it?
  decorators: [
    (Story: Story) => (
      <Formik
        initialValues={{ checkboxA: 0, checkboxB: 1 }}
        onSubmit={(values) => {
          action('Form Values' + values)
        }}
      >
        <Form>
          <div className="column is-half-desktop">
            <Story />
          </div>
        </Form>
      </Formik>
    ),
  ],
}

export const Primary: Story<CheckboxProps> = () => (
  <Checkbox name="checkboxA" id="checkboxA" labelText="Checkbox A" value="checkboxA" />
)

export const UseAsGroup: Story<CheckboxProps> = () => (
  <>
    <Checkbox name="checkboxA" id="checkboxA" labelText="Checkbox A" value="checkboxA" />
    <Checkbox name="checkboxB" id="checkboxB" labelText="Checkbox B" value="checkboxB" />
  </>
)
UseAsGroup.args = {
  name: 'checkboxGroup',
}
