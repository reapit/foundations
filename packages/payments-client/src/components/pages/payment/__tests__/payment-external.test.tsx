import React from 'react'
import { render } from '../../../../tests/react-testing'
import { PaymentExternalPage } from '../payment-external'

describe('PaymentExternalPage', () => {
  it('should match a snapshot when loading', () => {
    expect(render(<PaymentExternalPage />)).toMatchSnapshot()
  })

  it('should match a snapshot when has an error', () => {
    expect(render(<PaymentExternalPage />)).toMatchSnapshot()
  })

  it('should match a snapshot when has no merchantKey and no error', () => {
    expect(render(<PaymentExternalPage />)).toMatchSnapshot()
  })

  it('should match a snapshot when has data and a merchantKey', () => {
    expect(render(<PaymentExternalPage />)).toMatchSnapshot()
  })
})
