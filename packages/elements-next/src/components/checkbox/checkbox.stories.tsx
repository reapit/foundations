import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'

import { Checkbox, CheckboxProps } from './checkbox'

export default {
  title: 'Example/Checkbox',
  component: Checkbox,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta

const Template: Story<CheckboxProps> = args => <Checkbox {...args} />

export const Primary = Template.bind({})
Primary.args = {
  value: true,
  label: 'Checkbox',
}

export const Secondary = Template.bind({})
Secondary.args = {
  label: 'Checkbox',
}

export const Large = Template.bind({})
Large.args = {
  label: 'Checkbox',
}

export const Small = Template.bind({})
Small.args = {
  label: 'Checkbox',
}
