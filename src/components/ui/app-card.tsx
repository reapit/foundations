import * as React from 'react'

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
  <div className={'card' + (className ? ` ${className}` : '')}>
    <img className="card-img-top" src="https://picsum.photos/300/150" alt={appName} />
    <div className="card-body">
      <h5 className="card-title mb-0">{appName}</h5>
      <p>
        <small>By: {developerName}</small>
      </p>
      <p className="card-text">{displayText}</p>
    </div>
  </div>
)

export default AppCard
