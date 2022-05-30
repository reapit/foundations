import React from 'react'
import {
  WebComponentConfigModalFooter,
  WebComponentConfigModalInner,
  genarateNegotiatorOptions,
  handleUpdateWebComponentConfig,
} from '../config-modal-inner'
import { render } from '../../../tests/react-testing'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { UpdateWebComponentConfigParams } from '@/services/web-component'
import appState from '@/reducers/__stubs__/app-state'
import { FormikProps } from '@reapit/elements-legacy'

const params = {
  appId: 'appid',
  appointmentLength: 1,
  appointmentTimeGap: 1,
  customerId: 'string',
  daysOfWeek: ['1', '2'],
} as UpdateWebComponentConfigParams

const extendAppState = (webComponent) => {
  return {
    ...appState,
    webComponent,
  }
}

describe('Config-modal-inner', () => {
  const mockStore = configureStore()
  const store = mockStore(
    extendAppState({
      appointmentLength: 1,
      appointmentTimeGap: 1,
      appointmentTypes: 'abc',
      customerId: 'mockCustomers',
      negotiatorIds: ['12', '34'],
      daysOfWeek: ['monday'],
    }),
  )

  it('should WebComponentConfigModalFooter match a snapshot', () => {
    const mockProps = {
      closeModal: jest.fn(),
      formikProps: {} as FormikProps<any>,
    }
    expect(
      render(
        <Provider store={store}>
          <WebComponentConfigModalFooter {...mockProps} />
        </Provider>,
      ),
    ).toMatchSnapshot()
  })

  it('should WebComponentConfigModalInner match a snapshot', () => {
    const mockStore = configureStore()
    const store = mockStore(
      extendAppState({
        appointmentLength: 1,
        appointmentTimeGap: 1,
        appointmentTypes: 'abc',
        customerId: 'mockCustomers',
        negotiatorIds: ['12', '34'],
        daysOfWeek: ['monday'],
      }),
    )
    expect(
      render(
        <Provider store={store}>
          <WebComponentConfigModalInner closeModal={jest.fn()} />
        </Provider>,
      ),
    ).toMatchSnapshot()
  })

  it('should handleUpdateWebComponentConfig run correctly', () => {
    const dispatch = jest.fn()
    const closeModal = jest.fn()

    const fn = handleUpdateWebComponentConfig(dispatch, 'appid', closeModal)
    fn(params)
    expect(dispatch).toBeCalled()
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
