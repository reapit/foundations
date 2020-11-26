import React from 'react'
import * as ReactRedux from 'react-redux'
import { MemoryRouter } from 'react-router'
import { ReduxState } from '@/types/core'
import configureStore from 'redux-mock-store'
import { Aside } from '../aside'
import { mount } from 'enzyme'
import { integrationTypesStub } from '@/sagas/__stubs__/integration-types'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import appState from '@/reducers/__stubs__/app-state'
import Routes from '@/constants/routes'

import { AppDetailModel, DesktopIntegrationTypeModel } from '@reapit/foundations-ts-definitions'

const mockState = {
  ...appState,
  auth: {
    loginType: 'DEVELOPER',
  },
} as ReduxState

describe('ClientAside', () => {
  let store
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(mockState)
  })

  test('ClientAside - should match snapshot', () => {
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.APP_PREVIEW, key: 'developerAppPreviewRoute' }]}>
            <Aside
              appDetailData={appDetailDataStub as AppDetailModel}
              desktopIntegrationTypes={integrationTypesStub.data as DesktopIntegrationTypeModel[]}
            />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })
})
