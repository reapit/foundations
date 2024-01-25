import React, { ChangeEvent } from 'react'
import { handleOnCheckboxChange, handleOnChange, ReferralsConfirmationSelection } from '../app-referrals-confirm'
import { render } from '../../../../tests/react-testing'
import { mockAppDetail } from '../../../../services/__stubs__/apps'
import { useReapitGet } from '@reapit/use-reapit-data'
import { mockReferralTypes } from '../../../../services/__stubs__/referral-types'

jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitGet: jest.fn(() => [null, true]),
}))

const mockUseReapitGet = useReapitGet as jest.Mock

describe('ReferralsConfirmationSelection', () => {
  it('should render component with props and loading', () => {
    expect(
      render(<ReferralsConfirmationSelection setMetadata={jest.fn()} metadata={[]} app={mockAppDetail} />),
    ).toMatchSnapshot()
  })

  it('should render component with props with data', () => {
    mockUseReapitGet.mockReturnValue([mockReferralTypes, false])
    expect(
      render(<ReferralsConfirmationSelection setMetadata={jest.fn()} metadata={[]} app={mockAppDetail} />),
    ).toMatchSnapshot()
  })

  it('should render component with read and write with both scopes on app', () => {
    mockUseReapitGet.mockReturnValue([mockReferralTypes, false])
    const appWithReadAndWrite = mockAppDetail
    appWithReadAndWrite.scopes?.push({ name: 'agencyCloud/referrals.write', description: 'ref' })

    expect(
      render(<ReferralsConfirmationSelection setMetadata={jest.fn()} metadata={[]} app={appWithReadAndWrite} />),
    ).toMatchSnapshot()
  })
})

describe('handleOnCheckboxChange', () => {
  it('handleOnCheckboxChange should set metadata to []', () => {
    const setMetadata = jest.fn()
    const event = {
      target: {
        checked: true,
      },
    } as unknown as ChangeEvent<HTMLInputElement>
    const curried = handleOnCheckboxChange(setMetadata)
    curried(event)
    expect(setMetadata).toHaveBeenCalledWith([])
  })

  it('handleOnCheckboxChange should set metadata to null', () => {
    const setMetadata = jest.fn()
    const event = {
      target: {
        checked: false,
      },
    } as unknown as ChangeEvent<HTMLInputElement>
    const curried = handleOnCheckboxChange(setMetadata)
    curried(event)
    expect(setMetadata).toHaveBeenCalledWith(null)
  })
})

describe('handleOnChange', () => {
  it('handleOnChange should set metadata to []', () => {
    const setMetadata = jest.fn()
    const event = {
      target: {
        value: '',
      },
    } as unknown as ChangeEvent<HTMLInputElement>
    const curried = handleOnChange(setMetadata)
    curried(event)
    expect(setMetadata).toHaveBeenCalledWith([])
  })

  it('handleOnChange should set metadata to values', () => {
    const setMetadata = jest.fn()
    const event = {
      target: {
        value: 'FOO,BAR',
      },
    } as unknown as ChangeEvent<HTMLInputElement>
    const curried = handleOnChange(setMetadata)
    curried(event)
    expect(setMetadata).toHaveBeenCalledWith([
      {
        service: 'referrals',
        field: 'referralTypeId',
        allow: ['FOO', 'BAR'],
      },
    ])
  })
})
