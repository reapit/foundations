import * as React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { Button, ButtonProps } from './index'
import { action } from '@storybook/addon-actions'

export default {
  title: 'V3/Button',
  component: Button,
}

export const Default: Story<ButtonProps> = (args) => <Button {...args}>Text within button</Button>
Default.args = {
  intent: 'primary',
}

export const Disabled: Story<ButtonProps> = (args) => <Button {...args}>Text within button</Button>
Disabled.args = {
  intent: 'primary',
  disabled: true,
}
