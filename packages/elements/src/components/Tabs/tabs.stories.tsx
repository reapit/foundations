import React, { useState } from 'react'

import { storiesOf } from '@storybook/react'
import { Tabs, TabConfig } from '.'
import { Section } from '@/components/Layout'

const tabConfigs = ({ tab, handleChangeTab }: any): TabConfig[] => [
  {
    tabIdentifier: 'ITEMONE',
    displayText: 'Item one',
    onTabClick: handleChangeTab,
    active: tab === 'ITEMONE',
  },
  {
    tabIdentifier: 'ITEMTWO',
    displayText: 'Item two',
    onTabClick: handleChangeTab,
    active: tab === 'ITEMTWO',
  },
]

storiesOf('Tabs', module).add('Primary', () => {
  function Parent({ children }) {
    const [tab, handleChangeTab] = useState('ITEMONE')
    return <div>{children(tab, handleChangeTab)}</div>
  }

  return (
    <Parent>
      {(tab, handleChangeTab) => (
        <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
          <div className="column is-half-desktop">
            <Tabs tabConfigs={tabConfigs({ tab, handleChangeTab })} />
          </div>
        </Section>
      )}
    </Parent>
  )
})
