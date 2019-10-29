import React from 'react'
import ReactDOM from 'react-dom'
import SearchWidget from './search-widget'
import { theme as defaultTheme, Theme } from './theme'
import merge from 'lodash.merge'
;(window as any).initReaptSearchWidget = ({
  API_KEY,
  theme = {}
}: {
  API_KEY: string
  theme: any
}) => {
  const mergedTheme: Theme = merge({}, defaultTheme, theme)

  ReactDOM.render(
    <SearchWidget API_KEY={API_KEY} theme={mergedTheme} />,
    document.getElementById('reapit-search-widget')
  )
}
