import React from 'react'
import { DeveloperAppDetailState } from '@/reducers/developer'
import { DeveloperAside, onBackToAppsButtonClick } from '../developer-aside'
import { shallow } from 'enzyme'
import { integrationTypesStub } from '@/sagas/__stubs__/integration-types'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { DesktopIntegrationTypeModel } from '@reapit/foundations-ts-definitions'
import Routes from '@/constants/routes'
import { getMockRouterProps } from '@/utils/mock-helper'

describe('DeveloperAside', () => {
  const { history } = getMockRouterProps({})

  it('should match snapshot', () => {
    expect(
      shallow(
        <DeveloperAside
          appDetailState={appDetailDataStub as DeveloperAppDetailState}
          desktopIntegrationTypes={integrationTypesStub.data as DesktopIntegrationTypeModel[]}
        />,
      ),
    ).toMatchSnapshot()
  })

  describe('onBackToAppsButtonClick', () => {
    it('should run correctly', () => {
      const fn = onBackToAppsButtonClick(history)
      fn()
      expect(history.push).toBeCalledWith(Routes.APPS)
    })
  })
})
