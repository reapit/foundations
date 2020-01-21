import * as React from 'react'
import { shallow } from 'enzyme'
import ApiDocs, { handleUseLayoutEffect } from '../api-docs'

jest.mock('../../../core/store')
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(() => ({
    location: { hash: '' }
  }))
}))

let scrollIntoViewMock
beforeEach(() => {
  document.body.innerHTML = '<div><p id="api"></p><p id="authorization"></p><div>'
  scrollIntoViewMock = jest.fn()
  HTMLElement.prototype.scrollIntoView = scrollIntoViewMock
})

describe('ApiDocs', () => {
  it('should match a snapshot', () => {
    expect(shallow(<ApiDocs />)).toMatchSnapshot()
    jest.resetModules()
  })

  it('should match snapshot after changing hash', () => {
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useLocation: jest.fn(() => ({
        location: { hash: '#authorization' }
      }))
    }))
    expect(shallow(<ApiDocs />)).toMatchSnapshot()
  })

  it('should call scrollIntoView when have matching id', () => {
    const fn = handleUseLayoutEffect('#authorization')
    fn()
    expect(scrollIntoViewMock).toBeCalled()
  })

  it('should not call scrollIntoView when no matching id', () => {
    const fn = handleUseLayoutEffect('#authorization123')
    fn()
    expect(scrollIntoViewMock).toHaveBeenCalledTimes(0)
  })

  it('should not call scrollIntoView when there no hash', () => {
    const fn = handleUseLayoutEffect('')
    fn()
    expect(scrollIntoViewMock).not.toBeCalled()
  })
})
