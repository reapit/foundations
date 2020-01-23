import * as React from 'react'
import { shallow } from 'enzyme'

import {
  ApproveRevisionModal,
  ApproveRevisionModalProps,
  handleAfterClose,
  handleOnSubmit
} from '../approve-revision-modal'
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
    expect(shallow(<ApproveRevisionModal {...props} />)).toMatchSnapshot()
  })

  describe('handleAfterClose', () => {
    it('should call onApproveSuccess correctly', () => {
      const mockProps = {
        isSuccessed: true,
        onApproveSuccess: jest.fn(),
        isLoading: true,
        afterClose: jest.fn()
      }
      const fn = handleAfterClose(mockProps)
      fn()
      expect(mockProps.onApproveSuccess).toBeCalled()
    })
    it('should call onApproveSuccess correctly', () => {
      const mockProps = {
        isSuccessed: false,
        onApproveSuccess: jest.fn(),
        isLoading: false,
        afterClose: jest.fn()
      }
      const fn = handleAfterClose(mockProps)
      fn()
      expect(mockProps.afterClose).toBeCalled()
    })
  })

  describe('handleOnSubmit', () => {
    it('should call submitApproveRevision', () => {
      const mockProps = {
        appId: '123',
        appRevisionId: '123',
        submitApproveRevision: jest.fn()
      }
      const fn = handleOnSubmit(mockProps)
      fn({})
      expect(mockProps.submitApproveRevision).toBeCalled()
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
