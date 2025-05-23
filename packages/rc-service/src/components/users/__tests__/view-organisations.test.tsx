import React from 'react'
import { UserModel } from '@reapit/foundations-ts-definitions'
import { mockUserModelPagedResult } from '../../../tests/__stubs__/users'
import { render } from '../../../tests/react-testing'
import { ViewOrganisations } from '../view-organisations'

const mockUserModel = (mockUserModelPagedResult._embedded as UserModel[])[0]

describe('OrganisationsViewModal', () => {
  it('should match a snapshot where there is data', () => {
    expect(render(<ViewOrganisations user={mockUserModel} />)).toMatchSnapshot()
  })
})
