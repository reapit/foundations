import * as React from 'react'
import bulma from '@/styles/vendor/bulma'

export interface AppCardProps {
  id: string
  appName: string
  developerName: string
  developerId: string
  displayImage: string
  displayText: string
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

const AppCard: React.FunctionComponent<AppCardProps> = ({
  appName,
  developerName,
  displayImage,
  displayText,
  onClick,
  className
}: AppCardProps) => (
  <div className={`${card} ${className}`} data-test="app-card" onClick={onClick}>
    <div className={cardImage}>
      <figure className={`${image} ${is4by3}`}>
        <img src="https://bulma.io/images/placeholders/1280x960.png" alt={appName} />
      </figure>
    </div>
    <div className={cardContent}>
      <div className={media}>
        <div className={mediaLeft}>
          <figure className={`${image} ${is48x48}`}>
            <img src="https://bulma.io/images/placeholders/96x96.png" alt={appName} />
          </figure>
        </div>
        <div className={mediaContent}>
          <p className={`${title} ${is4}`}>{appName}</p>
          <p className={`${subtitle} ${is6}`}>{developerName}</p>
        </div>
      </div>

      <div className={content}>{displayText}</div>
    </div>
  </div>
)

export default AppCard
