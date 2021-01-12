import React from 'react'
import useSWR from 'swr'
import { URLS } from '../../../constants/api'
import { Loader } from '@reapit/elements'
import { UserModel } from '../../../types/organisations-schema'

export const MemberName: React.FC<{ name: string; isLast: boolean }> = ({ name, isLast }) => {
  return <span>{name ? `${name}${isLast ? '' : ', '}` : ''}</span>
}

const GroupMembersCell = ({
  cell: {
    row: { original },
  },
}) => {
  const { data }: any = useSWR(`${URLS.USERS_GROUPS}/${original.id}/members`)
  if (!data) return <Loader />

  const { _embedded: listUserGroupMember } = data
  console.log(listUserGroupMember)
  return (
    <>
      {listUserGroupMember.map((user: UserModel, index: number) => (
        <MemberName name={user?.name || ''} isLast={index === listUserGroupMember.length - 1} key={user.id} />
      ))}
    </>
  )
}
export default GroupMembersCell
