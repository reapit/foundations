import React from 'react'
import { Aside } from '../aside'
import { shallow } from 'enzyme'
import { integrationTypesStub } from '@/sagas/__stubs__/integration-types'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { DesktopIntegrationTypeModel } from '@/actions/app-integration-types'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'

describe('ClientAside', () => {
  test('ClientAside - should match snapshot', () => {
    expect(
      shallow(
        <Aside
          appDetailData={appDetailDataStub as AppDetailModel}
          desktopIntegrationTypes={integrationTypesStub.data as DesktopIntegrationTypeModel[]}
        />,
      ),
    ).toMatchSnapshot()
  })
})
