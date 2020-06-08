import * as React from 'react'
import { FlexContainerResponsive, Content, FlexContainerBasic, Button, LevelRight } from '@reapit/elements'
import { Tabs } from '../tabs'
import DeveloperInviteModal from '@/components/ui/developer-invite-member-modal'

export const handleToggleVisibleModal = (setIsInviteModalOpen: React.Dispatch<boolean>, isVisible: boolean) => () =>
  setIsInviteModalOpen(isVisible)

const DevelperSettingsOrganisationTabPage: React.FC = () => {
  const [isInviteModalOpen, setIsInviteModalOpen] = React.useState<boolean>(false)

  return (
    <>
      <FlexContainerBasic flexColumn hasPadding>
        <Content>
          <FlexContainerResponsive flexColumn hasBackground hasPadding>
            <Tabs />
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
    </>
  )
}

export default DevelperSettingsOrganisationTabPage
