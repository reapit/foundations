import * as React from 'react'
import { H2 } from '@reapit/elements'
import { FaCheck } from 'react-icons/fa'
import developerAppDetailstyles from '@/styles/pages/developer-app-detail.scss?mod'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import clientAppDetailStyles from '@/styles/pages/client-app-detail.scss?mod'

export type AppHeaderProps = {
  appDetailData: AppDetailModel & {
    apiKey?: string | undefined
  }
  buttonGroup?: React.ReactNode
}

const appIconContainerClassName = [
  developerAppDetailstyles.appIconContainer,
  clientAppDetailStyles.appIconContainer,
].join(' ')

const appIconClassName = ['images', clientAppDetailStyles.appIcon].join(' ')

const placeHolderUrl = 'https://bulma.io/images/placeholders/48x48.png'

export const VerifiedByReapit: React.FC<{ appName: string }> = ({ appName }) => (
  <div>
    <H2 className={clientAppDetailStyles.appName}>{appName}</H2>
    <div className={clientAppDetailStyles.verifyByReapitContainer}>
      <FaCheck className={clientAppDetailStyles.check} /> Verified by Reapit
    </div>
  </div>
)

const AppHeader: React.FC<AppHeaderProps> = ({ appDetailData, buttonGroup }) => {
  const { media, name = '' } = appDetailData
  const appIcon = media?.filter(({ type }) => type === 'icon')[0]

  return (
    <div className={clientAppDetailStyles.appHeader}>
      <div className="flex items-center">
        <div className={appIconContainerClassName}>
          <img className={appIconClassName} src={(appIcon && appIcon.uri) || placeHolderUrl} alt={name} />
        </div>
        <div>
          <VerifiedByReapit appName={name} />
          {buttonGroup}
        </div>
      </div>

      <img
        className={clientAppDetailStyles.appHeaderFeaturedImage}
        src={appDetailData?.media?.[1]?.uri || placeHolderUrl}
      />
    </div>
  )
}

export default AppHeader
