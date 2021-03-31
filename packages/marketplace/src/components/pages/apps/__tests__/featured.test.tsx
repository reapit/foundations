import * as React from 'react'
import { shallow } from 'enzyme'
import { FeaturedApps } from '../featured'
import { featuredAppsDataStub } from '../../../../sagas/__stubs__/apps'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'

describe('FeaturedApps', () => {
  it('should match a snapshot', () => {
    expect(shallow(<FeaturedApps apps={featuredAppsDataStub.data.data as AppSummaryModel[]} />)).toMatchSnapshot()
  })
})
