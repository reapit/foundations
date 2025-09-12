import React from 'react'
import { TermsAndConditionsModal } from '..'
import { render } from '../../../../tests/react-testing'

jest.mock('../terms-and-conditions-pdf', () => ({ TermsAndConditionsPdf: jest.fn(() => <div>Mocked PDF</div>) }))

describe('TermsAndConditionsModal', () => {
  it('it matches a snapshot', () => {
    const wrapper = render(<TermsAndConditionsModal visible={true} onAccept={jest.fn} />)
    expect(wrapper).toMatchSnapshot()
  })
})
