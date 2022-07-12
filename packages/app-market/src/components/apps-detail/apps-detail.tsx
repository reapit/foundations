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
  Grid,
  Col,
  elMb11,
  elMr5,
  elMb5,
  SmallText,
} from '@reapit/elements'
import { useHistory, useParams } from 'react-router-dom'
import { HTMLRender, useReapitGet } from '@reapit/utils-react'
import {
  AppDetailModel,
  DesktopIntegrationTypeModelPagedResult,
  DeveloperModel,
} from '@reapit/foundations-ts-definitions'
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
  AppDetailPermissionChip,
  AppDetailWrapper,
  AppDetaulCategoryChip,
  htmlRender,
} from './__styles__'
import { Carousel } from '../carousel'
import { IsFreeNotice } from '../apps-browse/__styles__'

export interface AppIdParams {
  appId: string
}

export const handleCarouselCols = (mediaQuery: MediaType) => () => {
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

  const [developerDetail] = useReapitGet<DeveloperModel>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getDeveloper],
    uriParams: { developerId: appDetail?.developerId },
    fetchWhenTrue: [appDetail?.developerId],
  })

  const [desktopIntegrationTypes] = useReapitGet<DesktopIntegrationTypeModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getDesktopIntegrationTypes],
  })

  const app = appDetail ?? {}
  const developer = developerDetail ?? {}
  const {
    name,
    description,
    media,
    summary,
    scopes,
    homePage,
    supportEmail,
    telephone,
    termsAndConditionsUrl,
    privacyPolicyUrl,
    pricingUrl,
    isFree,
    category,
    isDirectApi,
    desktopIntegrationTypeIds,
  } = app
  const { about } = developer
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
          <AppDetailBackButton onClick={history.goBack}>
            <Icon icon="backSystem" intent="primary" />
          </AppDetailBackButton>
          <FlexContainer className={elMb5}>
            <AppDetailWrapper>
              {iconUri ? (
                <AppDetailIcon className={elFadeIn} src={iconUri} alt={name} />
              ) : (
                <PlaceholderImage placeholder="placeholderSmall" size={72} />
              )}
            </AppDetailWrapper>
            <FlexContainer isFlexColumn isFlexJustifyBetween>
              <FlexContainer isFlexColumn>
                <Title hasNoMargin>{name}</Title>
                <BodyText hasGreyText>{summary}</BodyText>
              </FlexContainer>
              <FlexContainer>
                <Icon icon="tickSolidSystem" className={elMr5} intent="success" />
                <SmallText className={elMr5} hasNoMargin>
                  Verified by Reapit
                </SmallText>
                {category?.name && <AppDetaulCategoryChip className={elFadeIn}>{category.name}</AppDetaulCategoryChip>}
                {isDirectApi && (
                  <SmallText className={elMr5} hasBoldText hasNoMargin>
                    Integration
                  </SmallText>
                )}
                {isFree && <IsFreeNotice>FREE</IsFreeNotice>}
              </FlexContainer>
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
            className={elMb11}
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
          <Grid className={elMb11}>
            {homePage && (
              <Col>
                <Subtitle hasNoMargin>Website</Subtitle>
                <BodyText hasGreyText hasNoMargin>
                  <a href={homePage} rel="noopener noreferrer" target="_blank">
                    {homePage}
                  </a>
                </BodyText>
              </Col>
            )}
            {supportEmail && (
              <Col>
                <Subtitle hasNoMargin>Support Email</Subtitle>
                <BodyText hasGreyText hasNoMargin>
                  <a href={`mailto:${supportEmail}`} rel="noopener noreferrer" target="_blank">
                    {supportEmail}
                  </a>
                </BodyText>
              </Col>
            )}
            {telephone && (
              <Col>
                <Subtitle hasNoMargin>Telephone</Subtitle>
                <BodyText hasGreyText hasNoMargin>
                  {telephone}
                </BodyText>
              </Col>
            )}
            {termsAndConditionsUrl && (
              <Col>
                <Subtitle hasNoMargin>Support Email</Subtitle>
                <BodyText hasGreyText hasNoMargin>
                  <a href={termsAndConditionsUrl} rel="noopener noreferrer" target="_blank">
                    {termsAndConditionsUrl}
                  </a>
                </BodyText>
              </Col>
            )}
            {privacyPolicyUrl && (
              <Col>
                <Subtitle hasNoMargin>Support Email</Subtitle>
                <BodyText hasGreyText hasNoMargin>
                  <a href={privacyPolicyUrl} rel="noopener noreferrer" target="_blank">
                    {privacyPolicyUrl}
                  </a>
                </BodyText>
              </Col>
            )}
            <Col>
              <Subtitle hasNoMargin>Pricing Policy</Subtitle>
              <BodyText hasGreyText hasNoMargin>
                {!isFree && pricingUrl ? (
                  <a href={pricingUrl} rel="noopener noreferrer" target="_blank">
                    {pricingUrl}
                  </a>
                ) : (
                  'Free'
                )}
              </BodyText>
            </Col>
          </Grid>
          <div className={elMb11}>
            <Subtitle hasBoldText>About Developer</Subtitle>
            <BodyText hasNoMargin hasGreyText>
              {about}
            </BodyText>
          </div>
          <div className={elMb11}>
            <Subtitle hasBoldText>Permissions</Subtitle>
            {scopes?.map(({ name, description }) => (
              <AppDetailPermissionChip key={name}>{description}</AppDetailPermissionChip>
            ))}
          </div>
          {Boolean(desktopIntegrationTypeIds?.length) && (
            <div className={elMb11}>
              <Subtitle hasBoldText>AgencyCloud Integration</Subtitle>
              {desktopIntegrationTypeIds?.map((id) => {
                const desktopType = desktopIntegrationTypes?.data?.find((item) => item.id === id)
                if (desktopType) return <AppDetailPermissionChip key={id}>{desktopType.name}</AppDetailPermissionChip>
              })}
            </div>
          )}
        </>
      )}
    </PageContainer>
  )
}
