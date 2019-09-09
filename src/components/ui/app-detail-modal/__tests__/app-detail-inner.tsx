import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { AppDetailInner, AppDetailInnerProps } from '../app-detail-inner'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'

describe('AppDetailInner', () => {
  it('should match a snapshot when appDetailModalState = VIEW_DETAIL', () => {
    const props: AppDetailInnerProps = {
      appDetailModalState: 'VIEW_DETAIL',
      appDetailState: { loading: false, error: false, appDetailData: appDetailDataStub },
      setAppDetailModalStateView: jest.fn()
    }
    expect(toJson(shallow(<AppDetailInner {...props} />))).toMatchSnapshot()
  })

  it('should match a snapshot when appDetailModalState = VIEW_CONFIRM_INSTALL', () => {
    const props: AppDetailInnerProps = {
      appDetailModalState: 'VIEW_CONFIRM_INSTALL',
      appDetailState: { loading: false, error: false, appDetailData: appDetailDataStub },
      setAppDetailModalStateView: jest.fn()
    }
    expect(toJson(shallow(<AppDetailInner {...props} />))).toMatchSnapshot()
  })

  it('should render AppDetail when appDetailModalState = VIEW_DETAIL', () => {
    const props: AppDetailInnerProps = {
      appDetailModalState: 'VIEW_DETAIL',
      appDetailState: { loading: false, error: false, appDetailData: appDetailDataStub },
      setAppDetailModalStateView: jest.fn()
    }
    const wrapper = shallow(<AppDetailInner {...props} />)
    expect(wrapper.find('AppDetailWithConnect')).toHaveLength(1)
  })

  it('should render AppInstallConfirm when appDetailModalState = VIEW_CONFIRM_INSTALL', () => {
    const props: AppDetailInnerProps = {
      appDetailModalState: 'VIEW_CONFIRM_INSTALL',
      appDetailState: { loading: false, error: false, appDetailData: appDetailDataStub },
      setAppDetailModalStateView: jest.fn()
    }
    const wrapper = shallow(<AppDetailInner {...props} />)
    expect(wrapper.find('AppConfirmInstallContentInnerWithConnect')).toHaveLength(1)
  })

  it('should render CallToAction when appDetailModalState = VIEW_DETAIL_ACTION_SUCCESS', () => {
    const props: AppDetailInnerProps = {
      appDetailModalState: 'VIEW_DETAIL_ACTION_SUCCESS',
      appDetailState: { loading: false, error: false, appDetailData: appDetailDataStub },
      setAppDetailModalStateView: jest.fn()
    }
    const wrapper = shallow(<AppDetailInner {...props} />)
    expect(wrapper.find('CallToAction')).toHaveLength(1)
  })

  it('should render null when !appDetailState.appDetailData || !appDetailState.appDetailData.data', () => {
    const props = {
      appDetailModalState: 'VIEW_CONFIRM_INSTALL',
      appDetailState: { loading: false, error: false }
    } as AppDetailInnerProps
    const wrapper = shallow(<AppDetailInner {...props} />)
    expect(wrapper.find('AppInstallConfirm')).toHaveLength(0)
    expect(wrapper.find('AppPermission')).toHaveLength(0)
    expect(wrapper.find('AppDetail')).toHaveLength(0)
  })

  it('should render null when wrong appDetailModalState', () => {
    const props = {
      appDetailModalState: 'VIEW_DETAIL_MOCK',
      appDetailState: { loading: false, error: false }
    } as any
    const wrapper = shallow(<AppDetailInner {...props} />)
    expect(wrapper.find('AppInstallConfirm')).toHaveLength(0)
    expect(wrapper.find('AppPermission')).toHaveLength(0)
    expect(wrapper.find('AppDetail')).toHaveLength(0)
  })
})
