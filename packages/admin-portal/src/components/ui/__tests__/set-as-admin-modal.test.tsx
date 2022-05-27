import SetAsAdminModal, { handleSetAsAdmin, handleAfterSetAdmin } from '../set-as-admin-modal'
import { render } from '../../../tests/react-testing'
import * as React from 'react'
import configureStore from 'redux-mock-store'
import appState from '@/reducers/__stubs__/app-state'
import * as ReactRedux from 'react-redux'
import { setAsAdmin } from '@/actions/devs-management'

describe('SetAsAdminModal', () => {
  it('should match snapshot', () => {
    const user = {
      name: 'Jill Hill',
    }
    const mockStore = configureStore()
    const store = mockStore(appState)

    expect(
      render(
        <ReactRedux.Provider store={store}>
          <SetAsAdminModal visible user={user} />
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })
})

describe('handleSetAsAdmin', () => {
  it('handleSetAsAdmin', () => {
    const dispatch = jest.fn()
    const data = {
      id: '18eb6bf3-ca6f-4ecd-a3d5-14f8021bce2d',
      created: '2020-08-10T12:21:43',
      modified: '2020-08-19T07:09:06',
      email: 'pete.littlewood+anothernewmember@gmail.com',
      name: 'P R Littlewood',
      jobTitle: 'Developer',
      status: 'active',
      role: 'user',
      developerId: '909dcdc1-6657-4a37-a5cc-05acd79d6a47',
      agencyCloudAccess: false,
    }
    const closeModal = jest.fn()
    const fn = handleSetAsAdmin(dispatch, data, closeModal)
    fn()
    const params = {
      id: data.developerId,
      memberId: data.id,
      name: data.name,
      jobTitle: data.jobTitle,
      role: 'admin',
      callback: closeModal,
    }
    expect(dispatch).toBeCalledWith(setAsAdmin(params))
  })
})

describe('handleAfterSetAdmin', () => {
  it('handleAfterSetAdmin', () => {
    const setIsSuccess = jest.fn()
    const fn = handleAfterSetAdmin(setIsSuccess)
    fn()
    expect(setIsSuccess).toBeCalledWith(true)
  })
})
