import * as React from 'react'
import { shallow } from 'enzyme'
import { popUp, SandboxPopUp, HALF_SECOND } from '../sandbox-pop-up'

const setOpen = jest.fn()
jest.useFakeTimers()
describe('popUp', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
  })
  it('should call setTimeout if loading = false', () => {
    const fn = popUp(setOpen, false)
    fn()
    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), HALF_SECOND)
  })
  it('should not call setTimeout if loading = true', () => {
    const fn = popUp(setOpen, true)
    fn()
    expect(setTimeout).not.toHaveBeenCalled()
  })
})

describe('SandboxPopUp', () => {
  it('should match snapshot with default', () => {
    expect(shallow(<SandboxPopUp />)).toMatchSnapshot()
  })
  it('should match snapshot with passed props', () => {
    expect(shallow(<SandboxPopUp loading={true} message="mess" />)).toMatchSnapshot()
  })
})
