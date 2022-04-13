import * as React from 'react'
import { shallow } from 'enzyme'
import TermsAndConditionsModal, { TermsAndConditionsModalProps } from '..'

const props: TermsAndConditionsModalProps = {
  visible: true,
  onAccept: jest.fn(),
  onDecline: jest.fn(),
}

describe('TermsAndConditionsModal', () => {
  it('should match a snapshot', () => {
    expect(shallow(<TermsAndConditionsModal {...props} />)).toMatchSnapshot()
  })
})
