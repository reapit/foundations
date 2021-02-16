import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import { ButtonGroup, ButtonGroupProps, Button } from './button'

export default {
  title: 'ButtonGroup',
  component: ButtonGroup,
} as Meta

const Template: Story<ButtonGroupProps> = args => (
  <ButtonGroup {...args}>
    <Button variant="primary">primary</Button>
    <Button variant="secondary">secondary</Button>
    <Button variant="info">info</Button>
  </ButtonGroup>
)

export const Default = Template.bind({})
Default.args = {}

export const Centered = Template.bind({})
Centered.args = {
  isCentered: true,
}
