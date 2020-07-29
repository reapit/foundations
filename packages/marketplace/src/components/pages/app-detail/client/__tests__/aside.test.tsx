import React from 'react'
import { Aside } from '../aside'
import { shallow } from 'enzyme'
import { desktopIntegrationTypesStub } from '@/sagas/__stubs__/desktop-integration-types'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { AppDetailDataNotNull } from '@/reducers/client/app-detail'
import { DesktopIntegrationTypeModel } from '@/actions/desktop-integration-types'

describe('ClientAside', () => {
  test('ClientAside - should match snapshot', () => {
    expect(
      shallow(
        <Aside
          appDetailData={appDetailDataStub as AppDetailDataNotNull}
          desktopIntegrationTypes={desktopIntegrationTypesStub.data as DesktopIntegrationTypeModel[]}
        />,
      ),
    ).toMatchSnapshot()
  })
})
