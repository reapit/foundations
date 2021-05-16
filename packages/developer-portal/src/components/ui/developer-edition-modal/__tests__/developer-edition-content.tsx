import * as React from 'react'
import { shallow } from 'enzyme'
import { DeveloperEditionContent } from '../developer-edition-content'
import configureStore from 'redux-mock-store'
import appState from '../../../../reducers/__stubs__/app-state'
import { Provider } from 'react-redux'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'

const developer = { value: 'value', label: 'label', description: 'description' } as Partial<DeveloperModel>

describe('DeveloperEditionContent', () => {
  it('should match snapshot', () => {
    let store
    const mockStore = configureStore()
    store = mockStore(appState)

    const wrapper = shallow(
      <Provider store={store}>
        <DeveloperEditionContent developer={developer} loading={false} handleOnConfirm={jest.fn()} />,
      </Provider>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
