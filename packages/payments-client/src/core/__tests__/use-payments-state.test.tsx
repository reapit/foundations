import React from 'react'
import { render } from '../../tests/react-testing'
// import { mockMembersPagedResult } from '../../tests/__stubs__/members'
import { PaymentsProvider } from '../use-payments-state'

jest.mock('@reapit/utils-react', () => ({
  useReapitGet: jest.fn(() => [null, false, undefined, jest.fn()]),
  logger: jest.fn(),
}))

describe('PaymentsProvider', () => {
  it('should match a snapshot', () => {
    expect(
      render(
        <PaymentsProvider>
          <div />
        </PaymentsProvider>,
      ),
    ).toMatchSnapshot()
  })
})
