import * as React from 'react'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { GridThreeColItem } from '@reapit/elements'
import * as styles from './__styles__'
import { Link } from 'react-router-dom'
import Routes from '@/constants/routes'
import featureImagePlaceHolder from '@/assets/images/default-feature-image.jpg'
import FadeIn from '../../../core/__styles__/fade-in'

export interface FeaturedAppProps {
  app: AppSummaryModel
}

export const onImageError = (event: React.SyntheticEvent<HTMLImageElement>) =>
  (event.currentTarget.src = featureImagePlaceHolder)

const FeaturedApp: React.FunctionComponent<FeaturedAppProps> = ({ app }: FeaturedAppProps) => {
  const featureImageSrc = app.featuredImageUri || featureImagePlaceHolder

  return (
    <GridThreeColItem className={styles.featuredApp} key={app.id}>
      <div className="card">
        <div className="card-image">
          <Link className="image" to={`${Routes.APPS}/${app.id}`}>
            <FadeIn>
              <img key={app.id} className="image" alt={app.name} src={featureImageSrc} onError={onImageError} />
            </FadeIn>
          </Link>
        </div>
      </div>
    </GridThreeColItem>
  )
}

export default FeaturedApp
