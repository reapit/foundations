import * as React from 'react'
import { FlexContainerBasic, LevelRight, Button } from '@reapit/elements'
import { DeveloperInviteMemberModalProps } from './developer-invite-member-modal'
import styles from '@/styles/blocks/developer-invite-member.scss?mod'

export type DeveloperInviteMemberModalFooterProps = Pick<DeveloperInviteMemberModalProps, 'afterClose'>

export const DeveloperInviteMemberModalFooter: React.FC<DeveloperInviteMemberModalFooterProps> = ({ afterClose }) => {
  return (
    <FlexContainerBasic>
      <LevelRight className={styles.footerWrapper}>
        <Button variant="secondary" type="button" onClick={afterClose}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Send Invite
        </Button>
      </LevelRight>
    </FlexContainerBasic>
  )
}

export default DeveloperInviteMemberModalFooter
