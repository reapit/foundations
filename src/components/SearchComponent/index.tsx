import React from 'react'

export type SearchComponentProps = {
  theme?: any
}

const SearchComponent: React.FC<SearchComponentProps> = ({ theme = { colors: {} } }) => {
  React.useEffect(() => {
    // @ts-ignore
    window.initReaptSearchWidget && window.initReaptSearchWidget({ API_KEY: 'abc', theme })
  }, [])
  return <div id="reapit-search-widget"></div>
}

export default SearchComponent
