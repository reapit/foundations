import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { AdminApprovalModalInner, AdminApprovalInnerProps } from '../admin-approval-modal'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { revisionDetailDataStub } from '@/sagas/__stubs__/revision-detail'

const props = (loading: boolean, error: boolean): AdminApprovalInnerProps => ({
  appDetailState: { loading, error, appDetailData: { data: appDetailDataStub.data } },
  revisionDetailState: { loading, error, revisionDetailData: { data: revisionDetailDataStub.data } }
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
