import * as React from 'react'

export interface TabConfig {
  tabIdentifier: string
  displayText: string
  onTabClick: (tabIdentifier: string) => void
  active: boolean
}

export interface TabsProps {
  tabConfigs: TabConfig[]
}

export const selectTab = (event: React.SyntheticEvent, tabConfig: TabConfig) => {
  event.preventDefault()
  tabConfig.onTabClick(tabConfig.tabIdentifier)
}

export const Tabs: React.FunctionComponent<TabsProps> = ({ tabConfigs }) => (
  <div className="tabs is-fullwidth" role="tablist">
    <ul>
      {tabConfigs.map(tabConfig => (
        <li className={`${tabConfig.active ? 'is-active' : ''}`} key={tabConfig.tabIdentifier}>
          <a
            id={tabConfig.tabIdentifier}
            href={`#${tabConfig.tabIdentifier}`}
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
