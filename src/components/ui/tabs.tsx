import * as React from 'react'

export interface TabConfig {
  tabIdentifier: string
  displayText: string
  onTabClick: (tabIdentifier: string) => void
  active: boolean
}

interface TabsProps {
  tabConfigs: TabConfig[]
}

export const selectTab = (event: React.SyntheticEvent, tabConfig: TabConfig) => {
  event.preventDefault()
  tabConfig.onTabClick(tabConfig.tabIdentifier)
}

const Tabs: React.FunctionComponent<TabsProps> = ({ tabConfigs }) => (
  <ul className="nav nav-tabs">
    {tabConfigs.map(tabConfig => (
      <li className="nav-item" key={tabConfig.tabIdentifier} role="tablist">
        <a
          id={tabConfig.tabIdentifier}
          href={`#${tabConfig.tabIdentifier}`}
          role="tab"
          className={`nav-link ${tabConfig.active && 'active'}`}
          aria-controls={tabConfig.tabIdentifier}
          aria-selected={tabConfig.active}
          onClick={(error: React.SyntheticEvent) => selectTab(error, tabConfig)}
        >
          {tabConfig.displayText}
        </a>
      </li>
    ))}
  </ul>
)

export default Tabs
