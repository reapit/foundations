import * as React from 'react'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { FaEllipsisH } from 'react-icons/fa'
import { Tile } from '@reapit/elements'
import appCardStyles from '@/styles/blocks/app-card.scss?mod'

export interface AppCardProps {
  app: AppSummaryModel
  className?: string
  onClick?: (event: React.MouseEvent) => void
  onSettingsClick?: (event: React.MouseEvent) => void
}

const AppCard: React.FunctionComponent<AppCardProps> = ({ app, onClick, onSettingsClick, className }: AppCardProps) => {
  const dataTest = ['app-card', app.id]
  !app.pendingRevisions && dataTest.push('isNoPending')
  dataTest.push(app.name)

  return (
    <div data-test-app-id={app.id} data-test-app-name={app.name}>
      <Tile
        onClick={onClick as () => void}
        dataTest={dataTest.join('_')}
        heading={app.name || ''}
        subHeading={
          <>
            {app.developer}
            {app.isDirectApi ? <span className={appCardStyles.directAPI}>(Direct API)</span> : ''}
          </>
        }
        image={
          <img className="image" src={app.iconUri || 'https://bulma.io/images/placeholders/48x48.png'} alt={app.name} />
        }
        menu={
          app.installedOn &&
          onSettingsClick && (
            <FaEllipsisH className="media-icon" onClick={onSettingsClick} data-test={`app-settings_${app.id}`} />
          )
        }
      >
        <p className={appCardStyles.content}>{app.summary}</p>
      </Tile>
    </div>
  )
}

export default AppCard
