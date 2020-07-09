import React from 'react'
import { ClientAside } from '../client-aside'
import { shallow } from 'enzyme'
import { integrationTypesStub } from '@/sagas/__stubs__/integration-types'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { AppDetailDataNotNull } from '@/reducers/client/app-detail'
import { DesktopIntegrationTypeModel } from '@/actions/app-integration-types'

describe('ClientAside', () => {
  test('ClientAside - should match snapshot', () => {
    expect(
      shallow(
        <ClientAside
          appDetailData={appDetailDataStub as AppDetailDataNotNull}
          desktopIntegrationTypes={integrationTypesStub.data as DesktopIntegrationTypeModel[]}
        />,
      ),
    ).toMatchSnapshot()
  })
})
