import { WebComponentModal, WebComponentModalProps } from '../config-modal'
import React from 'react'
import { render } from '../../../tests/react-testing'

describe('Config-modal', () => {
  it('should match snapshot', () => {
    const mockProps = {
      type: 'BOOK_VIEWING',
      afterClose: jest.fn(),
      closeModal: jest.fn(),
    } as WebComponentModalProps

    expect(render(<WebComponentModal {...mockProps} />)).toMatchSnapshot()
  })
})
