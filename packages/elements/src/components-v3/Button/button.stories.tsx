import * as React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { Button, IButton } from './index'
import { action } from '@storybook/addon-actions'

export default {
  title: 'V3/Button',
  component: Button,
}

export const Default: Story<IButton> = (args) => <Button {...args}>Text within button</Button>
Default.args = {}

export const Disabled: Story<IButton> = (args) => <Button {...args}>Text within button</Button>
Disabled.args = {
  disabled: true,
}

export const ClickHandler: Story<IButton> = (args) => <Button {...args}>Text within button</Button>
ClickHandler.args = {
  onClick: action('Button was clicked'),
}

export const SubmitType: Story<IButton> = (args) => <Button {...args}>Text within button</Button>
SubmitType.args = {
  type: 'submit',
}

export const CustomClassName: Story<IButton> = (args) => <Button {...args}>Text within button</Button>
CustomClassName.args = {
  className: 'my-special-class',
}
