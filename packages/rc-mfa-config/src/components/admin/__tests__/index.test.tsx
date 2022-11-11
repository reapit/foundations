import { useReapitGet } from '@reapit/utils-react'
import React from 'react'
import { render } from '../../../tests/react-testing'
import { mockUserModelPagedResult } from '../../../tests/__stubs__/users'
import { AdminPage } from '../index'

jest.mock('@reapit/utils-react', () => ({
  useReapitGet: jest.fn(() => [null, false, undefined, jest.fn()]),
  useReapitUpdate: jest.fn(() => [null, false, undefined, jest.fn]),
  objectToQuery: jest.fn(),
}))

const mockUseReapitGet = useReapitGet as jest.Mock

describe('AdminPage', () => {
  it('should match a snapshot when loading', () => {
    mockUseReapitGet.mockReturnValue([null, true])
    expect(render(<AdminPage />)).toMatchSnapshot()
  })

  it('should match a snapshot when has data', () => {
    mockUseReapitGet.mockReturnValue([mockUserModelPagedResult, false])
    expect(render(<AdminPage />)).toMatchSnapshot()
  })

  it('should match a snapshot when no users found', () => {
    mockUseReapitGet.mockReturnValue([[], false])
    expect(render(<AdminPage />)).toMatchSnapshot()
  })
})
