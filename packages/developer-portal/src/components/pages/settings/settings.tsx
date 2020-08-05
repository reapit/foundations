import * as React from 'react'
import { Loader, Section } from '@reapit/elements'
import { Forms } from './forms/forms'
import { Tabs } from './tabs'
import { MemberModel } from '@reapit/foundations-ts-definitions'
import { useSelector } from 'react-redux'
import { selectOrganisationMembers, selectOrganisationMembersLoading } from '@/selector/developers'
import { selectSettingsPageDeveloperInformation } from '@/selector/settings'

export const getCurrentUserRole = (invitedMember: MemberModel[], developerId?: string | null) => {
  const currentUser = invitedMember?.find((item: MemberModel) => {
    return item?.developerId === developerId
  })
  return currentUser?.role
}

const SettingsPage: React.FC = () => {
  const developerInfo = useSelector(selectSettingsPageDeveloperInformation)
  const invitedMember = useSelector(selectOrganisationMembers)
  const role = getCurrentUserRole(invitedMember, developerInfo.id)
  const invitedMemberLoading = useSelector(selectOrganisationMembersLoading)
  if (!developerInfo.id || invitedMemberLoading) {
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
