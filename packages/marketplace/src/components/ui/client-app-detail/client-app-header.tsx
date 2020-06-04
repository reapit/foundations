import * as React from 'react'
import { H2 } from '@reapit/elements'
import { FaCheck } from 'react-icons/fa'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import styles from '@/styles/blocks/client-app-header.scss?mod'
import { MEDIA_INDEX } from '@/constants/media'

export type ClientAppHeaderProps = {
  appDetailData: AppDetailModel & {
    apiKey?: string | undefined
  }
  buttonGroup?: React.ReactNode
}

const ClientAppHeader: React.FC<ClientAppHeaderProps> = ({ appDetailData, buttonGroup }) => {
  const { media } = appDetailData
  const appIcon = media?.filter(({ type }) => type === 'icon')[MEDIA_INDEX.ICON]
  const featureImageSrc = appDetailData?.media?.[MEDIA_INDEX.FEATURE_IMAGE]?.uri
  const isHaveFeatureImage = !!featureImageSrc

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
        <img
          className={styles.appHeaderFeaturedImage}
          src={featureImageSrc}
          style={{ height: isHaveFeatureImage ? 'auto' : '20rem' }}
        />
      </div>
    </div>
  )
}

export default ClientAppHeader
