import React from 'react'
import { Aside } from '../aside'
import { shallow, mount } from 'enzyme'
import { integrationTypesStub } from '@/sagas/__stubs__/integration-types'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { AppDetailDataNotNull } from '@/reducers/client/app-detail'
import { DesktopIntegrationTypeModel } from '@/actions/app-integration-types'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { WebComponentConfig } from '../aside'
import appState from '@/reducers/__stubs__/app-state'

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

describe('WebComponentConfig', () => {
  const extendStore = {
    ...appState,
    client: {
      webComponent: { isShowModal: true },
    },
  }
  const mockStore = configureStore()
  const store = mockStore(extendStore)
  it('Should match snapshot', () => {
    expect(
      mount(
        <Provider store={store}>
          <WebComponentConfig />
        </Provider>,
      ),
    ).toMatchSnapshot()
  })
})
