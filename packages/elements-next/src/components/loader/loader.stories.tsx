import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { Loader, LoaderProps } from './loader'

const Template: Story<LoaderProps> = args => <Loader {...args} />

export const Basic = Template.bind({})
Basic.args = {
  isLoading: true,
}
Basic.argTypes = {
  indicator: {
    control: 'color',
  },
}

export default {
  title: 'Loader',
  component: Loader,
} as Meta
