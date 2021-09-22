import { WebComponentModal, WebComponentModalProps } from '../config-modal'
import React from 'react'
import { shallow } from 'enzyme'

describe('Config-modal', () => {
  it('should match snapshot', () => {
    const mockProps = {
      type: 'BOOK_VIEWING',
      afterClose: jest.fn(),
      closeModal: jest.fn(),
    } as WebComponentModalProps

    expect(shallow(<WebComponentModal {...mockProps} />)).toMatchSnapshot()
  })
})
