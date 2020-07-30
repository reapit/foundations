import * as React from 'react'
import { Button, LevelRight, Section, Info } from '@reapit/elements'
import { Tabs } from '../tabs'
import DeveloperInviteModal from '@/components/ui/developer-invite-member-modal'
import { Members } from './members'
import OrganisationForm from './organisation-form'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { selectIsAdmin } from '@/selector/auth'

export const handleToggleVisibleModal = (setModalOpen: React.Dispatch<boolean>, isVisible: boolean) => () =>
  setModalOpen(isVisible)

const DevelperSettingsOrganisationTabPage: React.FC = () => {
  const [isInviteModalOpen, setIsInviteModalOpen] = React.useState<boolean>(false)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const isAdmin = selectIsAdmin(connectSession)
  if (!isAdmin) {
    /**
     * This page is only for admin (which is also a developer)
     *
     * Can't set allow in PrivateRoute component to "ADMIN" because
     * It would change to loginType = 'ADMIN' which set the navbar to admin navbar
     *
     * https://github.com/reapit/foundations/issues/1340
     * Requirement is this page should be used on developer portal and developer navbar.
     * TODO: refactor the the private router or this after the release?
     */
    return <Info infoType="404" />
  }

  return (
    <>
      <Section>
        <Tabs />
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
      />
    </>
  )
}

export default DevelperSettingsOrganisationTabPage
