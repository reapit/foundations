import React from 'react'
import { useReapitGet } from '@reapit/utils-react'
import { closeDisableMemberModal, DevsManagement } from '../index'
import { render } from '../../../tests/react-testing'
import { mockDeveloperModelPagedResult } from '../../../tests/__stubs__/developers'

jest.mock('@reapit/utils-react', () => ({
  useReapitGet: jest.fn(() => [null, false]),
  useReapitUpdate: jest.fn(() => [undefined, undefined, jest.fn()]),
  objectToQuery: jest.fn(),
}))

const mockUseReapitGet = useReapitGet as jest.Mock

describe('DevsManagement', () => {
  it('should render component when loading', () => {
    mockUseReapitGet.mockReturnValue([null, true])
    expect(render(<DevsManagement />)).toMatchSnapshot()
  })

  it('should render component with data', () => {
    mockUseReapitGet.mockReturnValue([mockDeveloperModelPagedResult, false])
    expect(render(<DevsManagement />)).toMatchSnapshot()
  })
})

describe('closeDisableMemberModal', () => {
  it('closeDisableMemberModal should correctly set modal invisible', () => {
    const setDisableMemberModalVisible = jest.fn()
    const curried = closeDisableMemberModal(setDisableMemberModalVisible)

    curried()

    expect(setDisableMemberModalVisible).toHaveBeenCalledWith(false)
  })
})
