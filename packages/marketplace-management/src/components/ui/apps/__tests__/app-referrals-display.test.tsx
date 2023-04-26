import React from 'react'
import { ReferralsDisplay, handleReferralText } from '../app-referrals-display'
import { render } from '../../../../tests/react-testing'
import { mockReferralTypes } from '../../../../services/__stubs__/referral-types'
import { mockInstallationsList } from '../../../../services/__stubs__/installations'
import { InstallationModel } from '@reapit/foundations-ts-definitions'

jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
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
    expect(result).toEqual('JTS - Testimonial, JRV - Removals')
  })

  it('handleReferralText should return an empty string if installations are empty', () => {
    const curried = handleReferralText([], mockReferralTypes)
    const result = curried()
    expect(result).toEqual('')
  })

  it('handleReferralText should return an empty string if ReferralTypes are empty', () => {
    const curried = handleReferralText(mockInstallationsList.data ?? [], {})
    const result = curried()
    expect(result).toEqual('')
  })

  it('handleReferralText should return an empty string if both are empty', () => {
    const curried = handleReferralText([], {})
    const result = curried()
    expect(result).toEqual('')
  })

  it('handleReferralText should return an empty string if a name is not found', () => {
    const curried = handleReferralText(mockInstallationsList.data ?? [], {
      ...mockReferralTypes,
      _embedded: [{ id: 'NOT_KNOWN', name: 'FOO' }],
    })
    const result = curried()
    expect(result).toEqual('')
  })

  it('handleReferralText should return an empty string if no active installations', () => {
    const installationInactiveWithMeta = {
      ...(mockInstallationsList.data as InstallationModel[])[0],
      status: 'NOT ACTIVE',
    }
    const curried = handleReferralText([installationInactiveWithMeta], mockReferralTypes)
    const result = curried()
    expect(result).toEqual('')
  })
})
