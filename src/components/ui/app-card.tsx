import * as React from 'react'
import bulma from '@/styles/vendor/bulma.scss?mod'

export interface AppCardProps {
  id: string
  appName: string
  developerName: string
  developerId: string
  displayImage: string
  displayText: string
  className?: string
}

const AppCard: React.FunctionComponent<AppCardProps> = ({
  appName,
  developerName,
  displayImage,
  displayText,
  className
}: AppCardProps) => (
  <div className={`${bulma.card} ${className}`}>
    <div className={bulma['card-image']}>
      <figure className={`${bulma.image} ${bulma['is-4by3']}`}>
        <img src="https://bulma.io/images/placeholders/1280x960.png" alt={appName} />
      </figure>
    </div>
    <div className={bulma['card-content']}>
      <div className={bulma.media}>
        <div className={bulma['media-left']}>
          <figure className={`${bulma.image} ${bulma['is-48x48']}`}>
            <img src="https://bulma.io/images/placeholders/96x96.png" alt={appName} />
          </figure>
        </div>
        <div className={bulma['media-content']}>
          <p className={`${bulma.title} ${bulma['is-4']}`}>{appName}</p>
          <p className={`${bulma.subtitle} ${bulma['is-6']}`}>{developerName}</p>
        </div>
      </div>

      <div className={bulma.content}>{displayText}</div>
    </div>
  </div>
)

export default AppCard
