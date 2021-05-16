import * as React from 'react'
import { Button, LevelRight, Info } from '@reapit/elements'
import { Tabs } from '../tabs'
import DeveloperInviteModal from '@/components/ui/developer-invite-member-modal'
import { Members } from './members'
import OrganisationForm from './organisation-form'
import { useSelector } from 'react-redux'
import { selectCurrentMemberData, selectCurrentMemberIsLoading } from '@/selector/current-member'
import { Loader } from '@reapit/elements/v3'

export const handleToggleVisibleModal = (setModalOpen: React.Dispatch<boolean>, isVisible: boolean) => () =>
  setModalOpen(isVisible)

const DeveloperSettingsOrganisationTabPage: React.FC = () => {
  const [isInviteModalOpen, setIsInviteModalOpen] = React.useState<boolean>(false)
  const currentUser = useSelector(selectCurrentMemberData)
  const loading = useSelector(selectCurrentMemberIsLoading)
  if (loading) {
    return <Loader label="Loading" fullPage />
  }
  if (currentUser?.role === 'admin') {
    return (
      <>
        <Tabs role={currentUser.role} />
        <OrganisationForm onInviteNewMemberClick={handleToggleVisibleModal(setIsInviteModalOpen, true)} />
        <Members />
        <LevelRight>
          <Button type="button" variant="primary" onClick={handleToggleVisibleModal(setIsInviteModalOpen, true)}>
            Invite New Member
          </Button>
        </LevelRight>
        <DeveloperInviteModal
          visible={isInviteModalOpen}
          onClose={handleToggleVisibleModal(setIsInviteModalOpen, false)}
          developerId={currentUser?.developerId as string}
        />
      </>
    )
  }

  return <Info infoType="404" />
}

export default DeveloperSettingsOrganisationTabPage
