import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { FormState, ReduxState } from '@/types/core'
import { AppConfirmUninstall, handleCloseModal, mapDispatchToProps, mapStateToProps } from '../app-confirm-uninstall'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'

describe('AppConfirmUninstall', () => {
  it('render correctly', () => {
    const mockProps = {
      requestUninstall: jest.fn(),
      uninstallDone: jest.fn(),
      appName: 'mockAppName',
      afterClose: jest.fn(),
      setAppDetailModalStateView: jest.fn()
    }
    const wrapper = shallow(<AppConfirmUninstall appUninstallFormState="PENDING" {...mockProps} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    const wrapper1 = shallow(<AppConfirmUninstall appUninstallFormState="DONE" {...mockProps} />)
    expect(toJson(wrapper1)).toMatchSnapshot()
    const wrapper2 = shallow(<AppConfirmUninstall appUninstallFormState="SUBMITTING" {...mockProps} />)
    expect(toJson(wrapper2)).toMatchSnapshot()
    const wrapper3 = shallow(<AppConfirmUninstall appUninstallFormState="ERROR" {...mockProps} />)
    expect(toJson(wrapper3)).toMatchSnapshot()
    const wrapper4 = shallow(<AppConfirmUninstall appUninstallFormState="SUCCESS" {...mockProps} />)
    expect(toJson(wrapper4)).toMatchSnapshot()
  })

  it('should return null when appUninstallFormState SUCCESS', () => {
    const mockProps = {
      requestUninstall: jest.fn(),
      uninstallDone: jest.fn(),
      appName: 'mockAppName',
      afterClose: jest.fn(),
      setAppDetailModalStateView: jest.fn(),
      appUninstallFormState: 'SUCCESS' as FormState
    }
    const wrapper = shallow(<AppConfirmUninstall {...mockProps} />)
    expect(wrapper).toEqual({})
  })

  it('show confirm content', () => {
    const mockProps = {
      requestUninstall: jest.fn(),
      uninstallDone: jest.fn(),
      appName: 'mockAppName',
      afterClose: jest.fn(),
      setAppDetailModalStateView: jest.fn(),
      appUninstallFormState: 'PENDING' as FormState
    }
    const wrapper = shallow(<AppConfirmUninstall {...mockProps} />)
    expect(wrapper.find('[data-test="confirm-content"]')).toHaveLength(1)
  })

  it('button agree show loading when agree install', () => {
    const mockProps = {
      requestUninstall: jest.fn(),
      uninstallDone: jest.fn(),
      appName: 'mockAppName',
      afterClose: jest.fn(),
      setAppDetailModalStateView: jest.fn(),
      appUninstallFormState: 'SUBMITTING' as FormState
    }
    const wrapper = shallow(<AppConfirmUninstall {...mockProps} />)
    expect(wrapper.find('[dataTest="agree-btn"]').prop('loading')).toEqual(true)
  })

  it('button disagree show loading when agree install', () => {
    const mockProps = {
      requestUninstall: jest.fn(),
      uninstallDone: jest.fn(),
      appName: 'mockAppName',
      afterClose: jest.fn(),
      setAppDetailModalStateView: jest.fn(),
      appUninstallFormState: 'SUBMITTING' as FormState
    }
    const wrapper = shallow(<AppConfirmUninstall {...mockProps} />)
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
      fn.requestUninstall()
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
        appUninstall: {
          formState: 'PENDING'
        }
      }
      const expected = {
        appName: `Peter's Properties`,
        appUninstallFormState: 'PENDING'
      }
      const result = mapStateToProps(mockState as ReduxState)
      expect(result).toEqual(expected)
    })

    it('should return correct Props when no data', () => {
      const mockState = {
        appUninstall: {
          formState: 'PENDING'
        }
      }
      const expected = {
        appName: '',
        appUninstallFormState: 'PENDING'
      }
      const result = mapStateToProps(mockState as ReduxState)
      expect(result).toEqual(expected)
    })
  })
})
