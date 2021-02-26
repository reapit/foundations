import React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import { ToastMessage, ToastMessageProps } from '.'

const longText =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non sint voluptas qui amet architecto, ' +
  'maxime laudantium voluptatibus, laborum beatae explicabo minima voluptatum, doloremque blanditiis ' +
  'ipsum reiciendis quasi fugit eveniet perferendis!'

export default {
  title: 'Rereshed-Docs/ToastMessage',
  component: ToastMessage,
}

export const Primary: Story<ToastMessageProps> = (args) => <ToastMessage {...args} />
Primary.args = {
  visible: true,
  message: longText,
  variant: 'primary',
  onCloseToast: action('ToastMessage closed'),
}

export const Secondary: Story<ToastMessageProps> = (args) => <ToastMessage {...args} />
Secondary.args = {
  visible: true,
  message: longText,
  variant: 'secondary',
  onCloseToast: action('ToastMessage closed'),
}

export const Danger: Story<ToastMessageProps> = (args) => <ToastMessage {...args} />
Danger.args = {
  visible: true,
  message: longText,
  variant: 'danger',
  onCloseToast: action('ToastMessage closed'),
}

export const Info: Story<ToastMessageProps> = (args) => <ToastMessage {...args} />
Info.args = {
  visible: true,
  message: longText,
  variant: 'info',
  onCloseToast: action('ToastMessage closed'),
}
