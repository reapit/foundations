import React from 'react'
import { shallow, mount } from 'enzyme'
import { FormState, ReduxState } from '@/types/core'
import { AppConfirmInstallContent, handleCloseModal, mapDispatchToProps, mapStateToProps } from '../app-confirm-install'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'

const mockProps = {
  appDetailData: appDetailDataStub.data,
  installationsFormState: 'PENDING' as FormState,
  afterClose: jest.fn(),
  installApp: jest.fn(),
  setAppDetailModalStateBrowse: jest.fn(),
  setAppDetailModalStateSuccess: jest.fn()
}

describe('AppConfirmInstallContent', () => {
  it('render correctly', () => {
    const wrapper = shallow(<AppConfirmInstallContent {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
    const wrapper1 = shallow(<AppConfirmInstallContent {...mockProps} installationsFormState="DONE" />)
    expect(wrapper1).toMatchSnapshot()
    const wrapper2 = shallow(<AppConfirmInstallContent {...mockProps} installationsFormState="SUBMITTING" />)
    expect(wrapper2).toMatchSnapshot()
    const wrapper3 = shallow(<AppConfirmInstallContent {...mockProps} installationsFormState="ERROR" />)
    expect(wrapper3).toMatchSnapshot()
    const wrapper4 = shallow(<AppConfirmInstallContent {...mockProps} installationsFormState="SUCCESS" />)
    expect(wrapper4).toMatchSnapshot()
  })

  it('should return null when formState SUCCESS', () => {
    const wrapper = shallow(<AppConfirmInstallContent {...mockProps} installationsFormState="SUCCESS" />)
    expect(wrapper).toEqual({})
  })

  it('show confirm content', () => {
    const wrapper = shallow(<AppConfirmInstallContent {...mockProps} />)
    expect(wrapper.find('[data-test="confirm-content"]')).toHaveLength(1)
  })

  it('button agree show loading when agree install', () => {
    const wrapper = mount(<AppConfirmInstallContent {...mockProps} installationsFormState="SUBMITTING" />)
    expect(wrapper.find('[dataTest="agree-btn"]').prop('loading')).toEqual(true)
  })

  it('button disagree show loading when agree install', () => {
    const wrapper = mount(<AppConfirmInstallContent {...mockProps} installationsFormState="SUBMITTING" />)
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
      fn.installApp({ appId: '1' })()
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
