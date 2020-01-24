import React from 'react'

export type SearchComponentProps = {
  theme?: any
}

export const handleUseEffect = ({ theme }) => () => {
  // @ts-ignore
  window.initReaptSearchWidget && window.initReaptSearchWidget({ API_KEY: 'abc', theme })
}

export const SearchComponent: React.FC<SearchComponentProps> = ({ theme = { colors: {} } }) => {
  React.useEffect(handleUseEffect({ theme }), [])
  return <div id="reapit-search-widget"></div>
}

export default SearchComponent
