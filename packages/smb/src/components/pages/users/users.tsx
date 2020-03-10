import * as React from 'react'
import { H3, FlexContainerBasic, FlexContainerResponsive } from '@reapit/elements'
import UserList from '@/components/ui/user-list'

export type UsersProps = {}

export const Users: React.FC<UsersProps> = () => {
  return (
    <FlexContainerBasic hasPadding hasBackground>
      <FlexContainerResponsive flexColumn hasPadding hasBackground>
        <H3>Users</H3>
        <UserList />
      </FlexContainerResponsive>
    </FlexContainerBasic>
  )
}

export default Users
