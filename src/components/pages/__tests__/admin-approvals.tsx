import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { AdminApprovals, AdminApprovalsProps } from '../admin-approvals'
import { approvalsStub } from '@/sagas/__stubs__/approvals'

const props: AdminApprovalsProps = {
  approvalsState: {
    loading: false,
    adminApprovalsData: approvalsStub
  },
  // @ts-ignore: just pick the needed props for the test
  match: {
    params: {
      page: '2'
    }
  }
}

describe('AdminApproval', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<AdminApprovals {...props} />))).toMatchSnapshot()
  })
})
