import React from 'react'
import { shallow } from 'enzyme'
import SettingsPage, { getCurrentUserRole } from '../settings'
import { ReduxState } from '@/types/core'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import appState from '@/reducers/__stubs__/app-state'

const mockState = {
  ...appState,
  auth: {
    loginSession: {
      loginIdentity: {
        isAdmin: true,
      },
    },
  },
} as ReduxState

describe('SettingsPage', () => {
  describe('SettingsPage', () => {
    it('should match snapshot', () => {
      const mockStore = configureStore()
      const store = mockStore(mockState)

      const wrapper = shallow(
        <Provider store={store}>
          <SettingsPage />
        </Provider>,
      )
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('getCurrentUserRole', () => {
    it('should return admin', () => {
      const mockInvitedMember = [
        {
          id: 'Y2JyeWFuQHJlYXBpdC5jb20=',
          created: '2020-07-31T21:30:31',
          email: 'cbryan@reapit.com',
          name: 'Craig Lorem',
          jobTitle: 'Head of Platform',
          status: 'active',
          role: 'admin',
          developerId: '909dcdc1-6657-4a37-a5cc-05acd79d6a47',
          agencyCloudAccess: false,
        },
      ]
      const developerEmail = 'cbryan@reapit.com'
      const role = getCurrentUserRole(mockInvitedMember, developerEmail)
      expect(role).toEqual('admin')
    })

    it('should return user', () => {
      const mockInvitedMember = [
        {
          id: 'Y2JyeWFuQHJlYXBpdC5jb20=',
          created: '2020-07-31T21:30:31',
          email: 'cbryan@reapit.com',
          name: 'Craig Lorem',
          jobTitle: 'Head of Platform',
          status: 'active',
          role: 'user',
          developerId: '909dcdc1-6657-4a37-a5cc-05acd79d6a47',
          agencyCloudAccess: false,
        },
      ]
      const developerEmail = 'cbryan@reapit.com'
      const role = getCurrentUserRole(mockInvitedMember, developerEmail)
      expect(role).toEqual('user')
    })

    it('should return undefined', () => {
      const mockInvitedMember = [
        {
          id: 'Y2JyeWFuQHJlYXBpdC5jb20=',
          created: '2020-07-31T21:30:31',
          email: 'cbryan@reapit.com',
          name: 'Craig Lorem',
          jobTitle: 'Head of Platform',
          status: 'active',
          role: 'admin',
          developerId: '909dcdc1-6657-4a37-a5cc-05acd79d6a47',
          agencyCloudAccess: false,
        },
      ]
      const developerEmail = 'cbryan1@reapit.com'
      const role = getCurrentUserRole(mockInvitedMember, developerEmail)
      expect(role).toEqual(undefined)
    })
  })
})
