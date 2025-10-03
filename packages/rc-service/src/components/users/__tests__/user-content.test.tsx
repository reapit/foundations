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
        orgs={{
          _embedded: [
            {
              id: 'd2lsbG1jdmF5QGljbG91ZC5jb20',
              name: 'an org',
              // @ts-expect-error
              types: ['customer', 'developer'],
            },
          ],
        }}
        refreshUsers={() => {}}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
