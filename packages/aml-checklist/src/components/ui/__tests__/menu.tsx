import React from 'react'
import { shallow } from 'enzyme'
import { Menu } from '../menu'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
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
  it('should match snapshot', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Menu />
      </Provider>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
