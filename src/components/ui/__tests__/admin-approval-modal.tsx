import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import {
  AdminApprovalModalInner,
  AdminApprovalModalInnerProps,
  isAppearInScope,
  renderCheckboxesDiff,
  handleOnApproveSuccess,
  handleOnDeclineSuccess,
  handleSetIsDeclineModal,
  handleSetIsApproveModal,
  mapStateToProps
} from '../admin-approval-modal'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { revisionDetailDataStub } from '@/sagas/__stubs__/revision-detail'
import { appPermissionStub } from '@/sagas/__stubs__/app-permission'
import { ModalBody } from '@reapit/elements'
import { ReduxState } from '@/types/core'

const props = (loading: boolean, error: boolean): AdminApprovalModalInnerProps => ({
  appDetailState: {
    loading,
    error,
    appDetailData: { data: appDetailDataStub.data },
    authentication: {
      loading: false,
      code: ''
    },
    isStale: false
  },
  revisionDetailState: {
    loading,
    error,
    revisionDetailData: { data: revisionDetailDataStub.data, scopes: appPermissionStub },
    approveFormState: 'PENDING',
    declineFormState: 'PENDING'
  },
  onApprovalClick: jest.fn(),
  onDeclineClick: jest.fn()
})

describe('AdminRevisionModalInner', () => {
  it('should match a snapshot when LOADING true', () => {
    expect(toJson(shallow(<AdminApprovalModalInner {...props(true, false)} />))).toMatchSnapshot()
  })

  it('should match a snapshot when LOADING false', () => {
    expect(toJson(shallow(<AdminApprovalModalInner {...props(false, false)} />))).toMatchSnapshot()
  })

  it('should match a snapshot when ERROR true', () => {
    expect(toJson(shallow(<AdminApprovalModalInner {...props(false, true)} />))).toMatchSnapshot()
  })
})

describe('isAppearInScope', () => {
  it('should return true', () => {
    const input = 'Marketplace/developers.read'
    const output = true
    const result = isAppearInScope(input, appPermissionStub)
    expect(result).toEqual(output)
  })
  it('should return false when cannot find permission', () => {
    const input = 'Marketplace/developers.test'
    const output = false
    const result = isAppearInScope(input, appPermissionStub)
    expect(result).toEqual(output)
  })
  it('should return false when !nameNeedToFind || scopes.length === 0', () => {
    const input = undefined
    const output = false
    const result = isAppearInScope(input, [])
    expect(result).toEqual(output)
  })
  it('should return false when !nameNeedToFind', () => {
    const input = undefined
    const output = false
    const result = isAppearInScope(input, appPermissionStub)
    expect(result).toEqual(output)
  })
  it('should return false when scopes.length === 0', () => {
    const input = 'Marketplace/developers.test'
    const output = false
    const result = isAppearInScope(input, [])
    expect(result).toEqual(output)
  })
})

// scopes checkboxes
describe('renderCheckboxesDiff', () => {
  it('should render checkboxes', () => {
    const scopes = [
      ...appPermissionStub,
      {
        name: 'Marketplace/developers.test',
        description: 'Test data about developers'
      }
    ]
    const checkboxes = renderCheckboxesDiff({
      scopes,
      appScopes: appDetailDataStub.data.scopes,
      revisionScopes: scopes
    })
    expect(checkboxes).toHaveLength(3)
  })
})

describe('renderAdditionalCheckboxes', () => {
  it('should render Is Listed checkbox', () => {
    const wrapper = shallow(<AdminApprovalModalInner {...props(false, false)}></AdminApprovalModalInner>)
    expect(
      wrapper
        .find(ModalBody)
        .dive()
        .find('h4[data-test="chkIsListed"]')
    ).toHaveLength(1)
  })

  it('should render Is Direct API checkbox', () => {
    const wrapper = shallow(<AdminApprovalModalInner {...props(false, false)}></AdminApprovalModalInner>)
    expect(
      wrapper
        .find(ModalBody)
        .dive()
        .find('h4[data-test="chkIsDirectApi"]')
    ).toHaveLength(1)
  })
})

describe('handleOnApproveSuccess', () => {
  it('should call function correctly', () => {
    const setIsApproveModalOpen = jest.fn()
    const fn = handleOnApproveSuccess(setIsApproveModalOpen)
    fn()
    expect(setIsApproveModalOpen).toBeCalled()
  })
})

describe('handleOnDeclineSuccess', () => {
  it('should call function correctly', () => {
    const setIsDeclineModalOpen = jest.fn()
    const fn = handleOnDeclineSuccess(setIsDeclineModalOpen)
    fn()
    expect(setIsDeclineModalOpen).toBeCalled()
  })
})

describe('handleSetIsDeclineModal', () => {
  it('should call function correctly', () => {
    const setIsDeclineModalOpen = jest.fn()
    const afterClose = jest.fn()
    const fn = handleSetIsDeclineModal({ setIsDeclineModalOpen, isDeclineModalOpen: true, afterClose })
    fn()
    expect(setIsDeclineModalOpen).toBeCalled()
    expect(afterClose).toBeCalled()
  })

  it('should call function correctly', () => {
    const setIsDeclineModalOpen = jest.fn()
    const fn = handleSetIsDeclineModal({ setIsDeclineModalOpen, isDeclineModalOpen: true })
    fn()
    expect(setIsDeclineModalOpen).toBeCalled()
  })
})

describe('handleSetIsApproveModal', () => {
  it('should call function correctly', () => {
    const setIsApproveModalOpen = jest.fn()
    const afterClose = jest.fn()
    const fn = handleSetIsApproveModal({ setIsApproveModalOpen, isApproveModalOpen: true, afterClose })
    fn()
    expect(setIsApproveModalOpen).toBeCalled()
    expect(afterClose).toBeCalled()
  })

  it('should call function correctly', () => {
    const setIsApproveModalOpen = jest.fn()
    const fn = handleSetIsApproveModal({ setIsApproveModalOpen, isApproveModalOpen: true })
    fn()
    expect(setIsApproveModalOpen).toBeCalled()
  })
})
