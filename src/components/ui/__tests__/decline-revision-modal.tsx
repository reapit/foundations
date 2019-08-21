import * as React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { DeclineRevisionModal, DeclineRevisionModalProps } from '../decline-revision-modal'
import { appPermissionStub } from '@/sagas/__stubs__/app-permission'

const props: DeclineRevisionModalProps = {
  onDeclineSuccess: jest.fn(),
  email: 'email',
  name: 'name',
  submitDeclineRevision: jest.fn(),
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

describe('DeclineRevisionModal', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<DeclineRevisionModal {...props} />))).toMatchSnapshot()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
