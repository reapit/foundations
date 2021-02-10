import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import { Message, MessageProps } from './message'

export default {
  title: 'Message',
  component: Message,
} as Meta

const Template: Story<MessageProps> = args => <Message {...args} />

export const Info = Template.bind({})
Info.args = {
  message: 'Info',
  variant: 'info',
}

export const Primary = Template.bind({})
Primary.args = {
  message: 'Primary',
  variant: 'primary',
}

export const Danger = Template.bind({})
Danger.args = {
  message: 'Danger',
  variant: 'danger',
}

export const Success = Template.bind({})
Success.args = {
  message: 'Success',
  variant: 'success',
}
