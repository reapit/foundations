import React from 'react'
import { ReduxState } from '@/types/core'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { DeveloperAppDetailState } from '@/reducers/developer'
import { Aside, ManageApp, renderListedStatus } from '../aside'
import { shallow } from 'enzyme'
import { integrationTypesStub } from '@/sagas/__stubs__/integration-types'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { DesktopIntegrationTypeModel } from '@reapit/foundations-ts-definitions'

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'), // use actual for all non-hook parts
  useHistory: () => ({ push: jest.fn() }),
}))

describe('Aside', () => {
  test('Aside - should match snapshot', () => {
    expect(
      shallow(
        <Aside
          appDetailState={appDetailDataStub as DeveloperAppDetailState}
          desktopIntegrationTypes={integrationTypesStub.data as DesktopIntegrationTypeModel[]}
        />,
      ),
    ).toMatchSnapshot()
  })

  describe('renderListedStatus', () => {
    it('should render listed if isListed = true', () => {
      const result = renderListedStatus(true)
      const wrapper = shallow(<div>{result}</div>)
      expect(wrapper.text()).toBe('Listed <FaCheck />')
      expect(wrapper).toMatchSnapshot()
    })
    it('should render listed if isListed = false', () => {
      const result = renderListedStatus(false)
      const wrapper = shallow(<div>{result}</div>)
      expect(wrapper.text()).toBe('Not Listed')
      expect(wrapper).toMatchSnapshot()
    })
  })

  test('ManageApp - should match snapshot', () => {
    const mockStore = configureStore()
    const mockState = {
      auth: {
        loginSession: {
          loginIdentity: {
            clientId: '1',
          },
        },
      },
    } as ReduxState
    const store = mockStore(mockState)

    expect(
      shallow(
        <Provider store={store}>
          <ManageApp id="test" pendingRevisions={false} appDetailState={appDetailDataStub as DeveloperAppDetailState} />
        </Provider>,
      ),
    ).toMatchSnapshot()
  })
})
