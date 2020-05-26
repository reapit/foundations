import React from 'react'
import {
  updateWebComponentConfig,
  handleFetchWebComponentConfig,
  WebComponentConfigModalFooter,
  WebComponentConfigModalInner,
  genarateNegotiatorOptions,
} from '../config-modal-inner'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { WEB_COMPONENT_TYPES } from '../config-modal'
import { PutWebComponentConfigParams } from '@/services/web-component'
import { clientPutWebComponentConfig, clientFetchWebComponentConfig } from '@/actions/client'
import { webComponentStub } from '../__stubs__/web-component-config'
import appState from '@/reducers/__stubs__/app-state'

const params = {
  appointmentLength: 1,
  appointmentTimeGap: 1,
  customerId: 'string',
  daysOfWeek: ['1', '2'],
} as PutWebComponentConfigParams

const extendAppState = webComponent => {
  return {
    ...appState,
    client: { ...appState.client, webComponent },
  }
}

describe('Config-modal-inner', () => {
  const mockStore = configureStore()
  const store = mockStore(extendAppState(webComponentStub))

  it('should WebComponentConfigModalFooter match a snapshot', () => {
    const mockProps = {
      closeModal: jest.fn(),
    }
    expect(
      mount(
        <Provider store={store}>
          <WebComponentConfigModalFooter {...mockProps} />
        </Provider>,
      ),
    ).toMatchSnapshot()
  })

  it('should WebComponentConfigModalInner match a snapshot', () => {
    const mockStore = configureStore()
    const store = mockStore(extendAppState(webComponentStub))
    expect(
      mount(
        <Provider store={store}>
          <WebComponentConfigModalInner config={WEB_COMPONENT_TYPES['BOOK_VIEWING']} closeModal={jest.fn()} />
        </Provider>,
      ),
    ).toMatchSnapshot()
  })

  it('should updateWebComponentConfig run correctly', () => {
    const dispatch = jest.fn()

    const fn = updateWebComponentConfig(dispatch)
    fn(params)
    expect(dispatch).toBeCalledWith(clientPutWebComponentConfig(params))
  })

  it('should handleFetchWebComponentConfig run correctly', () => {
    const dispatch = jest.fn()
    const customerId = 'string'

    const fn = handleFetchWebComponentConfig(dispatch, customerId)
    fn()
    expect(dispatch).toBeCalledWith(clientFetchWebComponentConfig({ customerId }))
  })
})

describe('should return correctly', () => {
  it('should return correctly', () => {
    const list = [
      {
        active: true,
        created: 'string',
        email: 'string',
        id: 'string',
        jobTitle: 'string',
        metadata: 'any',
        mobilePhone: 'string',
        modified: 'string',
        name: 'string',
        officeId: 'string',
        workPhone: 'string',
      },
    ]

    const result = genarateNegotiatorOptions(list)
    const expected = [{ value: 'string', label: 'string', description: 'string' }]
    expect(result).toEqual(expected)
  })
})
