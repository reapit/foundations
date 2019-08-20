import React, { useState } from 'react'

import { storiesOf } from '@storybook/react'
import { Tabs, TabConfig } from '.'

const tabConfigs = ({ tab, handleChangeTab }: any): TabConfig[] => [
  {
    tabIdentifier: 'ITEMONE',
    displayText: 'Item one',
    onTabClick: handleChangeTab,
    active: tab === 'ITEMONE'
  },
  {
    tabIdentifier: 'ITEMTWO',
    displayText: 'Item two',
    onTabClick: handleChangeTab,
    active: tab === 'ITEMTWO'
  }
]

storiesOf('Tabs', module).add('Tabs', () => {
  function Parent({ children }) {
    const [tab, handleChangeTab] = useState('ITEMONE')
    return <div>{children(tab, handleChangeTab)}</div>
  }

  return (
    <Parent>
      {(tab, handleChangeTab) => (
        <section className="section">
          <div className="column is-half-desktop">
            <Tabs tabConfigs={tabConfigs({ tab, handleChangeTab })} />
          </div>
        </section>
      )}
    </Parent>
  )
})
