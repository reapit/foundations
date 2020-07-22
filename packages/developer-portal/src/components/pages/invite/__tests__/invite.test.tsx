import React from 'react'
import { shallow, mount } from 'enzyme'
import Invite, { FooterModal, FooterModalProps, handleReject, handleSubmit, handleFetchDeveloperData } from '../invite'
import configureStore from 'redux-mock-store'
import appState from '@/reducers/__stubs__/app-state'
import * as ReactRedux from 'react-redux'
import { MemoryRouter } from 'react-router'
import Routes from '@/constants/routes'
import { rejectInviteMember, acceptInviteMember, fetchDeveloperDetails, fetchMemberDetails } from '@/actions/developers'

describe('AcceptedModal', () => {
  it('should match snapshot', () => {
    const mockStore = configureStore()
    const store = mockStore(appState)

    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.INVITE, key: 'inviteRoute' }]}>
            <Invite />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })
})

describe('FooterModal', () => {
  it('should match snapshot', () => {
    const props = {
      onConfirm: jest.fn(),
      onReject: jest.fn(),
      inviteStatus: 'PENDING',
    } as FooterModalProps
    expect(shallow(<FooterModal {...props} />)).toMatchSnapshot()
  })
})

describe('handleReject', () => {
  it('should run correctly', () => {
    const dispatch = jest.fn()
    const developerId = 'developerId'
    const memberId = 'memberId'
    const fn = handleReject(dispatch, developerId, memberId)
    fn()
    expect(dispatch).toBeCalledWith(rejectInviteMember({ developerId, memberId }))
  })
})

describe('handleSubmit', () => {
  it('should run correctly', () => {
    const dispatch = jest.fn()
    const developerId = 'developerId'
    const memberId = 'memberId'
    const params = {
      name: 'name',
      jobTitle: 'CTO',
    }
    const fn = handleSubmit(dispatch, developerId, memberId)
    fn(params)
    expect(dispatch).toBeCalledWith(acceptInviteMember({ developerId, memberId, ...params }))
  })
})

describe('handleFetchDeveloperData', () => {
  it('should run correctly', () => {
    const dispatch = jest.fn()
    const developerId = 'developerId'
    const memberId = 'memberId'

    const fn = handleFetchDeveloperData(dispatch, developerId, memberId)
    fn()
    expect(dispatch).toBeCalledWith(fetchDeveloperDetails({ id: developerId }))
    expect(dispatch).toBeCalledWith(fetchMemberDetails({ memberId, developerId }))
  })
})
