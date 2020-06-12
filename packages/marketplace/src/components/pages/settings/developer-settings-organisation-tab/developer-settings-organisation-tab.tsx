import * as React from 'react'
import { FlexContainerResponsive, Content, FlexContainerBasic, Button, LevelRight } from '@reapit/elements'
import { Tabs } from '../tabs'
import styles from '@/styles/elements/link.scss?mod'
import DeveloperInviteModal from '@/components/ui/developer-invite-member-modal'
import SetAsAdminModal from '@/components/ui/developer-settings/set-as-admin-modal'

export const handleToggleVisibleModal = (setModalOpen: React.Dispatch<boolean>, isVisible: boolean) => () =>
  setModalOpen(isVisible)

const DevelperSettingsOrganisationTabPage: React.FC = () => {
  const [isInviteModalOpen, setIsInviteModalOpen] = React.useState<boolean>(false)
  const [isSetAdminModalOpen, setIsSetAdminModalOpen] = React.useState<boolean>(false)

  return (
    <>
      <FlexContainerBasic flexColumn hasPadding>
        <Content>
          <FlexContainerResponsive flexColumn hasBackground hasPadding>
            <Tabs />
            {/* 
              Add this link to preview the Set as Admin modal.

              TODO
                Will move to the user list when below task completed
                https://github.com/reapit/foundations/issues/1342 
            */}
            <LevelRight>
              <a className={styles.hyperlinked} onClick={handleToggleVisibleModal(setIsSetAdminModalOpen, true)}>
                Set as Admin
              </a>
            </LevelRight>

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
