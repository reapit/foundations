import * as React from 'react'
import * as ReactRedux from 'react-redux'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import { popUp, SandboxPopUp, HALF_SECOND } from '../sandbox-pop-up'
import appState from '@/reducers/__stubs__/app-state'

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
  const mockStore = configureStore()
  const store = mockStore(appState)
  const createComponent = ({ loading, message }) => (
    <ReactRedux.Provider store={store}>
      <SandboxPopUp loading={loading} message={message} />
    </ReactRedux.Provider>
  )

  it('should match snapshot with default', () => {
    expect(shallow(createComponent({ loading: false, message: '' }))).toMatchSnapshot()
  })
  it('should match snapshot with passed props', () => {
    expect(shallow(createComponent({ loading: true, message: 'message' }))).toMatchSnapshot()
  })
})
