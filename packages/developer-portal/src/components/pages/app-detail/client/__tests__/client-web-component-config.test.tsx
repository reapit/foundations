import * as React from 'react'
import { Provider } from 'react-redux'
import appState from '@/reducers/__stubs__/app-state'
import configureStore from 'redux-mock-store'
import { mount } from 'enzyme'
import { WebComponentConfig } from '../client-web-component-config'
import Routes from '@/constants/routes'
import { MemoryRouter } from 'react-router'

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
          <MemoryRouter initialEntries={[{ pathname: Routes.CLIENT_APP_DETAIL, key: 'appDetailsRoute' }]}>
            <WebComponentConfig />
          </MemoryRouter>
        </Provider>,
      ),
    ).toMatchSnapshot()
  })
})
