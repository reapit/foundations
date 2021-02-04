import React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { ErrorData, Toast, ToastProps } from '.'
import { action } from '@storybook/addon-actions'

const DEFAULT_SERVER_ERROR = {
  type: 'SERVER',
  message: 'Something went wrong fetching data',
} as ErrorData
const DEFAULT_COMPONENT_ERROR = {
  type: 'COMPONENT',
  message: 'Something went wrong with this component',
} as ErrorData

export default {
  title: 'Rereshed-Docs/Toast',
  component: Toast,
}

export const ComponentError: Story<ToastProps> = args => <Toast {...args} />
ComponentError.args = {
  componentError: DEFAULT_COMPONENT_ERROR,
  errorClearedComponent: action('Component toast cleared'),
}

export const ServerError: Story<ToastProps> = args => <Toast {...args} />
ServerError.args = {
  serverError: DEFAULT_SERVER_ERROR,
  errorClearedServer: action('Server toast cleared'),
}
