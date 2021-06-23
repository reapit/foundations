import * as React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { Loader, LoaderProps } from '.'

export default {
  title: 'Components/Loader',
  component: Loader,
  decorators: [(Story: Story) => <Story />],
}

export const Default: Story<LoaderProps> = (args) => <Loader {...args} />
Default.args = {}

export const Inline: Story<LoaderProps> = (args) => <Loader {...args} />
Inline.args = {
  body: false,
}
