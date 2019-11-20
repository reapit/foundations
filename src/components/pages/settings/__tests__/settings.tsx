import React from 'react'
import { shallow } from 'enzyme'
import { SettingsPageProps, SettingsPage, mapStateToProps, handleUseEffect, mapDispatchToProps } from '../settings'
import { ReduxState } from '@/types/core'

const mockDeveloperInformation = {
  id: '7b2517b3-aad3-4ad8-b31c-988a4b3d112d',
  externalId: 'ecaf36e1-2b4c-46c2-90d8-1cb493e5dcbd',
  name: 'Reapit Ltd',
  company: 'Reapit Ltd',
  jobTitle: 'Head of Cloud',
  email: 'wmcvay@reapit.com',
  telephone: '01234 567890',
  created: '2019-07-31T11:34:30',
  modified: '2019-11-18T08:04:52'
}

jest.mock('@reapit/elements', () => ({
  fetcher: jest.fn().mockResolvedValue(mockDeveloperInformation)
}))

describe('SettingsPage', () => {
  it('should match snapshot', () => {
    const mockProps: SettingsPageProps = {
      developerId: '7b2517b3-aad3-4ad8-b31c-988a4b3d112d',
      logout: jest.fn(),
      errorNotification: jest.fn()
    }
    const wrapper = shallow(<SettingsPage {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })
  it('should match snapshot', () => {
    const mockProps: SettingsPageProps = {
      developerId: null,
      logout: jest.fn(),
      errorNotification: jest.fn()
    }
    const wrapper = shallow(<SettingsPage {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })
  describe('handleUseEffect', () => {
    it('should run correctly', done => {
      const mockProps = { developerId: '123', setDeveloperInformation: jest.fn(), setLoading: jest.fn() }
      const fn = handleUseEffect(mockProps)
      fn()
      setTimeout(() => {
        expect(mockProps.setDeveloperInformation).toBeCalled()
        expect(mockProps.setLoading).toBeCalled()
        done()
      }, 100)
    })
  })
  describe('mapStateToProps', () => {
    it('should run correctly', () => {
      const mockState = {
        auth: {
          loginSession: {
            loginIdentity: {
              developerId: '123'
            }
          }
        }
      } as ReduxState
      const output = {
        developerId: mockState.auth?.loginSession?.loginIdentity.developerId
      }
      const result = mapStateToProps(mockState)
      expect(result).toEqual(output)
    })

    it('should return null', () => {
      const mockState = {
        auth: {}
      } as ReduxState
      const output = {
        developerId: null
      }
      const result = mapStateToProps(mockState)
      expect(result).toEqual(output)
    })
  })
  describe('mapDispatchToProps', () => {
    it('should call dispatch when logout', () => {
      const mockDispatch = jest.fn()
      const { logout } = mapDispatchToProps(mockDispatch)
      logout()
      expect(mockDispatch).toBeCalled()
    })

    it('should call dispatch when errorNotification', () => {
      const mockDispatch = jest.fn()
      const { errorNotification } = mapDispatchToProps(mockDispatch)
      errorNotification()
      expect(mockDispatch).toBeCalled()
    })
  })
})
