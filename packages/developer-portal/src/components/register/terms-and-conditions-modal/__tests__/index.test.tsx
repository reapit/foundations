import React from 'react'
import TermsAndConditionsModal, { TermsAndConditionsModalProps } from '..'
import { render } from '../../../../tests/react-testing'

jest.mock('../terms-and-conditions-pdf', () => ({ TermsAndConditionsPdf: jest.fn(() => <div>Mocked PDF</div>) }))

const props: TermsAndConditionsModalProps = {
  visible: true,
  onAccept: jest.fn(),
  onDecline: jest.fn(),
}

describe('TermsAndConditionsModal', () => {
  beforeEach(() => {
    const testElem = document.createElement('div')
    testElem.id = 'root'
    document.body.appendChild(testElem)
  })

  it('should match a snapshot when visibe', () => {
    expect(render(<TermsAndConditionsModal {...props} />)).toMatchSnapshot()
  })

  it('should match a snapshot when not visible', () => {
    expect(render(<TermsAndConditionsModal {...props} visible={false} />)).toMatchSnapshot()
  })
})
