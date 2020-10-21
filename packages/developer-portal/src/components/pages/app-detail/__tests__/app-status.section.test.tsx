import { shallow } from 'enzyme'
import React from 'react'
import { StatusSection } from '../app-status-section'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { ReduxState } from '@/types/core'
import { installationsStub } from '@/sagas/__stubs__/installations'
import appState from '@/reducers/__stubs__/app-state'

const mockState = {
  ...appState,
  installations: {
    installationsList: installationsStub,
  },
} as ReduxState

describe('StatusSection', () => {
  const mockStore = configureStore()
  const store = mockStore(mockState)

  it('should match a snapshot where isListed false and not sidebar', () => {
    expect(
      shallow(
        <Provider store={store}>
          <StatusSection appDetail={appDetailDataStub.data as AppDetailModel} />
        </Provider>,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot where isListed true, is installed and is sidebar', () => {
    expect(
      shallow(
        <Provider store={store}>
          <StatusSection
            appDetail={{ ...(appDetailDataStub.data as AppDetailModel), isListed: true, installationId: 'foobar' }}
            isSidebar
          />
          ,
        </Provider>,
      ),
    ).toMatchSnapshot()
  })
})
