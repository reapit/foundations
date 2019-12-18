import * as React from 'react'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { FaEllipsisH } from 'react-icons/fa'
import installedAppCardStyles from '@/styles/blocks/installed-app-card.scss?mod'
import { isMobile, Tile } from '@reapit/elements'

export interface InstalledAppCardProps {
  app: AppSummaryModel
  onClick?: (event: React.MouseEvent) => void
}

const InstalledAppCard: React.FC<InstalledAppCardProps> = ({ app, onClick }: InstalledAppCardProps) => {
  if (isMobile()) {
    return (
      <div className={installedAppCardStyles.container}>
        <div data-test={`app-installed_${app.id}`} onClick={onClick} className={installedAppCardStyles.wrapIcon}>
          <img className={installedAppCardStyles.icon} src={app.iconUri} alt="iconUri" />
        </div>
        <p className={installedAppCardStyles.appTitle}>{app.name}</p>
      </div>
    )
  }

  return (
    <Tile
      onClick={onClick as () => void}
      heading={app.name || ''}
      subHeading={app.developer || ''}
      image={
        <img className="image" src={app.iconUri || 'https://bulma.io/images/placeholders/48x48.png'} alt={app.name} />
      }
      menu={<FaEllipsisH className="media-icon" onClick={onClick} data-test={`app-installed_${app.id}`} />}
    >
      <p className={installedAppCardStyles.content}>{app.summary}</p>
    </Tile>
  )
}

export default InstalledAppCard
