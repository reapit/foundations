import * as React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { Alert, AlertProps } from './index'

export default {
  title: 'Rereshed-Docs/Alert',
  component: Alert,
  argTypes: {
    closable: {
      table: {
        disable: true,
      },
    },
    dataTest: {
      table: {
        disable: true,
      },
    },
    afterClose: {
      table: {
        disable: true,
      },
    },
  },
}

const Template: Story<AlertProps> = args => <Alert {...args} />

export const Primary = Template.bind({})
Primary.args = {
  message: 'primary',
  type: 'primary',
}

export const Danger = Template.bind({})
Danger.args = {
  message: 'danger',
  type: 'danger',
}

export const Info = Template.bind({})
Info.args = {
  message: 'info',
  type: 'info',
}

export const Warning = Template.bind({})
Warning.args = {
  message: 'warning',
  type: 'warning',
}

export const Success = Template.bind({})
Success.args = {
  message: 'success',
  type: 'success',
}
