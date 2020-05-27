import * as React from 'react'
import { FlexContainerBasic, Button, LevelRight } from '@reapit/elements'

export const DeveloperInviteMemberModalFooter: React.FC = () => {
  return (
    <FlexContainerBasic hasPadding>
      <LevelRight>
        <Button variant="secondary" type="button" onClick={() => console.log('Cancel')}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" onClick={() => console.log('Cancel')}>
          Cancel
        </Button>
      </LevelRight>
    </FlexContainerBasic>
  )
}

export default DeveloperInviteMemberModalFooter
