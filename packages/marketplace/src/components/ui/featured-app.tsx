import * as React from 'react'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { GridThreeColItem } from '@reapit/elements'
import styles from '@/styles/blocks/featured-app.scss?mod'
import { Link } from 'react-router-dom'
import Routes from '@/constants/routes'
import featureImagePlaceHolder from '@/assets/images/default-feature-image.jpg'

export interface FeaturedAppProps {
  app: AppSummaryModel
}

export const onImageError = (event: React.SyntheticEvent<HTMLImageElement>) =>
  (event.currentTarget.src = featureImagePlaceHolder)

const FeaturedApp: React.FunctionComponent<FeaturedAppProps> = ({ app }: FeaturedAppProps) => {
  const featureImageSrc = app.featuredImageUri || featureImagePlaceHolder

  return (
    <GridThreeColItem className={styles['featured-app']} key={app.id}>
      <div className="card">
        <div className="card-image">
          <Link className="image" to={`${Routes.APPS}/${app.id}`}>
            <img key={app.id} className="image" alt={app.name} src={featureImageSrc} onError={onImageError} />
          </Link>
        </div>
      </div>
    </GridThreeColItem>
  )
}

export default FeaturedApp
