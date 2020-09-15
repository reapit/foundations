import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'

import { Message, MessageProps } from './message'

export default {
  title: 'Example/Message',
  component: Message,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
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
