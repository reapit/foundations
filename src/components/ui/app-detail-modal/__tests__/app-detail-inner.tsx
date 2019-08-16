import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { AppDetailInner, AppDetailInnerMappedProps } from '../app-detail-inner'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'

describe('AppDetailInner', () => {
  it('should match a snapshot when appDetailModalState = VIEW_DETAIL', () => {
    const props: AppDetailInnerMappedProps = {
      appDetailModalState: 'VIEW_DETAIL',
      appDetailState: { loading: false, error: false, appDetailData: appDetailDataStub }
    }
    expect(toJson(shallow(<AppDetailInner {...props} />))).toMatchSnapshot()
  })

  it('should match a snapshot when appDetailModalState = VIEW_PERMISSION', () => {
    const props: AppDetailInnerMappedProps = {
      appDetailModalState: 'VIEW_PERMISSION',
      appDetailState: { loading: false, error: false, appDetailData: appDetailDataStub }
    }
    expect(toJson(shallow(<AppDetailInner {...props} />))).toMatchSnapshot()
  })
  it('should match a snapshot when appDetailModalState = VIEW_CONFIRM_INSTALL', () => {
    const props: AppDetailInnerMappedProps = {
      appDetailModalState: 'VIEW_CONFIRM_INSTALL',
      appDetailState: { loading: false, error: false, appDetailData: appDetailDataStub }
    }
    expect(toJson(shallow(<AppDetailInner {...props} />))).toMatchSnapshot()
  })

  it('should render AppDetail when appDetailModalState = VIEW_DETAIL', () => {
    const props: AppDetailInnerMappedProps = {
      appDetailModalState: 'VIEW_DETAIL',
      appDetailState: { loading: false, error: false, appDetailData: appDetailDataStub }
    }
    const wrapper = shallow(<AppDetailInner {...props} />)
    console.log(wrapper.debug())
    expect(wrapper.find('AppDetailWithConnect')).toHaveLength(1)
  })

  it('should render AppPermission when appDetailModalState = VIEW_PERMISSION', () => {
    const props: AppDetailInnerMappedProps = {
      appDetailModalState: 'VIEW_PERMISSION',
      appDetailState: { loading: false, error: false, appDetailData: appDetailDataStub }
    }
    const wrapper = shallow(<AppDetailInner {...props} />)
    expect(wrapper.find('AppPermission')).toHaveLength(1)
  })

  it('should render AppInstallConfirm when appDetailModalState = VIEW_CONFIRM_INSTALL', () => {
    const props: AppDetailInnerMappedProps = {
      appDetailModalState: 'VIEW_CONFIRM_INSTALL',
      appDetailState: { loading: false, error: false, appDetailData: appDetailDataStub }
    }
    const wrapper = shallow(<AppDetailInner {...props} />)
    expect(wrapper.find('AppConfirmInstallContentInnerWithConnect')).toHaveLength(1)
  })

  it('should render null when !appDetailState.appDetailData || !appDetailState.appDetailData.data', () => {
    const props = {
      appDetailModalState: 'VIEW_CONFIRM_INSTALL',
      appDetailState: { loading: false, error: false }
    } as AppDetailInnerMappedProps
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
