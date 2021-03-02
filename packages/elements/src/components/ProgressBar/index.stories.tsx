import * as React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { ProgressBar, ProgressBarProps } from '.'

export default {
  title: 'Components/ProgressBar',
  component: ProgressBar,
}

const Template: Story<ProgressBarProps> = (args) => <ProgressBar {...args} />

export const Zero = Template.bind({})
Zero.storyName = '0%'
Zero.args = {
  percentage: 0,
}

export const Fifty = Template.bind({})
Fifty.storyName = '50%'
Fifty.args = {
  percentage: 50,
}

export const Seventy = Template.bind({})
Seventy.storyName = '70%'
Seventy.args = {
  percentage: 70,
}

export const Hundred = Template.bind({})
Hundred.storyName = '100%'
Hundred.args = {
  percentage: 100,
}
