import * as React from 'react'
import { shallow, mount } from 'enzyme'
import { HelpPage, HelpPageProps } from '../help'
import routes from '@/constants/routes'
import { history } from '@/core/router'

const mockProps: HelpPageProps = {}

describe('HelpPage', () => {
  const { open } = window

  beforeAll(() => {
    delete window.open
    window.open = jest.fn()
  })

  afterAll(() => {
    window.open = open
  })

  it('should match a snapshot', () => {
    expect(shallow(<HelpPage {...mockProps} />)).toMatchSnapshot()
  })

  it('handleReportBug', () => {
    const wrapper = mount(<HelpPage {...mockProps} />)
    const btnReportBug = wrapper.find('[data-testid="btnReportBug"]')
    btnReportBug.props().onClick!({} as any)
    expect(window.open).toBeCalled()
  })

  it('handleRequestEndpoint', () => {
    const wrapper = mount(<HelpPage {...mockProps} />)
    const btnRequestEndPoint = wrapper.find('[data-testid="btnRequestEndPoint"]')
    btnRequestEndPoint.props().onClick!({} as any)
    expect(window.open).toBeCalled()
  })

  it('handleGotoWelcomeGuide', () => {
    const wrapper = mount(<HelpPage {...mockProps} />)
    const btnGotoWelcomeGuide = wrapper.find('[data-testid="btnGotoWelcomeGuide"]')
    jest.spyOn(history, 'push')
    btnGotoWelcomeGuide.props().onClick!({} as any)
    expect(history.push).toBeCalledWith(routes.DEVELOPER_WELCOME)
  })
})
