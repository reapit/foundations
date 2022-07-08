import React, { createRef, FC, LegacyRef, useMemo, useRef } from 'react'
import {
  Title,
  PageContainer,
  Loader,
  Subtitle,
  FlexContainer,
  PlaceholderImage,
  elFadeIn,
  BodyText,
  elMb7,
  Icon,
  useMediaQuery,
  MediaType,
} from '@reapit/elements'
import { useHistory, useParams } from 'react-router-dom'
import { HTMLRender, useReapitGet } from '@reapit/utils-react'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { GetActionNames, getActions } from '../../../../utils-common/src'
import {
  AppDetailBackButton,
  AppDetailDescriptionColAside,
  AppDetailDescriptionColMain,
  AppDetailDescriptionGrid,
  AppDetailIcon,
  AppDetailImage,
  AppDetailImageWrapper,
  AppDetailWrapper,
  htmlRender,
} from './__styles__'
import { Routes } from '../../constants/routes'
import { navigate } from '../../utils/navigation'
import { Carousel } from '../carousel'

export interface AppIdParams {
  appId: string
}

const handleCarouselCols = (mediaQuery: MediaType) => () => {
  const { isMobile, isTablet, isDesktop } = mediaQuery

  if (isMobile) {
    return 1
  }

  if (isTablet || isDesktop) {
    return 2
  }

  return 3
}
export const AppsDetail: FC = () => {
  const history = useHistory()
  const { appId } = useParams<AppIdParams>()
  const imageRefs = useRef<LegacyRef<HTMLDivElement>[]>([])
  const mediaQuery = useMediaQuery()
  const carouselCols = useMemo<number>(handleCarouselCols(mediaQuery), [mediaQuery])

  const [appDetail, appDetailLoading] = useReapitGet<AppDetailModel>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getAppById],
    uriParams: {
      appId,
    },
    fetchWhenTrue: [appId],
  })

  const app = appDetail ?? {}
  const { name, description, media, summary } = app
  const iconUri = media?.find((item) => item.type === 'icon')?.uri
  const images = media?.filter((item) => item.type === 'image')
  const heroImage = images ? images[0] : null
  const screenshots = images ? images.slice(1, images.length) : []
  imageRefs.current = screenshots.map((_, i) => imageRefs.current[i] ?? createRef())

  return (
    <PageContainer>
      {appDetailLoading ? (
        <Loader />
      ) : (
        <>
          <AppDetailBackButton onClick={navigate(history, Routes.APPS_BROWSE)}>
            <Icon icon="backSystem" intent="primary" />
          </AppDetailBackButton>
          <FlexContainer>
            <AppDetailWrapper>
              {iconUri ? (
                <AppDetailIcon className={elFadeIn} src={iconUri} alt={name} />
              ) : (
                <PlaceholderImage placeholder="placeholderSmall" size={72} />
              )}
            </AppDetailWrapper>
            <FlexContainer isFlexColumn>
              <Title hasNoMargin>{name}</Title>
              <BodyText hasGreyText>{summary}</BodyText>
            </FlexContainer>
          </FlexContainer>
          <AppDetailDescriptionGrid>
            <AppDetailDescriptionColMain>
              <Subtitle hasBoldText>About App</Subtitle>
              <HTMLRender className={htmlRender} html={description ?? ''} />
            </AppDetailDescriptionColMain>
            <AppDetailDescriptionColAside>
              <AppDetailImageWrapper>
                {heroImage?.uri ? (
                  <AppDetailImage src={heroImage.uri} alt={description} />
                ) : (
                  <PlaceholderImage className={elMb7} placeholder="placeholderLarge" size={192} fillAvailable />
                )}
              </AppDetailImageWrapper>
            </AppDetailDescriptionColAside>
          </AppDetailDescriptionGrid>
          <Carousel
            numberCols={carouselCols}
            items={screenshots.map(({ id, uri, description }) => (
              <AppDetailImageWrapper key={id}>
                {uri ? (
                  <AppDetailImage src={uri} alt={description} />
                ) : (
                  <PlaceholderImage className={elMb7} placeholder="placeholderLarge" size={192} fillAvailable />
                )}
              </AppDetailImageWrapper>
            ))}
          />
        </>
      )}
    </PageContainer>
  )
}
