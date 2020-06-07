import * as React from 'react'
import useReactResponsive from '@/components/hooks/use-react-responsive'
import { H3, Content, Grid, GridItem } from '@reapit/elements'
import { FaCheck } from 'react-icons/fa'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import styles from '@/styles/blocks/standalone-app-detail.scss?mod'
import { MEDIA_INDEX } from '@/constants/media'

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
  const { containerOuterHeader, centerContent, containerHeader, truncate, check, elipsis } = styles

  return (
    <Grid className={`flex items-center mb-4 ${containerOuterHeader}`}>
      <GridItem>
        <Grid className={`flex items-center ${containerHeader}`}>
          <GridItem>
            <img src={appIcon?.uri} alt="App Icon" />
          </GridItem>
          <GridItem className={centerContent}>
            <H3 className={elipsis}>{appDetailData.name}</H3>
            <Content className={`${isMobile ? 'flex justify-center ' : ''}${truncate}`}>
              Verified by Reapit <FaCheck className={check} />
            </Content>
            {buttonGroup}
          </GridItem>
        </Grid>
      </GridItem>
      {featureImageSrc && (
        <GridItem>
          <img src={featureImageSrc} alt="Featured Image" />
        </GridItem>
      )}
    </Grid>
  )
}

export default AppHeader
