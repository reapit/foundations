import * as React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import { Helper, HelperProps } from './index'

export default {
  title: 'Components/Helper',
  component: Helper,
}

export const Info: Story<HelperProps> = (args) => <Helper {...args}>Helper variant info</Helper>
Info.args = {
  variant: 'info',
}

export const Warning: Story<HelperProps> = (args) => <Helper {...args}>Helper variant warning</Helper>
Warning.args = {
  variant: 'warning',
}

export const WithCloseButton: Story<HelperProps> = (args) => <Helper {...args}>Helper with close button</Helper>
WithCloseButton.args = {
  variant: 'info',
  closeButton: true,
  onCloseClick: action('Close button clicked'),
}
