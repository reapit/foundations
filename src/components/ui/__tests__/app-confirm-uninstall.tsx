import React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { FormState, ReduxState } from '@/types/core'
import { AppConfirmUninstall, handleCloseModal, mapDispatchToProps, mapStateToProps } from '../app-confirm-uninstall'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'

const mockProps = {
  appDetailData: appDetailDataStub.data,
  installationsFormState: 'PENDING' as FormState,
  afterClose: jest.fn(),
  uninstallApp: jest.fn(),
  setAppDetailModalStateBrowse: jest.fn(),
  setAppDetailModalStateSuccess: jest.fn()
}

describe('AppConfirmUninstall', () => {
  it('render correctly', () => {
    const wrapper = shallow(<AppConfirmUninstall {...mockProps} />)
    expect(toJson(wrapper)).toMatchSnapshot()
    const wrapper1 = shallow(<AppConfirmUninstall {...mockProps} installationsFormState="DONE" />)
    expect(toJson(wrapper1)).toMatchSnapshot()
    const wrapper2 = shallow(<AppConfirmUninstall {...mockProps} installationsFormState="SUBMITTING" />)
    expect(toJson(wrapper2)).toMatchSnapshot()
    const wrapper3 = shallow(<AppConfirmUninstall {...mockProps} installationsFormState="ERROR" />)
    expect(toJson(wrapper3)).toMatchSnapshot()
    const wrapper4 = shallow(<AppConfirmUninstall {...mockProps} installationsFormState="SUCCESS" />)
    expect(toJson(wrapper4)).toMatchSnapshot()
  })

  it('should return null when appUninstallFormState SUCCESS', () => {
    const wrapper = shallow(<AppConfirmUninstall installationsFormState="SUCCESS" {...mockProps} />)
    expect(wrapper).toEqual({})
  })

  it('show confirm content', () => {
    const wrapper = shallow(<AppConfirmUninstall {...mockProps} />)
    expect(wrapper.find('[data-test="confirm-content"]')).toHaveLength(1)
  })

  it('button agree show loading when agree install', () => {
    const wrapper = mount(<AppConfirmUninstall {...mockProps} installationsFormState="SUBMITTING" />)
    expect(wrapper.find('[dataTest="agree-btn"]').prop('loading')).toEqual(true)
  })

  it('button disagree show loading when agree install', () => {
    const wrapper = mount(<AppConfirmUninstall {...mockProps} installationsFormState="SUBMITTING" />)
    expect(wrapper.find('[dataTest="agree-btn"]').prop('loading')).toEqual(true)
  })
  it('handleCloseModal', () => {
    const afterClose = jest.fn()
    const setAppDetailModalStateBrowse = jest.fn()
    const fn = handleCloseModal(afterClose, setAppDetailModalStateBrowse)
    fn()
    expect(afterClose).toBeCalled()
    expect(setAppDetailModalStateBrowse).toBeCalled()
  })

  describe('mapDispatchToProps', () => {
    const dispatch = jest.fn()
    const fn = mapDispatchToProps(dispatch)
    it('should call dispatch when involke request install', () => {
      fn.uninstallApp({ appId: '1', installationId: '1' })()
      expect(dispatch).toBeCalled()
    })
    it('should call dispatch when involke setAppDetailModalStateBrowse', () => {
      fn.setAppDetailModalStateBrowse()
      expect(dispatch).toBeCalled()
    })
    it('should call dispatch when involke setAppDetailModalStateSuccess', () => {
      fn.setAppDetailModalStateSuccess()
      expect(dispatch).toBeCalled()
    })
  })

  describe('mapStateToProps', () => {
    it('should return correct Props', () => {
      const mockState = {
        appDetail: {
          appDetailData: appDetailDataStub
        },
        installations: {
          formState: 'PENDING'
        }
      } as ReduxState
      const expected = {
        appDetailData: appDetailDataStub.data,
        installationsFormState: 'PENDING'
      }
      const result = mapStateToProps(mockState)
      expect(result).toEqual(expected)
    })
  })
})
