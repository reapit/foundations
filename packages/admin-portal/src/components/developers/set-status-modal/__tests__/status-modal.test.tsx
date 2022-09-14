import { onSubmitStatus, StatusModal, onAfterSubmit } from '../status-modal'
import { setRequestDeveloperStatusFormState } from '@/actions/developer-set-status'
import { render } from '../../../../tests/react-testing'
import React from 'react'
import configureStore from 'redux-mock-store'
import { DeveloperModelPagedResult } from '@reapit/foundations-ts-definitions'
import appState from '@/reducers/__stubs__/app-state'
import * as ReactRedux from 'react-redux'

const createStore = (loading: boolean, data?: DeveloperModelPagedResult) => {
  return {
    ...appState,
    adminDevManagement: {
      loading,
      ...(data ? { data } : {}),
    },
  }
}

describe('onSubmitStatus', () => {
  it('should run correctly', () => {
    const developer = {}
    const dispatch = jest.fn()
    const setSubmitting = jest.fn()
    const onAfterSubmit = jest.fn()
    const fn = onSubmitStatus(developer, dispatch, setSubmitting, onAfterSubmit)
    const params = { status: 'status', reapitReference: 'reapitReference' }
    fn(params)
    expect(setSubmitting).toBeCalledWith(true)
    expect(dispatch).toBeCalledWith(
      setRequestDeveloperStatusFormState({
        ...developer,
        status: params.status,
        reapitReference: params.reapitReference,
        callback: onAfterSubmit,
      }),
    )
  })
})

describe('onAfterSubmit', () => {
  const setSubmitting = jest.fn()
  const onClose = jest.fn()
  const fn = onAfterSubmit(setSubmitting, onClose)
  fn(true)
  expect(setSubmitting).toBeCalledWith(false)
  expect(onClose).toBeCalled()
})

describe('StatusModal', () => {
  let store, mockStore
  beforeEach(() => {
    mockStore = configureStore()
  })
  it('should match snapshot', () => {
    store = mockStore(createStore(false, {}))

    expect(
      render(
        <ReactRedux.Provider store={store}>
          <StatusModal visible developer={{}} resetModal={jest.fn()} />
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })
})
