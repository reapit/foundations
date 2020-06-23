import * as React from 'react'
import useReactResponsive from '@/components/hooks/use-react-responsive'
import { H3, Content, Grid, GridItem, Tile } from '@reapit/elements'
import { FaCheck } from 'react-icons/fa'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import styles from '@/styles/blocks/standalone-app-detail.scss?mod'
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
  const { isMobile } = useReactResponsive()
  const { media } = appDetailData
  const appIcon = media?.filter(({ type }) => type === 'icon')[MEDIA_INDEX.ICON]
  const featureImageSrc = appDetailData?.media?.[MEDIA_INDEX.FEATURE_IMAGE]?.uri
  const { containerOuterHeader, headerContent, containerHeader, check, appIconContainer } = styles

  return (
    <Grid className={cx('flex', 'items-center', 'mb-4', containerOuterHeader, 'flex-col-min-height')}>
      <GridItem>
        <Tile
          heading={<H3 className="text-ellipsis">{appDetailData.name || ''}</H3>}
          subHeading={
            <div className={cx(isMobile && 'flex justify-center')}>
              Verified by Reapit <FaCheck className={check} />
            </div>
          }
          image={<img className="image" src={appIcon?.uri || ImagePlaceHolder} alt={appDetailData.name} />}
        >
          {buttonGroup && buttonGroup}
        </Tile>
      </GridItem>
      <GridItem className="flex items-center">
        <img src={featureImageSrc || featureImagePlaceHolder} alt="Featured Image" />
      </GridItem>
    </Grid>
  )
}

export default AppHeader
