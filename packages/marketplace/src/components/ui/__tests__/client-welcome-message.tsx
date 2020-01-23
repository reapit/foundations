import * as React from 'react'
import { shallow } from 'enzyme'
import ClientWelcomeMessageModal, { ClientWelcomeMessageModalProps } from '../client-welcome-message'

const props: ClientWelcomeMessageModalProps = {
  visible: true,
  onAccept: jest.fn()
}

describe('Menu', () => {
  it('should match a snapshot', () => {
    expect(shallow(<ClientWelcomeMessageModal {...props} />)).toMatchSnapshot()
  })
})
