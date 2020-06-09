import * as React from 'react'
import * as ReactRedux from 'react-redux'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import { UnsupportBrowerPopUp, popUp, TIMEOUT_DURATION } from '../unsupport-brower-pop-up'
import appState from '@/reducers/__stubs__/app-state'

const setOpen = jest.fn()
jest.useFakeTimers()
describe('UnsupportBrowerPopUp popup', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
  })
  it('should call setTimeout if unsupported = true', () => {
    const fn = popUp(setOpen, true)
    fn()
    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), TIMEOUT_DURATION)
  })
  it('should not call setTimeout if unsupported = false', () => {
    const fn = popUp(setOpen, false)
    fn()
    expect(setTimeout).not.toHaveBeenCalled()
  })
})

describe('UnsupportBrowerPopUp', () => {
  const mockStore = configureStore()
  const store = mockStore(appState)
  const createComponent = ({ unsupported, message }) => (
    <ReactRedux.Provider store={store}>
      <UnsupportBrowerPopUp unsupported={unsupported} message={message} />
    </ReactRedux.Provider>
  )

  it('should match snapshot with default', () => {
    expect(shallow(createComponent({ unsupported: false, message: '' }))).toMatchSnapshot()
  })
  it('should match snapshot with passed props', () => {
    expect(shallow(createComponent({ unsupported: true, message: 'message' }))).toMatchSnapshot()
  })
})
