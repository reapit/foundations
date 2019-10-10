import React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { FormState, ReduxState } from '@/types/core'
import { AppConfirmInstallContent, handleCloseModal, mapDispatchToProps, mapStateToProps } from '../app-confirm-install'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { appPermissionStub } from '@/sagas/__stubs__/app-permission'

describe('AppConfirmInstallContent', () => {
  it('render correctly', () => {
    const mockProps = {
      permissions: [{ name: 'Marketplace/developers.read', description: 'Read data about developers' }],
      requestInstall: jest.fn(),
      installDone: jest.fn(),
      appName: 'mockAppName',
      afterClose: jest.fn(),
      setAppDetailModalStateView: jest.fn()
    }
    const wrapper = shallow(<AppConfirmInstallContent appInstallFormState="PENDING" {...mockProps} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    const wrapper1 = shallow(<AppConfirmInstallContent appInstallFormState="DONE" {...mockProps} />)
    expect(toJson(wrapper1)).toMatchSnapshot()
    const wrapper2 = shallow(<AppConfirmInstallContent appInstallFormState="SUBMITTING" {...mockProps} />)
    expect(toJson(wrapper2)).toMatchSnapshot()
    const wrapper3 = shallow(<AppConfirmInstallContent appInstallFormState="ERROR" {...mockProps} />)
    expect(toJson(wrapper3)).toMatchSnapshot()
    const wrapper4 = shallow(<AppConfirmInstallContent appInstallFormState="SUCCESS" {...mockProps} />)
    expect(toJson(wrapper4)).toMatchSnapshot()
  })

  it('should return null when formState SUCCESS', () => {
    const mockProps = {
      permissions: [{ name: 'Marketplace/developers.read', description: 'Read data about developers' }],
      requestInstall: jest.fn(),
      installDone: jest.fn(),
      appName: 'mockAppName',
      afterClose: jest.fn(),
      setAppDetailModalStateView: jest.fn(),
      appInstallFormState: 'SUCCESS' as FormState
    }
    const wrapper = shallow(<AppConfirmInstallContent {...mockProps} />)
    expect(wrapper).toEqual({})
  })

  it('show confirm content', () => {
    const mockProps = {
      permissions: [{ name: 'Marketplace/developers.read', description: 'Read data about developers' }],
      requestInstall: jest.fn(),
      installDone: jest.fn(),
      appName: 'mockAppName',
      afterClose: jest.fn(),
      setAppDetailModalStateView: jest.fn(),
      appInstallFormState: 'PENDING' as FormState
    }
    const wrapper = shallow(<AppConfirmInstallContent {...mockProps} />)
    expect(wrapper.find('[data-test="confirm-content"]')).toHaveLength(1)
  })

  it('button agree show loading when agree install', () => {
    const mockProps = {
      permissions: [{ name: 'Marketplace/developers.read', description: 'Read data about developers' }],
      requestInstall: jest.fn(),
      installDone: jest.fn(),
      appName: 'mockAppName',
      afterClose: jest.fn(),
      setAppDetailModalStateView: jest.fn(),
      appInstallFormState: 'SUBMITTING' as FormState
    }
    const wrapper = mount(<AppConfirmInstallContent {...mockProps} />)
    expect(wrapper.find('[dataTest="agree-btn"]').prop('loading')).toEqual(true)
  })

  it('button disagree show loading when agree install', () => {
    const mockProps = {
      permissions: [{ name: 'Marketplace/developers.read', description: 'Read data about developers' }],
      requestInstall: jest.fn(),
      installDone: jest.fn(),
      appName: 'mockAppName',
      afterClose: jest.fn(),
      setAppDetailModalStateView: jest.fn(),
      appInstallFormState: 'SUBMITTING' as FormState
    }
    const wrapper = mount(<AppConfirmInstallContent {...mockProps} />)
    expect(wrapper.find('[dataTest="agree-btn"]').prop('loading')).toEqual(true)
  })
  it('handleCloseModal', () => {
    const afterClose = jest.fn()
    const setAppDetailModalStateView = jest.fn()
    const fn = handleCloseModal(afterClose, setAppDetailModalStateView)
    fn()
    expect(afterClose).toBeCalled()
    expect(setAppDetailModalStateView).toBeCalled()
  })

  describe('mapDispatchToProps', () => {
    const dispatch = jest.fn()
    const afterClose = jest.fn()
    const setAppDetailModalStateView = jest.fn()
    const fn = mapDispatchToProps(dispatch)
    it('should call dispatch when involke request install', () => {
      fn.requestInstall()
      expect(dispatch).toBeCalled()
    })
    it('should call dispatch when involke request install', () => {
      fn.setAppDetailModalStateView()
      expect(dispatch).toBeCalled()
    })
  })

  describe('mapStateToProps', () => {
    it('should return correct Props', () => {
      const mockState = {
        appDetail: {
          appDetailData: appDetailDataStub
        },
        appInstall: {
          formState: 'PENDING'
        }
      }
      const expected = {
        permissions: appPermissionStub,
        appName: `Peter's Properties`,
        appInstallFormState: 'PENDING'
      }
      const result = mapStateToProps(mockState as ReduxState)
      expect(result).toEqual(expected)
    })

    it('should return correct Props when no data', () => {
      const mockState = {
        appInstall: {
          formState: 'PENDING'
        }
      }
      const expected = {
        permissions: [],
        appName: '',
        appInstallFormState: 'PENDING'
      }
      const result = mapStateToProps(mockState as ReduxState)
      expect(result).toEqual(expected)
    })
  })
})
