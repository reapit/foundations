import * as React from 'react'
import { Loader, Section } from '@reapit/elements'
import { Forms } from './settings-profile-tab/forms'
import { Tabs } from './tabs'
import { MemberModel } from '@reapit/foundations-ts-definitions'
import { useSelector } from 'react-redux'
import { selectOrganisationMembers, selectOrganisationMembersLoading } from '@/selector/developers'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'

export const getCurrentUserRole = (invitedMember: MemberModel[], email?: string | null) => {
  const currentUser = invitedMember?.find((item: MemberModel) => {
    return item?.email === email
  })
  return currentUser?.role
}

const SettingsPage: React.FC = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const invitedMember = useSelector(selectOrganisationMembers)
  const role = getCurrentUserRole(invitedMember, connectSession?.loginIdentity?.email)
  const invitedMemberLoading = useSelector(selectOrganisationMembersLoading)
  if (!connectSession?.loginIdentity?.email || invitedMemberLoading) {
    return <Loader />
  }

  return (
    <>
      <Section>
        <Tabs role={role} />
      </Section>
      <Forms />
    </>
  )
}

export default SettingsPage
