import React from 'react'
import { UserModel } from '@reapit/foundations-ts-definitions'
import { mockUserModelPagedResult } from '../../../tests/__stubs__/users'
import { render } from '../../../tests/react-testing'
import { UpdateUserName } from '../update-user-name'

const mockUserModel = (mockUserModelPagedResult._embedded as UserModel[])[0]

describe('UpdateUserNameModal', () => {
  it('should match a snapshot where there is data', () => {
    expect(render(<UpdateUserName user={mockUserModel} />)).toMatchSnapshot()
  })
})
