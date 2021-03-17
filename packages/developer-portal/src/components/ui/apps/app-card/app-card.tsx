import * as React from 'react'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { Tile } from '@reapit/elements'
import defaultAppIcon from '@/assets/images/default-app-icon.jpg'
import { appSummary } from './__styles__/app-card'

export interface AppCardProps {
  app: AppSummaryModel
  className?: string
  onClick?: (event: React.MouseEvent) => void
  onSettingsClick?: (event: React.MouseEvent) => void
}

export const onImageError = (event: React.SyntheticEvent<HTMLImageElement>) =>
  (event.currentTarget.src = defaultAppIcon)

const AppCard: React.FunctionComponent<AppCardProps> = ({ app, onClick, onSettingsClick }: AppCardProps) => {
  const dataTest = ['app-card', app.id]
  !app.pendingRevisions && dataTest.push('isNoPending')
  dataTest.push(app.name)

  const clickAction = (app.installedOn && onSettingsClick ? onSettingsClick : onClick) as () => void

  return (
    <div data-test-app-id={app.id} data-test-app-name={app.name}>
      <Tile
        onClick={clickAction}
        dataTest={app.installedOn ? `app-settings_${app.id}` : dataTest.join('_')}
        heading={app.name || ''}
        subHeadingAdditional={app.isDirectApi ? 'Integration' : ''}
        subHeading={app.developer}
        image={<img className="image" src={app.iconUri || defaultAppIcon} onError={onImageError} alt={app.name} />}
      >
        <p className={appSummary}>{app.summary}</p>
      </Tile>
    </div>
  )
}

export default AppCard
