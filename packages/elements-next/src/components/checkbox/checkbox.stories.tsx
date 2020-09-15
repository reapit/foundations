import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'

import { Checkbox, CheckboxProps } from './checkbox'
import { elFlex } from '@/base/flexbox'
import { elMr4 } from '@/base/spacing'

export default {
  title: 'Checkbox',
  component: Checkbox,
  argTypes: {
    name: {
      name: 'name',
      required: true,
      description: 'This is name of the checkbox',
      control: 'text',
    },
    value: {
      name: 'value',
      required: false,
      description: 'This is value of the checkbox',
      control: 'boolean',
    },
    id: {
      name: 'id',
      required: false,
      description: 'This is id of the checkbox',
      control: 'text',
    },
    label: {
      name: 'label',
      required: false,
      description: 'This is label of the checkbox',
      control: 'text',
    },
    className: {
      name: 'className',
      required: false,
      description: 'This is checkbox className if you want to override',
    },
    disabled: {
      name: 'disabled',
      required: false,
      description: 'This is disabled for checkbox',
      control: 'boolean',
    },
  },
  args: {
    name: '',
    value: false,
    id: undefined,
    label: undefined,
    className: undefined,
    disabled: false,
    onChange: e => {
      console.log(e.target.checked)
    },
  },
} as Meta

const Template: Story<CheckboxProps> = args => <Checkbox {...args} />

export const UseAsSingle = Template.bind({})
UseAsSingle.args = {
  value: true,
  label: 'Checkbox',
}

const GroupTemplate: Story<CheckboxProps> = () => (
  <div className={elFlex}>
    <Checkbox className={elMr4} name="group" label="Option 1" value="Option 1" />
    <Checkbox className={elMr4} name="group" label="Option 2" value="Option 2" />
  </div>
)

export const UseAsGroup = GroupTemplate.bind({})
