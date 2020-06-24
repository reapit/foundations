import * as React from 'react'
import { FlexContainerResponsive, Content, FlexContainerBasic, Button, LevelRight } from '@reapit/elements'
import { Tabs } from '../tabs'
import DeveloperInviteModal from '@/components/ui/developer-invite-member-modal'
import SetAsAdminModal from '@/components/ui/developer-settings/set-as-admin-modal'
import { selectIsAdmin } from '@/selector/auth'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { CompanyInformation } from './company-information'
import { Members } from './members'

export const handleToggleVisibleModal = (setModalOpen: React.Dispatch<boolean>, isVisible: boolean) => () =>
  setModalOpen(isVisible)

const DevelperSettingsOrganisationTabPage: React.FC = () => {
  const [isInviteModalOpen, setIsInviteModalOpen] = React.useState<boolean>(false)
  const [isSetAdminModalOpen, setIsSetAdminModalOpen] = React.useState<boolean>(false)
  const isAdmin = useSelector(selectIsAdmin)

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
    return <Redirect to="/404" />
  }

  return (
    <>
      <FlexContainerBasic flexColumn hasPadding>
        <Content>
          <FlexContainerResponsive flexColumn hasBackground hasPadding>
            <Tabs />
            {/* <LevelRight>
              <a className={styles.hyperlinked} onClick={handleToggleVisibleModal(setIsSetAdminModalOpen, true)}>
                Set as Admin
              </a>
            </LevelRight> */}

            <CompanyInformation />
            <Members />
            <LevelRight>
              <Button type="button" variant="primary" onClick={handleToggleVisibleModal(setIsInviteModalOpen, true)}>
                Invite New Member
              </Button>
            </LevelRight>
          </FlexContainerResponsive>
        </Content>
      </FlexContainerBasic>

      <DeveloperInviteModal
        visible={isInviteModalOpen}
        afterClose={handleToggleVisibleModal(setIsInviteModalOpen, false)}
      />
      <SetAsAdminModal
        visible={isSetAdminModalOpen}
        afterClose={handleToggleVisibleModal(setIsSetAdminModalOpen, false)}
        username="TEST"
      />
    </>
  )
}

export default DevelperSettingsOrganisationTabPage
