import * as React from 'react'
import { render } from '../../../../tests/react-testing'
import { FeaturedApps } from '../featured'
import { featuredAppsDataStub } from '../../../../sagas/__stubs__/apps'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'

describe('FeaturedApps', () => {
  it('should match a snapshot', () => {
    expect(render(<FeaturedApps apps={featuredAppsDataStub.data.data as AppSummaryModel[]} />)).toMatchSnapshot()
  })
})
