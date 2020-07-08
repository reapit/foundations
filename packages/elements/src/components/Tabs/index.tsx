import * as React from 'react'
import { cx } from 'linaria'

export interface TabConfig {
  tabIdentifier: string
  displayText: string
  onTabClick: (tabIdentifier: string) => void
  active: boolean
}

export interface TabsProps {
  tabConfigs: TabConfig[]
  className?: string
}

export const selectTab = (event: React.SyntheticEvent, tabConfig: TabConfig) => {
  event.preventDefault()
  tabConfig.onTabClick(tabConfig.tabIdentifier)
}

export const Tabs: React.FunctionComponent<TabsProps> = ({ tabConfigs, className }) => (
  <div className={cx('tabs', 'is-fullwidth', className)} role="tablist">
    <ul>
      {tabConfigs.map(tabConfig => (
        <li className={cx(tabConfig.active && 'is-active')} key={tabConfig.tabIdentifier}>
          <a
            id={tabConfig.tabIdentifier}
            role="tab"
            aria-controls={tabConfig.tabIdentifier}
            aria-selected={tabConfig.active}
            onClick={(error: React.SyntheticEvent) => selectTab(error, tabConfig)}
          >
            {tabConfig.displayText}
          </a>
        </li>
      ))}
    </ul>
  </div>
)
