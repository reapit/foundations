import * as React from 'react'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import * as installedAppCardStyles from './__styles__/installed-app-card'
import { isMobile, Tile } from '@reapit/elements'
import defaultAppIcon from '@/assets/images/default-app-icon.jpg'
import * as appCardStyles from '../../ui/app-card/__styles__'
import { cx } from 'linaria'

export interface InstalledAppCardProps {
  app: AppSummaryModel
  onClick?: (event: React.MouseEvent) => void
}

export const onImageError = (event: React.SyntheticEvent<HTMLImageElement>) =>
  (event.currentTarget.src = defaultAppIcon)

const InstalledAppCard: React.FC<InstalledAppCardProps> = ({ app, onClick }: InstalledAppCardProps) => {
  if (isMobile()) {
    return (
      <div data-test-app-id={app.id} data-test-app-name={app.name} className={installedAppCardStyles.container}>
        <div data-test={`app-installed_${app.id}`} onClick={onClick} className={installedAppCardStyles.wrapIcon}>
          <img
            className={installedAppCardStyles.icon}
            src={app.iconUri || defaultAppIcon}
            alt="iconUri"
            onError={onImageError}
          />
        </div>
        <p title={app.name} className={installedAppCardStyles.appTitle}>
          {app.name}
        </p>
      </div>
    )
  }

  return (
    <div
      className={cx(!app.isListed && appCardStyles.bannerWrap)}
      data-test-app-id={app.id}
      data-test-app-name={app.name}
    >
      {!app.isListed && (
        <div className={appCardStyles.bannerOuterSmall}>
          <div className={appCardStyles.bannerInnerSmall}>In Development</div>
        </div>
      )}
      <Tile
        onClick={onClick as () => void}
        heading={app.name || ''}
        subHeading={app.developer || ''}
        image={<img className="image" src={app.iconUri || defaultAppIcon} alt={app.name} onError={onImageError} />}
      />
    </div>
  )
}

export default InstalledAppCard
