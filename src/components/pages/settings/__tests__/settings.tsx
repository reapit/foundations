import React from 'react'
import { shallow } from 'enzyme'
import { SettingsPageProps, SettingsPage, mapStateToProps, mapDispatchToProps } from '../settings'
import { ReduxState } from '@/types/core'
import { developerStub } from '@/sagas/__stubs__/developer'

describe('SettingsPage', () => {
  it('should match snapshot', () => {
    const mockProps: SettingsPageProps = {
      email: 'test@gmail.com',
      developerInfo: developerStub,
      loading: true,
      updateDeveloperInformation: jest.fn(),
      changePassword: jest.fn()
    }
    const wrapper = shallow(<SettingsPage {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })
  it('should match snapshot', () => {
    const mockProps: SettingsPageProps = {
      email: 'test@gmail.com',
      developerInfo: developerStub,
      loading: false,
      updateDeveloperInformation: jest.fn(),
      changePassword: jest.fn()
    }
    const wrapper = shallow(<SettingsPage {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('mapStateToProps', () => {
    it('should run correctly', () => {
      const mockState = {
        settings: {
          loading: true,
          developerInfomation: developerStub
        },
        auth: {
          loginSession: {
            loginIdentity: {
              email: developerStub.email
            }
          }
        }
      } as ReduxState
      const output = {
        developerInfo: mockState.settings.developerInfomation,
        email: mockState.auth?.loginSession?.loginIdentity?.email,
        loading: mockState.settings.loading
      }
      const result = mapStateToProps(mockState)
      expect(result).toEqual(output)
    })

    it('should return null', () => {
      const mockState = {
        settings: {},
        auth: {}
      } as ReduxState
      const output = {
        developerInfo: mockState.settings.developerInfomation || {},
        email: mockState.auth?.loginSession?.loginIdentity?.email || '',
        loading: mockState.settings?.loading
      }
      const result = mapStateToProps(mockState)
      expect(result).toEqual(output)
    })
  })
  describe('mapDispatchToProps', () => {
    it('should call dispatch when logout', () => {
      const mockDispatch = jest.fn()
      const { updateDeveloperInformation } = mapDispatchToProps(mockDispatch)
      updateDeveloperInformation({ name: '123', companyName: '123', jobTitle: '123', telephone: '1234567890' })
      expect(mockDispatch).toBeCalled()
    })

    it('should call dispatch when errorNotification', () => {
      const mockDispatch = jest.fn()
      const { changePassword } = mapDispatchToProps(mockDispatch)
      changePassword({ currentPassword: '123', password: '1232', confirmPassword: '1232' })
      expect(mockDispatch).toBeCalled()
    })
  })
})
