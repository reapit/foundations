import * as React from 'react'
import { H2 } from '@reapit/elements'
import { FaCheck } from 'react-icons/fa'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import styles from '@/styles/blocks/client-app-header.scss?mod'

export type ClientAppHeaderProps = {
  appDetailData: AppDetailModel & {
    apiKey?: string | undefined
  }
  buttonGroup?: React.ReactNode
}

const placeHolderUrl = 'https://bulma.io/images/placeholders/48x48.png'

const ClientAppHeader: React.FC<ClientAppHeaderProps> = ({ appDetailData, buttonGroup }) => {
  const { media } = appDetailData
  const appIcon = media?.filter(({ type }) => type === 'icon')[0]

  return (
    <div className={styles.appHeader}>
      <div className={`flex mb-3 ${styles.titleContainer}`}>
        <div className={styles.appIconContainer} style={{ backgroundImage: `url('${appIcon?.uri}')` }}></div>
        <div className={styles.appHeaderTextContainer}>
          <H2 className={styles.appName}>{appDetailData.name}</H2>
          <div className={styles.verifyByReapitContainer}>
            <FaCheck className={styles.check} /> Verified by Reapit Ltd
          </div>
          {buttonGroup}
        </div>
      </div>

      <div className={styles.separator} />

      <div className={styles.appHeaderFeaturedImageContainer}>
        <img className={styles.appHeaderFeaturedImage} src={appDetailData?.media?.[1]?.uri || placeHolderUrl} />
      </div>
    </div>
  )
}

export default ClientAppHeader
