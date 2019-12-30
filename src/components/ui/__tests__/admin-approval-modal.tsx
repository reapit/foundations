import * as React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import {
  AdminApprovalModalInner,
  AdminApprovalInnerProps,
  isAppearInScope,
  renderCheckboxesDiff,
  handleOnApproveSuccess,
  handleOnDeclineSuccess,
  handleSetIsDeclineModal,
  handleSetIsApproveModal
} from '../admin-approval-modal'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { revisionDetailDataStub } from '@/sagas/__stubs__/revision-detail'
import { appPermissionStub } from '@/sagas/__stubs__/app-permission'

const props = (loading: boolean, error: boolean): AdminApprovalInnerProps => ({
  appDetailState: {
    loading,
    error,
    appDetailData: { data: appDetailDataStub.data },
    authentication: {
      loading: false,
      code: ''
    }
  },
  revisionDetailState: {
    loading,
    error,
    revisionDetailData: { data: revisionDetailDataStub.data, scopes: appPermissionStub },
    approveFormState: 'PENDING',
    declineFormState: 'PENDING'
  }
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

describe('handleOnApproveSuccess', () => {
  it('should call function correctly', () => {
    const closeParentModal = jest.fn()
    const setIsApproveModalOpen = jest.fn()
    const fn = handleOnApproveSuccess({ closeParentModal, setIsApproveModalOpen })
    fn()
    expect(closeParentModal).toBeCalled()
    expect(setIsApproveModalOpen).toBeCalled()
  })
})

describe('handleOnDeclineSuccess', () => {
  it('should call function correctly', () => {
    const closeParentModal = jest.fn()
    const setIsDeclineModalOpen = jest.fn()
    const fn = handleOnDeclineSuccess({ closeParentModal, setIsDeclineModalOpen })
    fn()
    expect(closeParentModal).toBeCalled()
    expect(setIsDeclineModalOpen).toBeCalled()
  })
})

describe('handleSetIsDeclineModal', () => {
  it('should call function correctly', () => {
    const setIsDeclineModalOpen = jest.fn()
    const fn = handleSetIsDeclineModal(setIsDeclineModalOpen, true)
    fn()
    expect(setIsDeclineModalOpen).toBeCalled()
  })
})

describe('handleSetIsApproveModal', () => {
  it('should call function correctly', () => {
    const setIsApproveModalOpen = jest.fn()
    const fn = handleSetIsApproveModal(setIsApproveModalOpen, true)
    fn()
    expect(setIsApproveModalOpen).toBeCalled()
  })
})
