import React from 'react'
import SearchWidget from './search-widget'
import { SearchWidget as SearchWidgetNPM } from '@reapit/web-components-test'

export default { title: 'SearchWidget' }

export const withSearchWidgetDev = () => (
  <div>
    <SearchWidget />
    <div id="reapit-search-widget-result" />
  </div>
)

export const withSearchWidgetNpm = () => (
  <div>
    <SearchWidgetNPM />
    <div id="reapit-search-widget-result" />
  </div>
)
