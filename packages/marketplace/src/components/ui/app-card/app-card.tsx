import * as React from 'react'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { Tile } from '@reapit/elements'
import * as appCardStyles from './__styles__'
import defaultAppIcon from '@/assets/images/default-app-icon.jpg'
import Fade from '@/components/ui/fade'
import { cx } from 'linaria'

export interface AppCardProps {
  app: AppSummaryModel
  className?: string
  onClick?: (event: React.MouseEvent) => void
  onSettingsClick?: (event: React.MouseEvent) => void
  animated?: boolean
}

export const onImageError = (event: React.SyntheticEvent<HTMLImageElement>) =>
  (event.currentTarget.src = defaultAppIcon)

const AppCard: React.FunctionComponent<AppCardProps> = ({
  app,
  onClick,
  onSettingsClick,
  animated = false,
}: AppCardProps) => {
  const dataTest = ['app-card', app.id]
  !app.pendingRevisions && dataTest.push('isNoPending')
  dataTest.push(app.name)

  const clickAction = (app.installedOn && onSettingsClick ? onSettingsClick : onClick) as () => void

  const content = (
    <div
      className={cx(!app.isListed && appCardStyles.bannerWrap)}
      data-test-app-id={app.id}
      data-test-app-name={app.name}
    >
      {!app.isListed && (
        <div className={appCardStyles.bannerOuter}>
          <div className={appCardStyles.bannerInner}>In Development</div>
        </div>
      )}
      <Tile
        onClick={clickAction}
        dataTest={app.installedOn ? `app-settings_${app.id}` : dataTest.join('_')}
        heading={app.name || ''}
        subHeading={
          <>
            {app.developer}
            {app.isDirectApi ? <span className={appCardStyles.directAPI}>(Integration)</span> : ''}
          </>
        }
        image={<img className="image" src={app.iconUri || defaultAppIcon} onError={onImageError} alt={app.name} />}
      >
        <p className={appCardStyles.content}>{app.summary}</p>
      </Tile>
    </div>
  )

  if (animated)
    return (
      <Fade timeout={300} in unmountOnExit>
        {content}
      </Fade>
    )

  return content
}

export default AppCard
