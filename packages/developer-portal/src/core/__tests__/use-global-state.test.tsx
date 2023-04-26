import React from 'react'
import { render } from '../../tests/react-testing'
import { mockMembersPagedResult } from '../../tests/__stubs__/members'
import { GlobalProvider, handlePermissionError, PERMISSION_ERROR } from '../use-global-state'
import { logger } from '@reapit/utils-react'
import Routes from '../../constants/routes'

jest.mock('@reapit/utils-react', () => ({
  useReapitGet: jest.fn(() => [mockMembersPagedResult, false, undefined, jest.fn()]),
  logger: jest.fn(),
}))

describe('GlobalProvider', () => {
  it('should match a snapshot', () => {
    expect(
      render(
        <GlobalProvider>
          <div />
        </GlobalProvider>,
      ),
    ).toMatchSnapshot()
  })
})

describe('handlePermissionError', () => {
  it('should log a non permission error and show a snack', () => {
    const snack = jest.fn()
    const navigate = jest.fn()
    const error = 'Some random error string'

    const curried = handlePermissionError(snack, navigate)

    curried(error)

    expect(logger).toHaveBeenCalledWith(new Error(error))
    expect(snack).toHaveBeenCalledWith(error)
    expect(navigate).not.toHaveBeenCalled()
  })

  it('should redirect for a permission error', () => {
    const snack = jest.fn()
    const navigate = jest.fn()
    const error = PERMISSION_ERROR

    const curried = handlePermissionError(snack, navigate)

    curried(error)

    expect(logger).not.toHaveBeenCalled()
    expect(snack).not.toHaveBeenCalled()
    expect(navigate).toHaveBeenCalledWith(Routes.CUSTOMER_REGISTER)
  })

  afterEach(() => {
    ;(logger as jest.Mock).mockClear()
  })
})
