import React from 'react'
import { useReapitGet } from '@reapit/utils-react'
import { Customers } from '../index'
import { render } from '../../../tests/react-testing'
import { mockCustomerModelPagedResult } from '../../../tests/__stubs__/customers'

jest.mock('@reapit/utils-react', () => ({
  useReapitGet: jest.fn(() => [null, false]),
  useReapitUpdate: jest.fn(() => [undefined, undefined, jest.fn()]),
  objectToQuery: jest.fn(),
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
