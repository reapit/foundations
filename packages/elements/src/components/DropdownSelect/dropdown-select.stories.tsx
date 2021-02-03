import * as React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { Form, Formik } from 'formik'
import { DropdownSelect, DropdownSelectProps } from '.'
import { Section } from '@/components/Layout'
import { options } from './__stubs__/options'

export default {
  title: 'Rereshed-Docs/DropdownSelect',
  component: DropdownSelect,
  // NOTE: this component doesn't work without Formik, so it's purely a react component. How do we want to show the CSS part of it?
  decorators: [
    (Story: Story) => (
      <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
        <Formik initialValues={{ desktopTypes: [] }} onSubmit={() => {}}>
          <Form>
            <Story />
          </Form>
        </Formik>
      </Section>
    ),
  ],
}

export const ModeTags: Story<DropdownSelectProps> = args => <DropdownSelect {...args} />
ModeTags.args = {
  mode: 'tags',
  id: 'desktopTypes',
  placeholder: 'Please select',
  name: 'desktopTypes',
  labelText: 'Dropdown Select',
  options,
}
ModeTags.parameters = {
  docs: {
    description: {
      story: 'In this mode, you can create your own tags by typing in the tag name',
    },
  },
}

export const ModeMultiple: Story<DropdownSelectProps> = args => <DropdownSelect {...args} />
ModeMultiple.args = {
  mode: 'multiple',
  id: 'desktopTypes',
  placeholder: 'Please select',
  name: 'desktopTypes',
  labelText: 'Dropdown Select',
  options,
}
ModeMultiple.parameters = {
  docs: {
    description: {
      story: 'In this mode, you can only select tags that exist in options props',
    },
  },
}
