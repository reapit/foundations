import * as React from 'react'
import { render } from '../../../../tests/react-testing'

import CancelConfirmModal, { CancelConfirmModalProps } from '../../subscriptions/subscription-cancel-confirm'

const initProps = (): CancelConfirmModalProps => ({
  onConfirm: jest.fn(),
  isShowConfirmModal: true,
  setCancelSubId: jest.fn(),
  isCanceling: false,
})

describe('CancelConfirmModal', () => {
  it('should render CancelConfirmModal', () => {
    expect(render(<CancelConfirmModal {...initProps()} />)).toMatchSnapshot()
  })
})
