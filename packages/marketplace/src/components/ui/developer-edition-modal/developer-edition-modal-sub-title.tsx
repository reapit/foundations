import * as React from 'react'
import { SubTitleH6 } from '@reapit/elements'
import styles from '@/styles/blocks/developer-edition-modal.scss?mod'

export const DeveloperEditionModalSubTitle: React.FC = () => {
  return (
    <SubTitleH6 className={styles.subTitle}>
      The Agency Cloud Developer Edition is used for testing your application and is a licenced product. The cost per
      licence is £300.00 (plus VAT) per month. It will be automatically added to your monthly billing and will auto
      renew until you cancel.
      <br />
      <br />
      There will be no charge for the licence during the Beta phase. For more information regarding the Developer
      Edition please refer to your Developer Registration{' '}
      <a href="#" rel="noopener" target="_blank">
        Terms and Conditions
      </a>
    </SubTitleH6>
  )
}

export default DeveloperEditionModalSubTitle
