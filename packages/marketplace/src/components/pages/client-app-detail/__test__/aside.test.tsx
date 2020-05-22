import React from 'react'
import { Aside } from '../aside'
import { shallow } from 'enzyme'
import { integrationTypesStub } from '@/sagas/__stubs__/integration-types'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { AppDetailDataNotNull } from '@/reducers/client/app-detail'
import { DesktopIntegrationTypeModel } from '@/actions/app-integration-types'

describe('Aside', () => {
  test('Aside - should match snapshot', () => {
    expect(
      shallow(
        <Aside
          appDetailData={appDetailDataStub as AppDetailDataNotNull}
          desktopIntegrationTypes={integrationTypesStub.data as DesktopIntegrationTypeModel[]}
        />,
      ),
    ).toMatchSnapshot()
  })
})
