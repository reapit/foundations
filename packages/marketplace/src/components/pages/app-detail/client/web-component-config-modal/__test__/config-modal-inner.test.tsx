import React from 'react'
import {
  updateWebComponentConfig,
  WebComponentConfigModalFooter,
  WebComponentConfigModalInner,
  genarateNegotiatorOptions,
} from '../config-modal-inner'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { UpdateWebComponentConfigParams } from '@/services/web-component'
import { clientUpdateWebComponentConfig } from '@/actions/client'
import { webComponentStub } from '../__stubs__/web-component-config'
import appState from '@/reducers/__stubs__/app-state'
import { FormikProps } from '@reapit/elements'

const params = {
  appId: 'appid',
  appointmentLength: 1,
  appointmentTimeGap: 1,
  customerId: 'string',
  daysOfWeek: ['1', '2'],
} as UpdateWebComponentConfigParams

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
      formikProps: {} as FormikProps<any>,
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
          <WebComponentConfigModalInner closeModal={jest.fn()} />
        </Provider>,
      ),
    ).toMatchSnapshot()
  })

  it('should updateWebComponentConfig run correctly', () => {
    const dispatch = jest.fn()
    const closeModal = jest.fn()

    const fn = updateWebComponentConfig(dispatch, 'appid', closeModal)
    fn(params)
    expect(dispatch).toBeCalledWith(clientUpdateWebComponentConfig({ ...params, callback: closeModal }))
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
    ] as any

    const result = genarateNegotiatorOptions(list)
    const expected = [{ value: 'string', label: 'string', description: 'string' }]
    expect(result).toEqual(expected)
  })
})
