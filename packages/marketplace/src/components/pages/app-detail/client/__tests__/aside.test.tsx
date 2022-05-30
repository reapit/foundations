import React from 'react'
import { Aside } from '../aside'
import { render } from '../../../tests/react-testing'
import { desktopIntegrationTypesStub } from '@/sagas/__stubs__/desktop-integration-types'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { AppDetailModel, DesktopIntegrationTypeModel } from '@reapit/foundations-ts-definitions'

describe('ClientAside', () => {
  test('ClientAside - should match snapshot', () => {
    expect(
      render(
        <Aside
          appDetailData={appDetailDataStub as AppDetailModel}
          desktopIntegrationTypes={desktopIntegrationTypesStub.data as DesktopIntegrationTypeModel[]}
        />,
      ),
    ).toMatchSnapshot()
  })
})
