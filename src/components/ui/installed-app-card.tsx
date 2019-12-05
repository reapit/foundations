import * as React from 'react'
import { AppSummaryModel } from '@/types/marketplace-api-schema'
import { FaEllipsisH } from 'react-icons/fa'
import { Tile } from '@reapit/elements'
import installedAppCardStyles from '@/styles/blocks/installed-app-card.scss?mod'

export interface InstalledAppCardProps {
  app: AppSummaryModel
  onClick?: (event: React.MouseEvent) => void
}

const InstalledAppCard: React.FC<InstalledAppCardProps> = ({ app, onClick }: InstalledAppCardProps) => {
  return (
    <div className={installedAppCardStyles.container}>
      <div id="installed-card-icon" onClick={onClick} className={installedAppCardStyles.wrapIcon}>
        <img className={installedAppCardStyles.icon} src={app.iconUri} alt="iconUri" />
      </div>
      <p className={installedAppCardStyles.appTitle}>{app.name}</p>
    </div>
  )
}

export default InstalledAppCard
