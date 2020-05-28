import * as React from 'react'
import { FlexContainerBasic, Button, LevelRight, ModalProps } from '@reapit/elements'
import styles from '@/styles/blocks/developer-invite-member.scss?mod'

export type DeveloperInviteMemberModalFooterProps = Pick<ModalProps, 'afterClose'>

export const DeveloperInviteMemberModalFooter: React.FC<DeveloperInviteMemberModalFooterProps> = ({ afterClose }) => {
  return (
    <FlexContainerBasic>
      <LevelRight className={styles.footerWrapper}>
        <Button variant="secondary" type="button" onClick={afterClose}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" onClick={() => console.log('Cancel')}>
          Send Invite
        </Button>
      </LevelRight>
    </FlexContainerBasic>
  )
}

export default DeveloperInviteMemberModalFooter
