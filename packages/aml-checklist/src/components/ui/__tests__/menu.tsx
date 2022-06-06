import React from 'react'
import { render } from '../../../tests/react-testing'
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
  it('should match snapshot', () => {
    const wrapper = render(
      <Provider store={store}>
        <Menu />
      </Provider>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
