import * as React from 'react'
import { shallow, mount } from 'enzyme'
import { AppDetailInner, AppDetailInnerProps } from '../app-detail-inner'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'

const mockProps: AppDetailInnerProps = {
  appDetailModalState: 'VIEW_DETAIL_BROWSE',
  loginMode: 'WEB',
  appDetailData: appDetailDataStub.data,
  setStateViewBrowse: jest.fn(),
  setStateViewInstall: jest.fn(),
  setStateViewUninstall: jest.fn(),
  installationsSetFormState: jest.fn()
}

describe('AppDetailInner', () => {
  it('should match a snapshot when appDetailModalState = VIEW_DETAIL_BROWSE', () => {
    expect(shallow(<AppDetailInner {...mockProps} />)).toMatchSnapshot()
  })

  it('should match a snapshot when appDetailModalState = VIEW_DETAIL_MANAGE', () => {
    const props: AppDetailInnerProps = { ...mockProps, appDetailModalState: 'VIEW_DETAIL_MANAGE' }
    expect(shallow(<AppDetailInner {...mockProps} />)).toMatchSnapshot()
  })

  it('should match a snapshot when appDetailModalState = VIEW_CONFIRM_INSTALL', () => {
    const props: AppDetailInnerProps = { ...mockProps, appDetailModalState: 'VIEW_CONFIRM_INSTALL' }
    expect(shallow(<AppDetailInner {...props} />)).toMatchSnapshot()
  })

  it('should render AppDetail when appDetailModalState = VIEW_DETAIL_BROWSE', () => {
    const wrapper = shallow(<AppDetailInner {...mockProps} />)
    expect(wrapper.find('AppDetailWithConnect')).toHaveLength(1)
  })

  it('should render AppInstallConfirm when appDetailModalState = VIEW_CONFIRM_INSTALL', () => {
    const props: AppDetailInnerProps = { ...mockProps, appDetailModalState: 'VIEW_CONFIRM_INSTALL' }
    const wrapper = shallow(<AppDetailInner {...props} />)
    expect(wrapper.find('AppConfirmInstallContentInnerWithConnect')).toHaveLength(1)
  })

  it('should render CallToAction when appDetailModalState = VIEW_DETAIL_ACTION_SUCCESS', () => {
    const props: AppDetailInnerProps = { ...mockProps, appDetailModalState: 'VIEW_DETAIL_ACTION_SUCCESS' }
    const wrapper = mount(<AppDetailInner {...props} />)
    expect(wrapper.find('CallToAction')).toHaveLength(1)
  })

  it('should render null when !appDetailState.appDetailData || !appDetailState.appDetailData.data', () => {
    const props: AppDetailInnerProps = { ...mockProps, appDetailModalState: 'VIEW_CONFIRM_INSTALL' }
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
