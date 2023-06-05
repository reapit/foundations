import React from 'react'
import { render } from '../../../tests/react-testing'
import OrgsPage from '..'
import { mockOrganisationModelPagedResult } from '../../../tests/__stubs__/orgs'

jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitGet: jest.fn(() => [mockOrganisationModelPagedResult]),
}))

describe('OrgsPage', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<OrgsPage />)
    expect(wrapper).toMatchSnapshot()
  })
})
