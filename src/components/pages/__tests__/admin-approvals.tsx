import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { AdminApprovals, AdminApprovalsProps } from '../admin-approvals'
import { approvalsStub } from '@/sagas/__stubs__/approvals'
import { AdminApprovalsList } from '@/reducers/admin-approvals'

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
    expect(toJson(shallow(<AdminApprovals {...mockProps(true, approvalsStub)} />))).toMatchSnapshot()
  })

  it('should match a snapshot when LOADING true', () => {
    expect(toJson(shallow(<AdminApprovals {...mockProps(true, null)} />))).toMatchSnapshot()
  })
})
