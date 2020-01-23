import * as React from 'react'
import { shallow } from 'enzyme'
import ClientWelcomeMessageModal, { ClientWelcomeMessageModalProps } from '../client-welcome-message'
import toJson from 'enzyme-to-json'

const props: ClientWelcomeMessageModalProps = {
  visible: true,
  onAccept: jest.fn()
}

describe('Menu', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<ClientWelcomeMessageModal {...props} />))).toMatchSnapshot()
  })
})
