import React from 'react'
import ReactDOM from 'react-dom'
import { SearchWidget } from '@searchWidget/index'
;(window as any).initReapitSearchWidget = ({
  theme = {},
  containerID = 'reapit-search-widget',
  searchResultContainerID
}) => {
  if (!containerID) {
    throw new Error('containerID must not be empty')
  }

  if (!searchResultContainerID) {
    throw new Error('searchResultContainerID must not be empty')
  }

  const container = document.getElementById(containerID)
  if (!container) {
    throw new Error('container not existed')
  }

  ReactDOM.render(
    <SearchWidget
      theme={theme}
      searchResultContainerID={searchResultContainerID}
    />,
    document.getElementById(containerID)
  )
}
