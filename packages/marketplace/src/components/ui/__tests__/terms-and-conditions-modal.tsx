import * as React from 'react'
import { shallow } from 'enzyme'
import TermsAndConditionsModal, { TermsAndConditionsModalProps } from '../terms-and-conditions-modal'

const props: TermsAndConditionsModalProps = {
  visible: true,
  onAccept: jest.fn(),
  onDecline: jest.fn(),
}

describe('Menu', () => {
  it('should match a snapshot', () => {
    expect(shallow(<TermsAndConditionsModal {...props} />)).toMatchSnapshot()
  })
})
