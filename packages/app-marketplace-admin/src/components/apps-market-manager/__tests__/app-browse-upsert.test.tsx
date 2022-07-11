import React from 'react'
import { render } from '../../../tests/react-testing'
import { AppBrowseUpsert } from '../app-browse-upsert'

describe('AppBrowseManageUpsert', () => {
  it('should match a snapshot', () => {
    window.reapit.config.appEnv = 'development'
    expect(render(<AppBrowseUpsert />)).toMatchSnapshot()
  })
})
