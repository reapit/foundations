import * as React from 'react'
import useReactResponsive from '@/components/hooks/useReactResponsive'
import { H2, H3 } from '@reapit/elements'
import { FaCheck } from 'react-icons/fa'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import styles from '@/styles/blocks/standalone-app-detail.scss?mod'

export type AppHeaderProps = {
  appDetailData: AppDetailModel & {
    apiKey?: string | undefined
  }
  buttonGroup?: React.ReactNode
}

const DesktopAppHeader: React.FC<AppHeaderProps> = ({ appDetailData, buttonGroup }) => {
  const { isMobile } = useReactResponsive()
  const { media } = appDetailData
  const appIcon = media?.filter(({ type }) => type === 'icon')[0]
  const featuredImage = appDetailData?.media?.[1]?.uri

  return (
    <div className={styles.appHeader}>
      <div className={styles.appInformation}>
        <div className={styles.appIconContainer} style={{ backgroundImage: `url('${appIcon?.uri}')` }}></div>
        <div className={styles.appHeaderTextContainer}>
          {!isMobile ? (
            <H2 className={styles.appName}>{appDetailData.name}</H2>
          ) : (
            <H3 className={styles.appName}>{appDetailData.name}</H3>
          )}
          <div className={styles.verifyByReapitContainer}>
            <FaCheck className={styles.check} /> Verified by Reapit Ltd
          </div>
          {buttonGroup}
        </div>
      </div>
      {!isMobile && featuredImage && (
        <div className={styles.appScreenshot}>
          <img className={styles.featuredImage} src={featuredImage} />
        </div>
      )}
    </div>
  )
}

export default DesktopAppHeader
