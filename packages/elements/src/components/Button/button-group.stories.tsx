import * as React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { ButtonGroup, ButtonGroupProps, Button } from './index'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
}

const Template: Story<ButtonGroupProps> = (args) => (
  <ButtonGroup {...args}>
    <Button
      type="button"
      variant="secondary"
      onClick={action('Button Left pressed')}
      disabled={false}
      loading={false}
      fullWidth={false}
    >
      Left
    </Button>
    <Button
      type="button"
      variant="primary"
      onClick={action('Button Center pressed')}
      disabled={false}
      loading={false}
      fullWidth={false}
    >
      Center
    </Button>
    <Button
      type="button"
      variant="secondary"
      onClick={action('Button Right pressed')}
      disabled={false}
      loading={false}
      fullWidth={false}
    >
      Right
    </Button>
  </ButtonGroup>
)

export const Default = Template.bind({})
Default.args = {}

export const IsBlock = Template.bind({})
IsBlock.args = {
  className: 'is-block',
}
