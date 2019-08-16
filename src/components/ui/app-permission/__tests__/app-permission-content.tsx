import React from 'react'
import { shallow } from 'enzyme'
import { appPermissionStub } from '@/sagas/__stubs__/app-permission'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import {
  AppPermissionContent,
  handleCloseModal,
  AppPermissionInnerProps,
  mapStateToProps,
  mapDispatchToProps
} from '../app-permission-content'

describe('AppPermissionContent', () => {
  it('render correctly', () => {
    const mockProps = {
      permissions: appPermissionStub,
      setAppDetailModalStateConfirm: jest.fn(),
      appName: 'mockAppName',
      afterClose: jest.fn(),
      setAppDetailModalStateView: jest.fn()
    } as AppPermissionInnerProps
    const wrapper = shallow(<AppPermissionContent {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })
  it('handleCloseModal run correctly', () => {
    const afterClose = jest.fn()
    const setAppDetailModalStateView = jest.fn()
    const fn = handleCloseModal(afterClose, setAppDetailModalStateView)
    fn()
    expect(afterClose).toBeCalled()
    expect(setAppDetailModalStateView).toBeCalled()
  })
  describe('mapStateToProps', () => {
    it('have correct params', () => {
      const mockState = {
        appPermission: {
          appPermissionData: appPermissionStub
        },
        appDetail: {
          appDetailData: appDetailDataStub
        }
      } as any
      const expected = {
        permissions: appPermissionStub,
        appName: `Peter's Properties`
      }
      const result = mapStateToProps(mockState)
      expect(result).toEqual(expected)
    })
    it('have params undefined', () => {
      const mockState = {
        appPermission: {
          appPermissionData: undefined
        },
        appDetail: {
          appDetailData: undefined
        }
      } as any
      const expected = {
        permissions: [],
        appName: ''
      }
      const result = mapStateToProps(mockState)
      expect(result).toEqual(expected)
    })
  })
  describe('mapDispatchToProps', () => {
    it('setAppDetailModalStateConfirm', () => {
      const dispatch = jest.fn()
      const fns = mapDispatchToProps(dispatch)
      fns.setAppDetailModalStateConfirm()
      expect(dispatch).toBeCalled()
    })
    it('setAppDetailModalStateView', () => {
      const dispatch = jest.fn()
      const fns = mapDispatchToProps(dispatch)
      fns.setAppDetailModalStateView()
      expect(dispatch).toBeCalled()
    })
  })
})
