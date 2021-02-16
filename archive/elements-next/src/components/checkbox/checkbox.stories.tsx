import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'

import { Checkbox, CheckboxProps } from './checkbox'
import { elFlex } from '@/base/flexbox'
import { elMr4 } from '@/base/spacing'

export default {
  title: 'Checkbox',
  component: Checkbox,
  args: {
    name: 'field_name',
    checked: false,
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
  checked: true,
  label: 'Checkbox',
}

const GroupTemplate: Story<CheckboxProps> = () => (
  <div className={elFlex}>
    <Checkbox className={elMr4} name="field_name" label="Option 1" value="option_1" />
    <Checkbox className={elMr4} name="field_name" label="Option 2" value="option_2" />
    <Checkbox className={elMr4} name="field_name" label="Option 3" value="option_3" />
    <Checkbox className={elMr4} name="field_name" label="Option 4" value="option_4" />
  </div>
)

export const UseAsGroup = GroupTemplate.bind({})
