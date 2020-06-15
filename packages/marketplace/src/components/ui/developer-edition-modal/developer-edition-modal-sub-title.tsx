import * as React from 'react'
import { SubTitleH6 } from '@reapit/elements'
import styles from '@/styles/blocks/developer-edition-modal.scss?mod'

export const DeveloperEditionModalSubTitle: React.FC = () => {
  return (
    <SubTitleH6 className={styles.subTitle}>
      Please enter a name and email address below to invite a new member to your organisation:
    </SubTitleH6>
  )
}

export default DeveloperEditionModalSubTitle
