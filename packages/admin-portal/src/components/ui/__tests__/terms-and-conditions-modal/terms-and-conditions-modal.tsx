import React from 'react'
import { TermsAndConditionsModal } from '../../terms-and-conditions-modal'
import { render } from '@testing-library/react'

describe('TermsAndConditionsModal', () => {
  it('it matches a snapshot', () => {
    const wrapper = render(<TermsAndConditionsModal visible={true} onAccept={jest.fn} />)
    expect(wrapper).toMatchSnapshot()
  })
})
