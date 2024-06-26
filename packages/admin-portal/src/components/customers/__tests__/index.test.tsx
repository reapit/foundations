import React from 'react'
import { useReapitGet } from '@reapit/use-reapit-data'
import { Customers, handleFetchGroups } from '../index'
import { render } from '../../../tests/react-testing'
import { mockCustomerModelPagedResult } from '../../../tests/__stubs__/customers'

jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitGet: jest.fn(() => [null, false]),
  useReapitUpdate: jest.fn(() => [undefined, undefined, jest.fn()]),
}))

const mockUseReapitGet = useReapitGet as jest.Mock

describe('Customers', () => {
  it('should render component when loading', () => {
    mockUseReapitGet.mockReturnValue([null, true])
    expect(render(<Customers />)).toMatchSnapshot()
  })

  it('should render component with data', () => {
    mockUseReapitGet.mockReturnValue([mockCustomerModelPagedResult, false])
    expect(render(<Customers />)).toMatchSnapshot()
  })
})

describe('handleFetchGroups', () => {
  it('should set org correctly', () => {
    const setOrgId = jest.fn()
    const orgId = 'MOCK_ID'
    const curried = handleFetchGroups(setOrgId, orgId)

    curried()

    expect(setOrgId).toHaveBeenCalledWith(orgId)
  })
})
