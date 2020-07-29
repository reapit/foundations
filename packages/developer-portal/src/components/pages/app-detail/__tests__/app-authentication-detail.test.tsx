import * as React from 'react'
import { mount } from 'enzyme'
import * as ReactRedux from 'react-redux'
import configureStore from 'redux-mock-store'
import appState from '@/reducers/__stubs__/app-state'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import {
  AppAuthenticationDetail,
  AppAuthenticationDetailProps,
  handleCopyCode,
  handleShowAuthCode,
  handleMouseLeave,
} from '../app-authentication-detail'
import { fetchtAppAuthentication } from '@/actions/apps'

const props: AppAuthenticationDetailProps = {
  appId: appDetailDataStub.data?.id || '',
}

describe('AppAuthenticationDetail', () => {
  let store
  let spyDispatch
  const mockSetTooltipMessage = jest.fn()

  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(appState)
    spyDispatch = jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(() => store.dispatch)
  })
  it('should match a snapshot', () => {
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <AppAuthenticationDetail {...props} />
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })
  describe('handleCopyCode', () => {
    it('should copy the code to clipboard', () => {
      const fn = handleCopyCode(mockSetTooltipMessage)
      fn()
      expect(mockSetTooltipMessage).toHaveBeenCalledWith('Copied')
    })
  })
  describe('handleShowAuthCode', () => {
    it('should run correctly', () => {
      const mockedEvent = { preventDefault: jest.fn() }
      const fn = handleShowAuthCode(props.appId, spyDispatch)
      fn(mockedEvent)
      expect(mockedEvent.preventDefault).toBeCalled()
      expect(spyDispatch).toBeCalledWith(fetchtAppAuthentication(props.appId))
    })
  })
  describe('handleMouseLeave', () => {
    it('should run correctly', () => {
      const fn = handleMouseLeave(mockSetTooltipMessage)
      fn()
      expect(mockSetTooltipMessage).toBeCalledWith('Copy')
    })
  })
})
