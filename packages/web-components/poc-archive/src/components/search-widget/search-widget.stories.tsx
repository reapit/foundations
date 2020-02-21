import React from 'react'
import SearchWidget from './search-widget'

export default { title: 'SearchWidget' }

export const withSearchWidgetDev = () => (
  <div>
    <SearchWidget />
    <div id="reapit-search-widget-result" />
  </div>
)
