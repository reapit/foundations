import React from 'react'
import { render } from '../../../tests/react-testing'
import UsersPage from '..'
import { mockUserModelPagedResult } from '../../../tests/__stubs__/users'

jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitGet: jest.fn(() => [mockUserModelPagedResult]),
}))

describe('UsersPage', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<UsersPage />)
    expect(wrapper).toMatchSnapshot()
  })
})
