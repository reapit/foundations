import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import { Button, ButtonProps } from './button'

export default {
  title: 'Button',
  component: Button,
} as Meta

const Template: Story<ButtonProps> = args => <Button {...args}>Text</Button>

export const Default = Template.bind({})
Default.args = {}

export const Primary = Template.bind({})
Primary.args = {
  variant: 'primary',
}

export const Secondary = Template.bind({})
Secondary.args = {
  variant: 'secondary',
}

export const Danger = Template.bind({})
Danger.args = {
  variant: 'danger',
}

export const Info = Template.bind({})
Info.args = {
  variant: 'info',
}

export const Disabled = Template.bind({})
Disabled.args = {
  variant: 'primary',
  disabled: true,
}

export const Loading = Template.bind({})
Loading.args = {
  variant: 'primary',
  isLoading: true,
}
