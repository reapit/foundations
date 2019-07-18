import * as React from 'react'
import bulma from '@/styles/vendor/bulma'
import { AppSummaryModel } from '@/types/marketplace-api-schema'

export interface AppCardProps {
  app: AppSummaryModel
  className?: string
  onClick?: (event: React.MouseEvent) => void
}

const {
  card,
  image,
  cardImage,
  media,
  mediaLeft,
  cardContent,
  mediaContent,
  is4by3,
  is48x48,
  is4,
  is6,
  title,
  subtitle,
  content
} = bulma

const AppCard: React.FunctionComponent<AppCardProps> = ({ app, onClick, className }: AppCardProps) => (
  <div className={`${card} ${className}`} data-test="app-card" onClick={onClick}>
    <div className={cardImage}>
      <figure className={`${image} ${is4by3}`}>
        <img src="https://bulma.io/images/placeholders/1280x960.png" alt={app.name} />
      </figure>
    </div>
    <div className={cardContent}>
      <div className={media}>
        <div className={mediaLeft}>
          <figure className={`${image} ${is48x48}`}>
            <img src={app.iconUri} alt={app.name} />
          </figure>
        </div>
        <div className={mediaContent}>
          <p className={`${title} ${is4}`}>{app.name}</p>
          <p className={`${subtitle} ${is6}`}>{app.developer}</p>
        </div>
      </div>

      <div className={content}>{app.summary}</div>
    </div>
  </div>
)

export default AppCard
