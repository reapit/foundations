import React from 'react'
import { ReferralsDisplay, handleReferralText } from '../app-referrals-display'
import { render } from '../../../../tests/react-testing'
import { mockReferralTypes } from '../../../../services/__stubs__/referral-types'
import { mockInstallationsList } from '../../../../services/__stubs__/installations'

jest.mock('@reapit/utils-react', () => ({
  useReapitGet: jest.fn(() => [mockReferralTypes]),
}))

describe('ReferralsDisplay', () => {
  it('should render component when has installations', () => {
    expect(
      render(<ReferralsDisplay installations={mockInstallationsList.data ?? []} hasCurrentInstallations={true} />),
    ).toMatchSnapshot()
  })
})

describe('handleReferralText', () => {
  it('handleReferralText should correctly return the referral names', () => {
    const curried = handleReferralText(mockInstallationsList.data ?? [], mockReferralTypes)
    const result = curried()
    expect(result).toEqual('Testimonial, Removals')
  })
})
