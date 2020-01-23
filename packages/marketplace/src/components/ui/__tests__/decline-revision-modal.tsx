import * as React from 'react'
import { shallow } from 'enzyme'

import {
  DeclineRevisionModal,
  DeclineRevisionModalProps,
  handleAfterClose,
  handleOnSubmit
} from '../decline-revision-modal'
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
    expect(shallow(<DeclineRevisionModal {...props} />)).toMatchSnapshot()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})

describe('handleAfterClose', () => {
  it('should call afterClose', () => {
    const mockProps = {
      isSuccessed: false,
      onDeclineSuccess: jest.fn(),
      isLoading: false,
      afterClose: jest.fn()
    }
    const fn = handleAfterClose(mockProps)
    fn()
    expect(mockProps.afterClose).toBeCalled()
  })
  it('should call onDeclineSuccess', () => {
    const mockProps = {
      isSuccessed: true,
      onDeclineSuccess: jest.fn(),
      isLoading: true,
      afterClose: jest.fn()
    }
    const fn = handleAfterClose(mockProps)
    fn()
    expect(mockProps.onDeclineSuccess).toBeCalled()
  })

  it('handleOnSubmit', () => {
    const mockProps = {
      appId: '123',
      appRevisionId: '123',
      setRejectionReason: jest.fn(),
      submitDeclineRevision: jest.fn()
    }
    const fn = handleOnSubmit(mockProps)
    fn({})
    expect(mockProps.setRejectionReason).toBeCalled()
    expect(mockProps.submitDeclineRevision).toBeCalled()
  })
})
