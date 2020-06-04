import * as React from 'react'
import useReactResponsive from '@/components/hooks/useReactResponsive'
import { H2 } from '@reapit/elements'
import { FaCheck } from 'react-icons/fa'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import styles from '@/styles/blocks/standalone-app-detail.scss?mod'

export type AppHeaderProps = {
  appDetailData: AppDetailModel & {
    apiKey?: string | undefined
  }
  buttonGroup?: React.ReactNode
}

const appIconClassName = ['images', styles.appIcon].join(' ')

const DesktopAppHeader: React.FC<AppHeaderProps> = ({ appDetailData, buttonGroup }) => {
  const { isMobile } = useReactResponsive()
  const { media, name = '' } = appDetailData
  const appIcon = media?.filter(({ type }) => type === 'icon')[0]
  const featuredImage = appDetailData?.media?.[1]?.uri

  return (
    <div className={styles.appHeader}>
      <div className="flex mb-3">
        <div className={styles.appIconContainer}>
          <img className={appIconClassName} src={appIcon && appIcon.uri} alt={name} />
        </div>
        <div className={styles.appHeaderTextContainer}>
          <H2 className={styles.appName}>{appDetailData.name}</H2>
          <div className={styles.verifyByReapitContainer}>
            <FaCheck className={styles.check} /> Verified by Reapit Ltd
          </div>
          {buttonGroup}
        </div>
      </div>

      {!isMobile && featuredImage && <img className={styles.appHeaderFeaturedImage} src={featuredImage} />}
    </div>
  )
}

export default DesktopAppHeader
