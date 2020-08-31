import * as React from 'react'
import { H3, Grid, GridItem, SubTitleH6 } from '@reapit/elements'
import { FaCheck } from 'react-icons/fa'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import * as styles from '../__styles__/standalone-app-detail'

import { MEDIA_INDEX } from '@/constants/media'
import ImagePlaceHolder from '@/assets/images/default-app-icon.jpg'
import featureImagePlaceHolder from '@/assets/images/default-feature-image.jpg'
import { cx } from 'linaria'

export type AppHeaderProps = {
  appDetailData: AppDetailModel & {
    apiKey?: string | undefined
  }
  buttonGroup?: React.ReactNode
}

const AppHeader: React.FC<AppHeaderProps> = ({ appDetailData, buttonGroup }) => {
  const { media } = appDetailData
  const appIcon = media?.filter(({ type }) => type === 'icon')[MEDIA_INDEX.ICON]
  const featureImageSrc = appDetailData?.media?.[MEDIA_INDEX.FEATURE_IMAGE]?.uri
  const { containerOuterHeader, headerContent, containerHeader, check, appIconContainer } = styles

  return (
    <Grid className={cx('flex', 'items-center', 'mb-4', containerOuterHeader, 'flex-col-min-height')}>
      <GridItem>
        <div className={containerHeader}>
          <div className={appIconContainer}>
            <img className="image is-96x96" src={appIcon?.uri || ImagePlaceHolder} alt={appDetailData.name} />
          </div>
          <div className={headerContent}>
            <H3>{appDetailData.name || ''}</H3>
            <SubTitleH6>
              Verified by Reapit <FaCheck className={check} />
            </SubTitleH6>

            {buttonGroup && buttonGroup}
          </div>
        </div>
      </GridItem>
      <GridItem className="items-center">
        <img src={featureImageSrc || featureImagePlaceHolder} alt="Featured Image" />
      </GridItem>
    </Grid>
  )
}

export default AppHeader
