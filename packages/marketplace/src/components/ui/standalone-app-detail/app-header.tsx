import * as React from 'react'
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

const placeHolderUrl = 'https://bulma.io/images/placeholders/48x48.png'

export const VerifiedByReapit: React.FC<{ appName: string }> = ({ appName }) => (
  <div>
    <H2 className={styles.appName}>{appName}</H2>
    <div className={styles.verifyByReapitContainer}>
      <FaCheck className={styles.check} /> Verified by Reapit
    </div>
  </div>
)

const DesktopAppHeader: React.FC<AppHeaderProps> = ({ appDetailData, buttonGroup }) => {
  const { media, name = '' } = appDetailData
  const appIcon = media?.filter(({ type }) => type === 'icon')[0]

  return (
    <div className={styles.appHeader}>
      <div className="flex items-center">
        <div className={styles.appIconContainer}>
          <img className={appIconClassName} src={(appIcon && appIcon.uri) || placeHolderUrl} alt={name} />
        </div>
        <div>
          <VerifiedByReapit appName={name} />
          {buttonGroup}
        </div>
      </div>

      <img className={styles.appHeaderFeaturedImage} src={appDetailData?.media?.[1]?.uri || placeHolderUrl} />
    </div>
  )
}

export default DesktopAppHeader
