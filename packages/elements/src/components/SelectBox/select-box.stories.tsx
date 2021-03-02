import React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { Form, Formik } from 'formik'
import { SelectBox, SelectBoxProps, SelectBoxOptions } from '.'
import { action } from '@storybook/addon-actions'

const mockedOptions: SelectBoxOptions[] = [
  { label: 'option1', value: 'a' },
  { label: 'option2', value: 'b' },
]

export default {
  title: 'Components/SelectBox',
  component: SelectBox,
  decorators: [
    (Story: Story) => (
      <Formik
        initialValues={{ demo: null }}
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

export const Primary: Story<SelectBoxProps> = (args) => <SelectBox {...args} />
Primary.args = {
  helpText: 'This is helper text',
  name: 'demo',
  options: mockedOptions,
  labelText: 'Demo',
  id: 'test',
}

export const Required: Story<SelectBoxProps> = (args) => <SelectBox {...args} />
Required.args = {
  required: true,
  name: 'demo',
  options: mockedOptions,
  labelText: 'Demo',
  id: 'test',
}
