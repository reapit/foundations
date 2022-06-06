import * as React from 'react'
import { render } from '../../../tests/react-testing'
import ClientWelcomeMessageModal, { ClientWelcomeMessageModalProps } from '../client-welcome-message'

const props: ClientWelcomeMessageModalProps = {
  visible: true,
  onAccept: jest.fn(),
}

describe('Menu', () => {
  it('should match a snapshot', () => {
    expect(render(<ClientWelcomeMessageModal {...props} />)).toMatchSnapshot()
  })
})
