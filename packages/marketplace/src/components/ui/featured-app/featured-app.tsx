import * as React from 'react'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
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
    <div className="card ml-2 mr-2">
      <Link className="image" to={`${Routes.APPS}/${app.id}`}>
        <FadeIn>
          <img key={app.id} className="image" alt={app.name} src={featureImageSrc} onError={onImageError} />
        </FadeIn>
      </Link>
    </div>
  )
}

export default FeaturedApp
