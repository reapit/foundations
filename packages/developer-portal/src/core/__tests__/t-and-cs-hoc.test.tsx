import React from 'react'
import { TAndCsHoc, handleMemberUpdate, handleMemberUpdated, handleUpdateTerms } from '../t-and-cs-hoc'
import { render } from '../../tests/react-testing'
import dayjs from 'dayjs'
import { DATE_TIME_FORMAT } from '@reapit/utils-common'
import { mockMemberModel } from '../../tests/__stubs__/members'

jest.mock('../use-global-state')
jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: () => ({
    connectLoginRedirect: jest.fn(),
  }),
}))
jest.mock('../components/register/terms-and-conditions-modal/terms-and-conditions-pdf', () => ({TermsAndConditionsPdf: jest.fn(() => <div>Mocked PDF</div>)}))

describe('TAndCsHoc', () => {
  it('should match snapshot', () => {
    const wrapper = render(
      <TAndCsHoc>
        <div />
      </TAndCsHoc>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('handleUpdateTerms', () => {
  it('should update terms', () => {
    const updateMember = jest.fn()
    const curried = handleUpdateTerms(updateMember, mockMemberModel)

    curried()

    expect(updateMember).toHaveBeenCalledWith({
      ...mockMemberModel,
      agreedTerms: dayjs().format(DATE_TIME_FORMAT.RFC3339),
    })
  })
})

describe('handleMemberUpdate', () => {
  it('should show modal', () => {
    const showTermsModal = false
    const setShowTermsModal = jest.fn()
    const currentMember = {
      ...mockMemberModel,
      agreedTerms: undefined,
    }
    const curried = handleMemberUpdate(currentMember, showTermsModal, setShowTermsModal)

    curried()

    expect(setShowTermsModal).toHaveBeenCalledWith(true)
  })
})

describe('handleMemberUpdated', () => {
  it('should redirect on error', () => {
    const connectLoginRedirect = jest.fn()
    const setShowTermsModal = jest.fn()

    const curried = handleMemberUpdated(connectLoginRedirect, setShowTermsModal, 'ERROR')

    curried()

    expect(connectLoginRedirect).toHaveBeenCalledTimes(1)
    expect(setShowTermsModal).not.toHaveBeenCalled()
  })

  it('should close modal on success', () => {
    const connectLoginRedirect = jest.fn()
    const setShowTermsModal = jest.fn()

    const curried = handleMemberUpdated(connectLoginRedirect, setShowTermsModal, null, true)

    curried()

    expect(connectLoginRedirect).not.toHaveBeenCalled()
    expect(setShowTermsModal).toHaveBeenCalledWith(false)
  })
})
