import * as React from 'react'
import ReactDOM from 'react-dom'
import { SearchWidget } from '@/components/search-widget'
;(window as any).initReapitSearchWidget = ({
  theme = {},
  containerID = 'reapit-search-widget',
  searchResultContainerID = 'reapit-search-widget-result',
}) => {
  const container = document.getElementById(containerID)
  if (!container) {
    throw new Error('container not existed')
  }

  ReactDOM.render(
    <SearchWidget theme={theme} searchResultContainerID={searchResultContainerID} />,
    document.getElementById(containerID),
  )
}
