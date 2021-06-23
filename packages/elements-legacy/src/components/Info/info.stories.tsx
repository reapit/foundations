import * as React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { Info, InfoProps } from '.'

export default {
  title: 'Components/Info',
  component: Info,
}

const Template: Story<InfoProps> = (args) => <Info {...args} />

export const Four04 = Template.bind({})
Four04.args = {
  infoType: '404',
}
Four04.storyName = '404'

export const NoAppsInstalled = Template.bind({})
NoAppsInstalled.args = {
  infoType: 'INSTALLED_APPS_EMPTY',
}

export const DeveloperAppsEmpty = Template.bind({})
DeveloperAppsEmpty.args = {
  infoType: 'DEVELOPER_APPS_EMPTY',
}
