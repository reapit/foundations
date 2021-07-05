import * as React from 'react'
import { shallow } from 'enzyme'
import { Menu } from '../menu'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'

jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as Object),
  useLocation: jest.fn(() => ({
    location: 'location',
  })),
}))

describe('Menu', () => {
  let store
  beforeEach(() => {
    const mockStore = configureStore()
    store = mockStore({})
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match a snapshot', () => {
    expect(
      shallow(
        <Provider store={store}>
          <Menu />
        </Provider>,
      ),
    ).toMatchSnapshot()
  })

  // See component - commenting out until Christmas!
  // describe('XmasLogo', () => {
  //   it('should match a snapshot', () => {
  //     expect(shallow(<XmasLogo />)).toMatchSnapshot()
  //   })
  // })
})
