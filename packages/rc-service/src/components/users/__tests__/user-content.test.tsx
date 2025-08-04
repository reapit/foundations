import { UserContent } from '../user-content'
import React from 'react'
import { render } from '../../../tests/react-testing'
import { mockUserModelPagedResult } from '../../../tests/__stubs__/users'

describe('UserContent', () => {
  it('Should match snapshot', async () => {
    const wrapper = render(
      <UserContent
        user={{
          ...(mockUserModelPagedResult._embedded ? mockUserModelPagedResult._embedded[0] : {}),
        }}
        userGroups={{ _embedded: [] }}
        refreshUsers={() => {}}
      />,
    )
  })
})
