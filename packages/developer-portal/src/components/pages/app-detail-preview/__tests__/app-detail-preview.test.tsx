import * as React from 'react'
import * as ReactRedux from 'react-redux'
import { MemoryRouter } from 'react-router'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import AppDetailPreview, { loadAppDetailPreviewDataFromLocalStorage } from '../app-detail-preview'
import Routes from '@/constants/routes'
import appState from '@/reducers/__stubs__/app-state'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'

describe('AppDetailPreview', () => {
  let store
  let spyDispatch
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore({
      ...appState,
      client: {
        appDetail: {
          data: {},
          loading: false,
        },
      },
    })
    spyDispatch = jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(() => store.dispatch)
  })

  it('should match a snapshot', () => {
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.APP_DETAIL, key: 'clientAppDetailPreviewRoute' }]}>
            <AppDetailPreview />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })
  it('should run correctly', () => {
    window.localStorage.setItem('developer-preview-app', JSON.stringify(appDetailDataStub.data))
    const mockAppId = '9b6fd5f7-2c15-483d-b925-01b650538e52'
    const mockSetAppDetailPreviewData = jest.fn()
    const spyLocalStorageGetItem = jest.spyOn(window.localStorage, 'getItem')
    const fn = loadAppDetailPreviewDataFromLocalStorage(mockAppId, mockSetAppDetailPreviewData, spyDispatch)
    fn()
    expect(spyLocalStorageGetItem).toBeCalledWith('developer-preview-app')
    expect(mockSetAppDetailPreviewData).toBeCalled()
  })
})
