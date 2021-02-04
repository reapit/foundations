import * as React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { Tabs, TabsProps, TabConfig } from '.'
import { Section } from '@/components/Layout'
import { action } from '@storybook/addon-actions'

const tabConfigs: TabConfig[] = [
  {
    tabIdentifier: 'ITEMONE',
    displayText: 'Item one',
    onTabClick: action('Clicked Tab 1'),
    active: true,
  },
  {
    tabIdentifier: 'ITEMTWO',
    displayText: 'Item two',
    onTabClick: action('Clicked Tab 2'),
    active: false,
  },
]

export default {
  title: 'Rereshed-Docs/Tabs',
  component: Tabs,
}

export const Primary: Story<TabsProps> = args => (
  <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
    <div className="column is-half-desktop">
      <Tabs {...args} />
    </div>
  </Section>
)
Primary.args = {
  tabConfigs,
}
