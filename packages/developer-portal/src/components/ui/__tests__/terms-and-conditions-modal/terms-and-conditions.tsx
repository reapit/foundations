import React from 'react'
import { TermsAndConditions } from '../../terms-and-conditions-modal/terms-and-conditions'
import { render } from '@testing-library/react'

describe('TermsAndConditionsModal', () => {
  it('it matches a snapshot', () => {
    const wrapper = render(<TermsAndConditions />)
    expect(wrapper).toMatchSnapshot()
  })
})
