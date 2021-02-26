import * as React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { Button, ButtonProps } from './index'
import { action } from '@storybook/addon-actions'

export default {
  title: 'V3/Button',
  component: Button,
}

export const Default: Story<ButtonProps> = (args) => <Button {...args}>Default</Button>
Default.args = {
  type: 'submit',
  onClick: action('Clicking Primary Button'),
  disabled: false,
  loading: false,
  fullWidth: false,
}

export const Primary: Story<ButtonProps> = (args) => <Button {...args}>Primary</Button>
Primary.args = {
  type: 'submit',
  intent: 'primary',
  onClick: action('Clicking Primary Button'),
  disabled: false,
  loading: false,
  fullWidth: false,
}

export const Success: Story<ButtonProps> = (args) => <Button {...args}>Success</Button>
Success.args = {
  type: 'submit',
  intent: 'success',
  onClick: action('Clicking Secondary Button'),
  disabled: false,
  loading: false,
  fullWidth: false,
}

export const Danger: Story<ButtonProps> = (args) => <Button {...args}>Danger</Button>
Danger.args = {
  type: 'submit',
  intent: 'danger',
  onClick: action('Clicking Danger Button'),
  disabled: false,
  loading: false,
  fullWidth: false,
}

export const Info: Story<ButtonProps> = (args) => <Button {...args}>Info</Button>
Info.args = {
  type: 'submit',
  intent: 'info',
  onClick: action('Clicking Info Button'),
  disabled: false,
  loading: false,
  fullWidth: false,
}

export const Disabled: Story<ButtonProps> = (args) => <Button {...args}>Disabled</Button>
Disabled.args = {
  type: 'submit',
  intent: 'primary',
  onClick: action('Clicking Disabled Button'),
  disabled: true,
  loading: false,
  fullWidth: false,
}

export const Loading: Story<ButtonProps> = (args) => <Button {...args}>Loading</Button>
Loading.args = {
  type: 'submit',
  intent: 'primary',
  onClick: action('Clicking Loading Button'),
  disabled: false,
  loading: true,
  fullWidth: false,
}

export const IsCentered: Story<ButtonProps> = (args) => <Button {...args}>Centered</Button>
IsCentered.args = {
  type: 'submit',
  intent: 'primary',
  onClick: action('Clicking Centered Button'),
  disabled: false,
  loading: false,
  fullWidth: false,
  className: 'is-centered',
}
