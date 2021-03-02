import * as React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { Button, ButtonProps } from './index'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Rereshed-Docs/Button',
  component: Button,
}

export const Primary: Story<ButtonProps> = (args) => <Button {...args}>Primary</Button>
Primary.args = {
  type: 'submit',
  variant: 'primary',
  onClick: action('Clicking Primary Button'),
  disabled: false,
  loading: false,
  fullWidth: false,
}

export const Secondary: Story<ButtonProps> = (args) => <Button {...args}>Secondary</Button>
Secondary.args = {
  type: 'submit',
  variant: 'secondary',
  onClick: action('Clicking Secondary Button'),
  disabled: false,
  loading: false,
  fullWidth: false,
}

export const Danger: Story<ButtonProps> = (args) => <Button {...args}>Danger</Button>
Danger.args = {
  type: 'submit',
  variant: 'danger',
  onClick: action('Clicking Danger Button'),
  disabled: false,
  loading: false,
  fullWidth: false,
}

export const Info: Story<ButtonProps> = (args) => <Button {...args}>Info</Button>
Info.args = {
  type: 'submit',
  variant: 'info',
  onClick: action('Clicking Info Button'),
  disabled: false,
  loading: false,
  fullWidth: false,
}

export const Disabled: Story<ButtonProps> = (args) => <Button {...args}>Disabled</Button>
Disabled.args = {
  type: 'submit',
  variant: 'primary',
  onClick: action('Clicking Disabled Button'),
  disabled: true,
  loading: false,
  fullWidth: false,
}

export const Loading: Story<ButtonProps> = (args) => <Button {...args}>Loading</Button>
Loading.args = {
  type: 'submit',
  variant: 'primary',
  onClick: action('Clicking Loading Button'),
  disabled: false,
  loading: true,
  fullWidth: false,
}

export const IsCentered: Story<ButtonProps> = (args) => <Button {...args}>Centered</Button>
IsCentered.args = {
  type: 'submit',
  variant: 'primary',
  onClick: action('Clicking Centered Button'),
  disabled: false,
  loading: false,
  fullWidth: false,
  className: 'is-centered',
}
