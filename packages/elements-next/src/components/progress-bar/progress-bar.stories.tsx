import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'

import { ProgressBar, ProgressBarProps } from './progress-bar'

export default {
  title: 'ProgressBar',
  component: ProgressBar,
} as Meta

const Template: Story<ProgressBarProps> = args => <ProgressBar {...args} />

export const Progress = Template.bind({})
Progress.args = {
  percentage: 70,
}
