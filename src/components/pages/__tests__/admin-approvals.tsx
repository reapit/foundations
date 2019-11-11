import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import {
  AdminApprovals,
  AdminApprovalsProps,
  mapStateToProps,
  mapDispatchToProps,
  handleAfterClose,
  handleOnPageChange
} from '../admin-approvals'
import { approvalsStub } from '@/sagas/__stubs__/approvals'
import { AdminApprovalsList } from '@/reducers/admin-approvals'
import { ReduxState } from '@/types/core'
import routes from '@/constants/routes'

const mockProps = (loading: boolean, approvals: AdminApprovalsList | null): AdminApprovalsProps => ({
  approvalsState: {
    loading: loading,
    adminApprovalsData: approvals
  },
  // @ts-ignore: just pick the needed props for the test
  match: {
    params: {
      page: '2'
    }
  }
})

describe('AdminApproval', () => {
  it('should match a snapshot when LOADING false', () => {
    expect(toJson(shallow(<AdminApprovals {...mockProps(false, approvalsStub)} />))).toMatchSnapshot()
  })

  it('should match a snapshot when LOADING true', () => {
    expect(toJson(shallow(<AdminApprovals {...mockProps(true, null)} />))).toMatchSnapshot()
  })

  describe('mapStateToProps', () => {
    it('should run correctly', () => {
      const mockState = {
        adminApprovals: {},
        appDetail: {},
        revisionDetail: {}
      } as ReduxState
      const output = {
        approvalsState: mockState.adminApprovals,
        appDetail: mockState.appDetail,
        revisionDetail: mockState.revisionDetail
      }
      const result = mapStateToProps(mockState)
      expect(result).toEqual(output)
    })
  })

  describe('mapDispatchToProps', () => {
    it('fetchRevisionDetail', () => {
      const mockDispatch = jest.fn()
      const { fetchRevisionDetail } = mapDispatchToProps(mockDispatch)
      fetchRevisionDetail({ appId: '123', appRevisionId: '123' })
      expect(mockDispatch).toBeCalled()
    })

    it('fetchAppDetail', () => {
      const mockDispatch = jest.fn()
      const { fetchAppDetail } = mapDispatchToProps(mockDispatch)
      fetchAppDetail('123')
      expect(mockDispatch).toBeCalled()
    })
  })

  describe('handleAfterClose', () => {
    it('should call dispatch', () => {
      const setIsModalOpen = jest.fn()
      const fn = handleAfterClose({ setIsModalOpen })
      fn()
      expect(setIsModalOpen).toBeCalled()
    })
  })

  describe('handleOnPageChange', () => {
    it('should call dispatch', () => {
      const mockHistory = {
        push: jest.fn()
      }
      const fn = handleOnPageChange(mockHistory)
      fn('1')
      expect(mockHistory.push).toBeCalledWith(`${routes.ADMIN_APPROVALS}/${1}`)
    })
  })
})
