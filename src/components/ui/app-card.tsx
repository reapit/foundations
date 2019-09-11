import * as React from 'react'
import bulma from '@/styles/vendor/bulma'
import { AppSummaryModel } from '@/types/marketplace-api-schema'
import appCardStyles from '@/styles/blocks/app-card.scss?mod'
import { FaCog } from 'react-icons/fa'

export interface AppCardProps {
  app: AppSummaryModel
  className?: string
  onClick?: (event: React.MouseEvent) => void
  onSettingsClick?: (event: React.MouseEvent) => void
}

const { card, image, cardContent, is48x48, is5, is6, title, subtitle, content, cardFooter, cardFooterItem } = bulma
const { appCard, isCentered, isLeft, appCardContent } = appCardStyles

const AppCard: React.FunctionComponent<AppCardProps> = ({ app, onClick, onSettingsClick, className }: AppCardProps) => {
  const dataTest = ['app-card', app.id]
  !app.pendingRevisions && dataTest.push('isNoPending')
  dataTest.push(app.name)

  return (
    <div className={`${card} ${className} ${appCard}`} data-test={dataTest.join('_')} onClick={onClick}>
      <div className={cardContent}>
        <figure className={`${image} ${is48x48} ${isCentered}`}>
          <img src={app.iconUri || 'https://bulma.io/images/placeholders/48x48.png'} alt={app.name} />
        </figure>
        <h5 className={`${title} ${is5}`}>{app.name}</h5>
        <p className={`${subtitle} ${is6} ${appCardContent}`}>{app.summary}</p>
      </div>
      <div className={cardFooter}>
        <p className={`${cardFooterItem} ${isLeft}`}>{app.developer}</p>
        {app.installedOn && onSettingsClick && (
          <p className={`${cardFooterItem} ${isLeft}`} onClick={onSettingsClick} data-test={`app-settings_${app.id}`}>
            <FaCog />
            &nbsp; Settings
          </p>
        )}
      </div>
    </div>
  )
}

export default AppCard
