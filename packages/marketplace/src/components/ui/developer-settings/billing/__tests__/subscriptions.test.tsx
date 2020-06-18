import {
  TimeCell,
  genarateTableData,
  handleFetchSubscriptions,
  handleDeleteSubscription,
  Subcriptions,
  handleCloseConfirmModal,
} from '../subscriptions'
import { SubscriptionModel } from '@/services/subscriptions'
import { developerFetchSubscriptions, developerDeleteSubscription } from '@/actions/developer'
import * as ReactRedux from 'react-redux'
import configureStore from 'redux-mock-store'
import appState from '@/reducers/__stubs__/app-state'
import { mount } from 'enzyme'
import React from 'react'

describe('TimeCell', () => {
  it('should match snapshot', () => {
    expect(TimeCell({ cell: { value: '02-02-2020' } })).toMatchSnapshot()
  })
})

describe('genarateTableData', () => {
  it('should match snapshot', () => {
    const data = [
      {
        id: '201fa563-0b11-4576-8a11-9c9ea5cb93a8',
        created: '2020-06-15T03:48:40',
        renews: '2020-07-15',
        developerId: '909dcdc1-6657-4a37-a5cc-05acd79d6a47',
        applicationId: 'fefeee6e-0661-440e-80c3-4e3d4c2198c4',
        user: 'test@reapit.com',
        type: 'applicationListing',
        summary: 'Application listing for Messenger',
        cost: 100,
        frequency: 'monthly',
      },
    ] as SubscriptionModel[]
    const fn = jest.fn()

    const result = genarateTableData(data, fn)
    const wrapper = result[0].cancel
    expect(wrapper).toMatchSnapshot()
  })
})

describe('handleFetchSubscriptions', () => {
  it('should run correctly', () => {
    const dispatch = jest.fn()
    const developerId = 'developerId'
    const fn = handleFetchSubscriptions(dispatch, developerId)
    fn()
    expect(dispatch).toBeCalledWith(developerFetchSubscriptions({ developerId }))
  })
})

describe('handleDeleteSubscription', () => {
  it('should run correctly', () => {
    const dispatch = jest.fn()
    const closeModal = jest.fn()
    const id = 'id'
    const fn = handleDeleteSubscription(dispatch, id, closeModal)
    fn()
    expect(dispatch).toBeCalledWith(developerDeleteSubscription(id))
    expect(closeModal).toBeCalled()
  })
})

describe('Subcriptions', () => {
  it('should match snapshot', () => {
    let store
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(appState)

    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <Subcriptions />
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })
})

describe('handleCloseConfirmModal', () => {
  it('should run correctly', () => {
    const setIsConfirmModalOpen = jest.fn()
    const fn = handleCloseConfirmModal(setIsConfirmModalOpen)
    fn()
    expect(setIsConfirmModalOpen).toBeCalledWith(false)
  })
})
