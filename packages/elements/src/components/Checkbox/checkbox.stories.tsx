import * as React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import { Checkbox, CheckboxProps } from '.'
import { Form, Formik } from 'formik'
import { Section } from '@/components/Layout'

export default {
  title: 'Rereshed-Docs/Checkbox',
  component: Checkbox,
  // NOTE: this component doesn't work without Formik, so it's purely a react component.
  // How do we want to show the CSS part of it?
  decorators: [
    (Story: Story) => (
      <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
        <Formik
          initialValues={{ checked: 0 }}
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
      </Section>
    ),
  ],
}

export const Primary: Story<CheckboxProps> = (args) => <Checkbox {...args} />
Primary.args = {
  id: 'checked',
  name: 'checked',
  labelText: 'Checkbox',
}

export const UseAsGroup: Story<CheckboxProps> = (args) => (
  <>
    <Checkbox {...args} id="checkboxA" labelText="Checkbox A" value="checkboxA" />
    <Checkbox {...args} id="checkboxB" labelText="Checkbox B" value="checkboxB" />
  </>
)
UseAsGroup.args = {
  name: 'checkboxGroup',
}
