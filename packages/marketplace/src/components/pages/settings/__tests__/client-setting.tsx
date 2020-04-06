import React from 'react'
import { shallow } from 'enzyme'
import { ClientSettingsPageProps, ClientSettingsPage, mapStateToProps, mapDispatchToProps } from '../client-setting'
import { ReduxState } from '@/types/core'

describe('ClientSettingsPage', () => {
  it('should match snapshot', () => {
    const mockProps: ClientSettingsPageProps = {
      customerId: 'DXX',
      logout: jest.fn(),
    }
    const wrapper = shallow(<ClientSettingsPage {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should respond to logout request', () => {
    const mockProps: ClientSettingsPageProps = {
      customerId: 'DXX',
      logout: jest.fn(),
    }
    const wrapper = shallow(<ClientSettingsPage {...mockProps} />)

    wrapper.find('[dataTest="logout-btn"]').simulate('click')

    expect(mockProps.logout).toHaveBeenCalledTimes(1)
  })

  describe('mapStateToProps', () => {
    it('should run correctly', () => {
      const mockState = {
        auth: {
          loginSession: {
            loginIdentity: {
              clientId: 'DXX',
            },
          },
        },
      } as ReduxState
      const output = {
        customerId: 'DXX',
      }
      const result = mapStateToProps(mockState)
      expect(result).toEqual(output)
    })

    it('should return empty', () => {
      const mockState = {
        settings: {},
        auth: {},
      } as ReduxState
      const output = {
        customerId: '',
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
  })
})
