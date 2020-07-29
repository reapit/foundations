import * as React from 'react'
import { MemoryRouter, useLocation } from 'react-router'
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import appState from '@/reducers/__stubs__/app-state'
import { PrivateRouteWrapper } from '../private-route-wrapper'

const locationMock = { search: '', pathname: '/test' }
const dispatch = jest.fn()

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(() => dispatch),
  useSelector: jest.fn(() => jest.fn()),
}))

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLocation: jest.fn(() => locationMock),
}))

jest.mock('@/utils/auth-route', () => ({
  getDefaultRoute: jest.fn(() => 'login-type-route'),
}))

jest.mock('@/utils/cookie', () => ({
  ...jest.requireActual('@/utils/cookie'),
  getCookieString: jest.fn(() => 'cookie-string'),
}))

describe('PrivateRouteWrapper', () => {
  let store
  beforeEach(() => {
    const mockStore = configureStore()
    store = mockStore(appState)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const wrapper = shallow(<PrivateRouteWrapper path="/" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should call hooks and functions with correct params', () => {
    ;(useLocation as jest.Mocked<any>).mockImplementationOnce(() => ({ ...locationMock, pathname: '/' }))
    mount(
      <Provider store={store}>
        <MemoryRouter>
          <PrivateRouteWrapper path="/" />
        </MemoryRouter>
      </Provider>,
    )
    expect(useLocation).toHaveBeenCalled()
  })
})
