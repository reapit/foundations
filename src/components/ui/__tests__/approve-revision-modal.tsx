import * as React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { ApproveRevisionModal, ApproveRevisionModalProps } from '../approve-revision-modal'
import { appPermissionStub } from '@/sagas/__stubs__/app-permission'

const props: ApproveRevisionModalProps = {
  onApproveSuccess: jest.fn(),
  email: 'email',
  name: 'name',
  submitApproveRevision: jest.fn(),
  visible: true,
  // @ts-ignore: only pick necessary props to test
  revisionDetail: {
    revisionDetailData: {
      data: {
        appId: 'appIDd',
        id: 'revisionID'
      },
      scopes: appPermissionStub
    },
    approveFormState: 'PENDING'
  }
}

describe('ApproveRevisionModal', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<ApproveRevisionModal {...props} />))).toMatchSnapshot()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
