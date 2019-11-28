import * as React from 'react'
import { shallow } from 'enzyme'
import TermsAndConditionsModal, { TermsAndConditionsModalProps } from '../terms-and-conditions-modal'
import toJson from 'enzyme-to-json'

const props: TermsAndConditionsModalProps = {
  visible: true,
  onAccept: jest.fn(),
  onDecline: jest.fn()
}

describe('Menu', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<TermsAndConditionsModal {...props} />))).toMatchSnapshot()
  })
})
