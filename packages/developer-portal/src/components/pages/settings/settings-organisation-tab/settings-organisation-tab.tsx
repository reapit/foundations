import * as React from 'react'
import { Button, LevelRight, Section, Info, Loader } from '@reapit/elements'
import { Tabs } from '../tabs'
import DeveloperInviteModal from '@/components/ui/developer-invite-member-modal'
import { Members } from './members'
import OrganisationForm from './organisation-form'
import { selectOrganisationMembers, selectOrganisationMembersLoading } from '@/selector/developers'
import { useSelector } from 'react-redux'
import { getCurrentUserRole } from '../settings'
import { selectSettingsPageDeveloperInformation } from '@/selector/settings'

export const handleToggleVisibleModal = (setModalOpen: React.Dispatch<boolean>, isVisible: boolean) => () =>
  setModalOpen(isVisible)

const DeveloperSettingsOrganisationTabPage: React.FC = () => {
  const [isInviteModalOpen, setIsInviteModalOpen] = React.useState<boolean>(false)
  const developerInfo = useSelector(selectSettingsPageDeveloperInformation)

  const invitedMember = useSelector(selectOrganisationMembers)
  const role = getCurrentUserRole(invitedMember, developerInfo.email)
  const invitedMemberLoading = useSelector(selectOrganisationMembersLoading)
  if (!developerInfo?.id || invitedMemberLoading) {
    return <Loader />
  }

  if (role === 'admin') {
    return (
      <>
        <Section>
          <Tabs role={role} />
        </Section>
        <OrganisationForm />
        <Members />
        <Section>
          <LevelRight>
            <Button type="button" variant="primary" onClick={handleToggleVisibleModal(setIsInviteModalOpen, true)}>
              Invite New Member
            </Button>
          </LevelRight>
        </Section>

        <DeveloperInviteModal
          visible={isInviteModalOpen}
          onClose={handleToggleVisibleModal(setIsInviteModalOpen, false)}
          developerId={developerInfo.id}
        />
      </>
    )
  }

  return <Info infoType="404" />
}

export default DeveloperSettingsOrganisationTabPage
