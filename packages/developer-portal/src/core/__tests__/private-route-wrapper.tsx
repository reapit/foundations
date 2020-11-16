import * as React from 'react'
import { MemoryRouter, useLocation } from 'react-router'
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import appState from '@/reducers/__stubs__/app-state'
import { handleUpdateTerms, PrivateRouteWrapper } from '../private-route-wrapper'
import { updateCurrentMember } from '../../actions/current-member'
import dayjs from 'dayjs'
import { DATE_TIME_FORMAT } from '@reapit/elements'

const locationMock = { search: '', pathname: '/test' }
const dispatch = jest.fn()

jest.mock('react-redux', () => ({
  ...(jest.requireActual('react-redux') as Object),
  useDispatch: jest.fn(() => dispatch),
  useSelector: jest.fn(() => jest.fn()),
}))

jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as Object),
  useLocation: jest.fn(() => locationMock),
}))

jest.mock('@/utils/auth-route', () => ({
  getDefaultRoute: jest.fn(() => 'login-type-route'),
}))

jest.mock('@/utils/cookie', () => ({
  ...(jest.requireActual('@/utils/cookie') as Object),
  getCookieString: jest.fn(() => 'cookie-string'),
}))

jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: () => ({
    connectSession: {},
    connectInternalRedirect: '',
  }),
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

  it('should correctly call update terms', () => {
    const mockDispatch = jest.fn()
    const fn = handleUpdateTerms(mockDispatch)
    fn()
    expect(mockDispatch).toHaveBeenCalledWith(
      updateCurrentMember({
        agreedTerms: dayjs().format(DATE_TIME_FORMAT.RFC3339),
      }),
    )
  })
})
