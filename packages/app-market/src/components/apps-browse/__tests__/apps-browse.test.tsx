import React from 'react'
import { render } from '../../../tests/react-testing'
import { AppsBrowse, handleSortConfigs } from '../apps-browse'
import { appsBrowseConfigCollection } from '../config'

describe('AppsBrowse', () => {
  it('should match a snapshot', () => {
    expect(render(<AppsBrowse />)).toMatchSnapshot()
  })
})

describe('handleSortConfigs', () => {
  it('should correctly sort configs', () => {
    const curried = handleSortConfigs(appsBrowseConfigCollection)
    const config = appsBrowseConfigCollection.data

    expect(curried()).toEqual({
      featuredHeroApps: [config[0]],
      heroApps: [config[1], config[2]],
      appsFilters: [config[3]],
      featuredApps: [config[4]],
      simpleApps: [config[5]],
    })
  })
})
