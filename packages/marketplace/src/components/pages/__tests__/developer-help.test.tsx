import * as React from 'react'
import initChatBot from '../../../scripts/chat-bot'
import { mount } from 'enzyme'
import * as ReactRedux from 'react-redux'
import {
  DeveloperHelpPage,
  handleGotoWelcomeGuide,
  handleReportBug,
  handleRequestEndpoint,
  handleFaq,
  handleViewRoadmap,
  handleWhatsNew,
} from '../developer-help'
import Routes from '@/constants/routes'
import configureStore from 'redux-mock-store'
import { history } from '@/core/router'
import { HelpLinks } from '@/constants/developer-help-links'
import { mockLoginSession } from '../../../sagas/__tests__/auth'
import appState from '@/reducers/__stubs__/app-state'

jest.mock('../../../scripts/chat-bot')

jest.mock('../../../core/router', () => ({
  history: {
    push: jest.fn(),
  },
}))

afterEach(() => {
  jest.clearAllMocks()
})

describe('DeveloperHelpPage', () => {
  let store
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(appState)
  })

  it('should match a snapshot', () => {
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <DeveloperHelpPage />
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })
})

describe('handleGotoWelcomeGuide', () => {
  it('should called with correct props', () => {
    const spy = jest.spyOn(history, 'push')
    handleGotoWelcomeGuide()
    expect(spy).toHaveBeenCalledWith(Routes.DEVELOPER_WELCOME)
  })
})

describe('handleReportBug', () => {
  it('should called with correct props', () => {
    handleReportBug()
    expect(window.open).toHaveBeenCalledWith(HelpLinks.BUG_REPORT, '_blank')
  })
})

describe('handleRequestEndpoint', () => {
  it('should called with correct props', () => {
    handleRequestEndpoint()
    expect(window.open).toHaveBeenCalledWith(HelpLinks.API_REQUEST, '_blank')
  })
})

describe('handleViewRoadmap', () => {
  it('should called with correct props', () => {
    handleViewRoadmap()
    expect(window.open).toHaveBeenCalledWith(HelpLinks.ROADMAP, '_blank')
  })
})

describe('handleWhatsNew', () => {
  it('should called with correct props', () => {
    handleWhatsNew()
    expect(window.open).toHaveBeenCalledWith(HelpLinks.WHATS_NEW, '_blank')
  })
})

describe('handleFaq', () => {
  it('should called with correct props', () => {
    handleFaq(mockLoginSession.loginIdentity)
    expect(initChatBot).toHaveBeenCalledTimes(1)
    expect(initChatBot).toHaveBeenCalledWith(mockLoginSession.loginIdentity)
  })
})
