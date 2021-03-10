import * as React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { Form, Formik } from 'formik'
import { DropdownSelect, DropdownSelectProps } from '.'
import { options } from './__stubs__/options'

export default {
  title: 'Components/DropdownSelect',
  component: DropdownSelect,
  // NOTE: this component doesn't work without Formik, so it's purely a react component.
  // How do we want to show the CSS part of it?
  decorators: [
    (Story: Story) => (
      <Formik initialValues={{ desktopTypes: [] }} onSubmit={() => {}}>
        <Form>
          <Story />
        </Form>
      </Formik>
    ),
  ],
}

export const CreateAndSelectTags: Story<DropdownSelectProps> = (args) => <DropdownSelect {...args} />
CreateAndSelectTags.args = {
  mode: 'tags',
  id: 'desktopTypes',
  placeholder: 'Please select',
  name: 'desktopTypes',
  labelText: 'Dropdown Select',
  options,
}
CreateAndSelectTags.parameters = {
  docs: {
    description: {
      story: 'In this mode, you can create your own tags by typing in the tag name',
    },
  },
}

export const SelectTagsOnly: Story<DropdownSelectProps> = (args) => <DropdownSelect {...args} />
SelectTagsOnly.args = {
  mode: 'multiple',
  id: 'desktopTypes',
  placeholder: 'Please select',
  name: 'desktopTypes',
  labelText: 'Dropdown Select',
  options,
}
SelectTagsOnly.parameters = {
  docs: {
    description: {
      story: 'In this mode, you can only select tags that exist in options props',
    },
  },
}
