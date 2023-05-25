import { useReapitGet } from '@reapit/use-reapit-data'
import React, { ChangeEvent } from 'react'
import { render } from '../../../tests/react-testing'
import { mockUserInfo } from '../../../tests/__stubs__/user-info'
import { mockUserModelPagedResult } from '../../../tests/__stubs__/users'
import { AdminPage, handleInitialUserOrgSet, handleUserOrgChange } from '../index'

jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitGet: jest.fn(() => [null, false, undefined, jest.fn()]),
  useReapitUpdate: jest.fn(() => [null, false, undefined, jest.fn]),
}))

const mockUseReapitGet = useReapitGet as jest.Mock

describe('AdminPage', () => {
  it('should match a snapshot when loading', () => {
    mockUseReapitGet.mockReturnValueOnce([null, true]).mockReturnValueOnce([null, true])
    expect(render(<AdminPage />)).toMatchSnapshot()
  })

  it('should match a snapshot when has data', () => {
    mockUseReapitGet.mockReturnValueOnce([mockUserInfo, false]).mockReturnValueOnce([mockUserModelPagedResult, false])
    expect(render(<AdminPage />)).toMatchSnapshot()
  })

  it('should match a snapshot when no users found', () => {
    mockUseReapitGet.mockReturnValueOnce([mockUserInfo, false]).mockReturnValueOnce([[], false])
    expect(render(<AdminPage />)).toMatchSnapshot()
  })

  it('should match a snapshot when not multi org', () => {
    mockUseReapitGet.mockReturnValueOnce([{}, false]).mockReturnValueOnce([mockUserModelPagedResult, false])
    expect(render(<AdminPage />)).toMatchSnapshot()
  })
})

describe('handleInitialUserOrgSet', () => {
  it('should handle setting org id', () => {
    const setOrganisationId = jest.fn()
    const orgId = 'MOCK_ID'
    const curried = handleInitialUserOrgSet(setOrganisationId, orgId)

    curried()

    expect(setOrganisationId).toHaveBeenCalledWith(orgId)
  })
})

describe('handleUserOrgChange', () => {
  it('should handle setting org id', () => {
    const setOrganisationId = jest.fn()
    const event = {
      target: {
        value: 'MOCK_ID',
      },
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    } as unknown as ChangeEvent<HTMLSelectElement>
    const curried = handleUserOrgChange(setOrganisationId)

    curried(event)

    expect(setOrganisationId).toHaveBeenCalledWith(event.target.value)
  })
})
