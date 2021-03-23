import * as React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { Button, ButtonProps } from './index'
import { action } from '@storybook/addon-actions'

export default {
  title: 'V3/Button',
  component: Button,
}

export const Controlable: Story<ButtonProps> = (args) => <Button {...args}>Text within button</Button>
Controlable.args = {
  type: 'submit',
  onClick: action('Button was clicked'),
  intent: 'primary',
  disabled: false,
  loading: false,
}
