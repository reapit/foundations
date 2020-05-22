import React from 'react'
import { Aside } from '../aside'
import { shallow, mount } from 'enzyme'
import { integrationTypesStub } from '@/sagas/__stubs__/integration-types'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { AppDetailDataNotNull } from '@/reducers/client/app-detail'
import { DesktopIntegrationTypeModel } from '@/actions/app-integration-types'
import configureStore from 'redux-mock-store'
import { ReduxState } from '@/types/core'
import { Provider } from 'react-redux'
import { WebComponentConfig } from '../aside'

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
  const mockState = {
    client: {
      webComponent: {
        loading: false,
        updating: false,
        data: null,
        isShowModal: true,
      },
    },
  } as ReduxState
  const mockStore = configureStore()
  const store = mockStore(mockState)
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
