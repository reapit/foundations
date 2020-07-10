import * as React from 'react'
import { shallow } from 'enzyme'
import { Help, handleGotoWelcomeGuide } from '../help'
import Routes from '@/constants/routes'
import { history } from '@/core/router'

jest.mock('../../../../core/router', () => ({
  history: {
    push: jest.fn(),
  },
}))

describe('ClientHelpPage', () => {
  it('should match a snapshot', () => {
    expect(shallow(<Help />)).toMatchSnapshot()
  })
})

describe('handleGotoWelcomeGuide', () => {
  it('should called with correct props', () => {
    const spy = jest.spyOn(history, 'push')
    handleGotoWelcomeGuide()
    expect(spy).toHaveBeenCalledWith(Routes.WELCOME)
  })
})
