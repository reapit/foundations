import * as React from 'react'
import initChatBot from '../../../scripts/chat-bot'
import { shallow } from 'enzyme'
import {
  HelpPage,
  handleGotoWelcomeGuide,
  handleReportBug,
  handleRequestEndpoint,
  handleFaq,
  helpItems,
  renderHelpItems,
  handleViewRoadmap,
} from '../help'
import Routes from '@/constants/routes'
import { history } from '@/core/router'
import { HelpLinks } from '@/constants/help-links'
import { mockLoginSession } from '../../../sagas/__tests__/auth'

jest.mock('../../../scripts/chat-bot')

jest.mock('../../../core/router', () => ({
  history: {
    push: jest.fn(),
  },
}))

afterEach(() => {
  jest.clearAllMocks()
})

describe('HelpPage', () => {
  it('should match a snapshot', () => {
    expect(shallow(<HelpPage loginIdentity={mockLoginSession.loginIdentity} />)).toMatchSnapshot()
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
    const spy = jest.spyOn(window, 'open')
    handleReportBug()
    expect(spy).toHaveBeenCalledWith(HelpLinks.BUG_REPORT, '_blank')
  })
})

describe('handleRequestEndpoint', () => {
  it('should called with correct props', () => {
    const spy = jest.spyOn(window, 'open')
    handleRequestEndpoint()
    expect(spy).toHaveBeenCalledWith(HelpLinks.API_REQUEST, '_blank')
  })
})

describe('handleViewRoadmap', () => {
  it('should called with correct props', () => {
    const spy = jest.spyOn(window, 'open')
    handleViewRoadmap()
    expect(spy).toHaveBeenCalledWith(HelpLinks.ROADMAP, '_blank')
  })
})

describe('handleFaq', () => {
  it('should called with correct props', () => {
    handleFaq(mockLoginSession.loginIdentity)
    expect(initChatBot).toHaveBeenCalledTimes(1)
    expect(initChatBot).toHaveBeenCalledWith(mockLoginSession.loginIdentity)
  })
})

describe('renderHelpItems', () => {
  it('should match snapshot', () => {
    expect(renderHelpItems(helpItems(mockLoginSession.loginIdentity))).toMatchSnapshot()
  })
})
