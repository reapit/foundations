import React from 'react'
import { EditUserGroups } from '../edit-user-groups'
import { UserModel } from '@reapit/foundations-ts-definitions'
import { mockGroupModelPagedResult, mockUserModelPagedResult } from '../../../tests/__stubs__/users'
import { render } from '../../../tests/react-testing'

const mockUserModel = (mockUserModelPagedResult._embedded as UserModel[])[0]

describe('UpdateUserModal', () => {
  it('should match a snapshot where there is data', () => {
    expect(
      render(
        <EditUserGroups
          refreshUsers={jest.fn()}
          user={mockUserModel}
          userGroups={mockGroupModelPagedResult}
          orgId="mockOrgId"
        />,
      ),
    ).toMatchSnapshot()
  })
})
