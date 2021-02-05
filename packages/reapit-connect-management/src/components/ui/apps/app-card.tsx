import React from 'react'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { Tile } from '@reapit/elements'
import defaultAppIcon from '../../../assets/images/default-app-icon.jpg'
import { directAPI } from '../__styles__'
import Routes from '../../../constants/routes'
import { history } from '../../../core/router'

export interface AppCardProps {
  app: AppSummaryModel
}

export const onImageError = (event: React.SyntheticEvent<HTMLImageElement>) =>
  (event.currentTarget.src = defaultAppIcon)

export const handleNavigation = (appId: string) => () => {
  history.push(`${Routes.MARKETPLACE}/${appId}`)
}

const AppCard: React.FC<AppCardProps> = ({ app }: AppCardProps) => (
  <Tile
    heading={app.name || ''}
    onClick={handleNavigation(app.id as string)}
    subHeading={
      <>
        {app.developer || ''}
        {app.isDirectApi ? <span className={directAPI}>(Integration)</span> : ''}
      </>
    }
    image={<img className="image" src={app.iconUri || defaultAppIcon} alt={app.name} onError={onImageError} />}
  />
)

export default AppCard
