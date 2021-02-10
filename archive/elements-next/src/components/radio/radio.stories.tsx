import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'

import { Radio, RadioProps } from './radio'

export default {
  title: 'Radio',
  component: Radio,
} as Meta

const Template: Story<RadioProps> = args => <Radio {...args} />

export const Primary = Template.bind({})
Primary.args = {
  label: 'Radio',
}
