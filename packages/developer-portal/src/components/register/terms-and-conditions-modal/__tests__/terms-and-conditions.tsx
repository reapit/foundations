import React from 'react'
import { render } from '../../../../tests/react-testing'
import { TermsAndConditions } from '../terms-and-conditions'

describe('TermsAndConditionsModal', () => {
  it('it matches a snapshot', () => {
    const wrapper = render(<TermsAndConditions />)
    expect(wrapper).toMatchSnapshot()
  })
})
