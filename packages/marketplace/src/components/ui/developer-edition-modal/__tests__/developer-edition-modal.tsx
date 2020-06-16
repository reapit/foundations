import * as React from 'react'
import { mount, shallow } from 'enzyme'
import appState from '@/reducers/__stubs__/app-state'
import { DeveloperEditionModal } from '../developer-edition-modal'
import { Provider, useSelector } from 'react-redux'
import configureStore from 'redux-mock-store'
import { selectLoginIdentity } from '@/selector/auth'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(() => jest.fn()),
}))

describe('DeveloperEditionModal', () => {
  let store
  beforeEach(() => {
    const mockStore = configureStore()
    store = mockStore(appState)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot when visible', () => {
    const wrapper = mount(<DeveloperEditionModal visible={true} afterClose={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot when not visible', () => {
    const wrapper = shallow(<DeveloperEditionModal visible={false} afterClose={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should call hooks with correct params', () => {
    ;(useSelector as jest.Mocked<any>).mockImplementationOnce(() => appState.auth.loginSession?.loginIdentity)

    mount(
      <Provider store={store}>
        <DeveloperEditionModal visible={true} afterClose={jest.fn()} />
      </Provider>,
    )

    expect(useSelector).toHaveBeenCalledWith(selectLoginIdentity)
  })
})
