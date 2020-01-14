import * as React from 'react'
import { shallow } from 'enzyme'
import {
  HelpPage,
  handleGotoWelcomeGuide,
  handleReportBug,
  handleRequestEndpoint,
  handleFaq,
  helpItems,
  renderHelpItems
} from '../help'
import Routes from '@/constants/routes'
import { history } from '@/core/router'
import { HelpLinks } from '@/constants/help-links'

jest.mock('../../../core/router', () => ({
  history: {
    push: jest.fn()
  }
}))

afterEach(() => {
  jest.clearAllMocks()
})

describe('HelpPage', () => {
  it('should match a snapshot', () => {
    expect(shallow(<HelpPage />)).toMatchSnapshot()
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

describe('handleFaq', () => {
  it('should called with correct props', () => {
    const spy = jest.spyOn(window, 'open')
    handleFaq()
    expect(spy).toHaveBeenCalledWith(HelpLinks.FAQ, '_blank')
  })
})

describe('renderHelpItems', () => {
  it('should match snapshot', () => {
    expect(renderHelpItems(helpItems)).toMatchSnapshot()
  })
})
