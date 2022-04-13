import React from 'react'
import { TermsAndConditionsModal } from '..'
import { render } from '../../../../tests/react-testing'

describe('TermsAndConditionsModal', () => {
  it('it matches a snapshot', () => {
    const wrapper = render(<TermsAndConditionsModal visible={true} onAccept={jest.fn} />)
    expect(wrapper).toMatchSnapshot()
  })
})
