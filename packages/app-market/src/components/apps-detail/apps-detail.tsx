import React, { createRef, Dispatch, FC, LegacyRef, SetStateAction, useMemo, useRef, useState } from 'react'
import {
  PageContainer,
  Loader,
  Subtitle,
  FlexContainer,
  PlaceholderImage,
  BodyText,
  elMb7,
  Icon,
  useMediaQuery,
  MediaType,
  elMb11,
  ButtonGroup,
  Button,
  elMr4,
  useModal,
  elMr6,
  elMl6,
} from '@reapit/elements'
import { useHistory, useParams } from 'react-router-dom'
import { AcProcessType, DesktopLink, HTMLRender, useReapitGet } from '@reapit/utils-react'
import { AppDetailModel, DesktopIntegrationTypeModelPagedResult } from '@reapit/foundations-ts-definitions'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { GetActionNames, getActions } from '../../../../utils-common/src'
import {
  AppDetailBackButton,
  AppDetailDescriptionColAside,
  AppDetailDescriptionColMain,
  AppDetailDescriptionGrid,
  AppDetailImage,
  AppDetailImageWrapper,
  AppDetailPermissionChip,
  htmlRender,
  appDetailVideoModal,
  AppsDetailContentGrid,
  AppDetailSupportGrid,
  AppDetailSupportGridCol,
  AppDetailDescriptionAsideDesktop,
} from './__styles__'
import { Carousel } from '../carousel'
import { AppInstallModalContent } from './app-install-modal'
import { AppInstallSuccesModalContent } from './app-install-success-modal'
import { useReapitConnect } from '@reapit/connect-session'
import { selectIsAdmin } from '../../utils/auth'
import { filterRestrictedAppDetail } from '../../utils/browse-app'
import { cx } from '@linaria/core'
import { AppsDetailHeader } from './apps-detail-header'

export interface AppIdParams {
  appId: string
}

export const handleCarouselCols = (mediaQuery: MediaType) => () => {
  const { isMobile, isTablet, isDesktop, isSuperWideScreen, is4KScreen } = mediaQuery

  if (isMobile) {
    return 1
  }

  if (isTablet || isDesktop) {
    return 2
  }

  if (isSuperWideScreen || is4KScreen) {
    return 1
  }

  return 3
}

export const handleOpenModal =
  (setVideoUrl: Dispatch<SetStateAction<string | null>>, videoOpenModal: () => void, videoUrl?: string) => () => {
    if (videoUrl) {
      setVideoUrl(videoUrl)
      videoOpenModal()
    }
  }

export const AppsDetail: FC = () => {
  const history = useHistory()
  const { appId } = useParams<AppIdParams>()
  const imageRefs = useRef<LegacyRef<HTMLDivElement>[]>([])
  const mediaQuery = useMediaQuery()
  const carouselCols = useMemo<number>(handleCarouselCols(mediaQuery), [mediaQuery])
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const { Modal: AppInstallModal, openModal: appInstallOpenModal, closeModal: appInstallCloseModal } = useModal()
  const { Modal: InstallSuccessModal, openModal: successOpenModal, closeModal: successCloseModal } = useModal()
  const { Modal: VideoModal, openModal: videoOpenModal, closeModal: videoCloseModal } = useModal()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const clientId = connectSession?.loginIdentity.clientId
  const sessionDeveloperId = connectSession?.loginIdentity.developerId

  const [unfilteredAppDetail, appDetailLoading, , refetchApp] = useReapitGet<AppDetailModel>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getAppById],
    queryParams: { clientId },
    uriParams: {
      appId,
    },
    fetchWhenTrue: [appId, clientId],
  })

  const appDetail = useMemo(filterRestrictedAppDetail(unfilteredAppDetail, connectSession), [unfilteredAppDetail])

  const [desktopIntegrationTypes] = useReapitGet<DesktopIntegrationTypeModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getDesktopIntegrationTypes],
  })

  const app = appDetail ?? {}
  const {
    name,
    description,
    media,
    scopes,
    homePage,
    supportEmail,
    telephone,
    termsAndConditionsUrl,
    privacyPolicyUrl,
    pricingUrl,
    isFree,
    isDirectApi,
    desktopIntegrationTypeIds,
    developerAbout,
    developer,
    installedOn,
    isListed,
    developerId,
  } = app

  const images = media?.filter((item) => item.type === 'image')
  const videos = media?.filter((item) => item.type === 'video')
  const heroImage = images ? images[0] : null
  const screenshots = images ? images.slice(1, images.length) : []
  imageRefs.current = screenshots.map((_, i) => imageRefs.current[i] ?? createRef())
  const isSandbox = clientId !== 'SBOX' && clientId !== 'SBXA'
  const hideInstall =
    (!isListed && isSandbox) || (isSandbox && sessionDeveloperId && sessionDeveloperId !== developerId)
  const isInstalled = Boolean(installedOn)
  const isAdmin = selectIsAdmin(connectSession)
  const { isSuperWideScreen, is4KScreen } = mediaQuery
  const isFullScreen = isSuperWideScreen || is4KScreen

  return (
    <PageContainer>
      {appDetailLoading ? (
        <Loader />
      ) : (
        <>
          <AppDetailBackButton onClick={history.goBack}>
            <Icon icon="backSystem" intent="primary" />
          </AppDetailBackButton>
          <AppsDetailHeader app={app} />
          <ButtonGroup className={elMb11} alignment="left">
            {!isInstalled && isAdmin && !hideInstall && (
              <Button intent="critical" onClick={appInstallOpenModal}>
                {isDirectApi ? 'Enable Integration' : 'Install App'}
              </Button>
            )}
            {supportEmail && (
              <DesktopLink
                uri={`${supportEmail}?subject=${name}%20Enquiry&body=Dear%20${developer}%2C%20%0A%0AI%20would%20like%20more%20information%20about%20${name}%20featured%20in%20the%20Reapit%20AppMarket%20%0A%0ARegards`}
                acProcess={AcProcessType.mail}
                target="_blank"
                content={
                  <Button intent="low">{isDirectApi ? 'Enquire About Integration' : 'Enquire About App'}</Button>
                }
              />
            )}
          </ButtonGroup>
          <AppsDetailContentGrid>
            <AppDetailDescriptionGrid>
              <AppDetailDescriptionColMain>
                <Subtitle hasBoldText>About App</Subtitle>
                <HTMLRender className={htmlRender} html={description ?? ''} />
                {videos && Boolean(videos?.length) && (
                  <ButtonGroup>
                    <Button intent="low" onClick={handleOpenModal(setVideoUrl, videoOpenModal, videos[0]?.uri)}>
                      <FlexContainer isFlexAlignCenter>
                        <Icon className={cx(elMr4)} icon="videoSystem" intent="primary" fontSize="1.25em" />
                        How To Use App
                      </FlexContainer>
                    </Button>
                    {videos && videos?.length > 1 && (
                      <Button intent="low" onClick={handleOpenModal(setVideoUrl, videoOpenModal, videos[1]?.uri)}>
                        <FlexContainer isFlexAlignCenter>
                          <Icon className={cx(elMr4)} icon="videoSystem" intent="primary" fontSize="1.25em" />
                          Marketing Presentation
                        </FlexContainer>
                      </Button>
                    )}
                  </ButtonGroup>
                )}
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
            <FlexContainer isFlexRowReverse={isFullScreen} isFlexColumn={!isFullScreen}>
              <FlexContainer isFlexColumn>
                <AppDetailDescriptionAsideDesktop>
                  <AppDetailImageWrapper>
                    {heroImage?.uri ? (
                      <AppDetailImage src={heroImage.uri} alt={description} />
                    ) : (
                      <PlaceholderImage className={elMb7} placeholder="placeholderLarge" size={192} fillAvailable />
                    )}
                  </AppDetailImageWrapper>
                </AppDetailDescriptionAsideDesktop>
                <Carousel
                  className={cx(elMb11, isFullScreen && elMl6)}
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
              </FlexContainer>
              <FlexContainer className={cx(isFullScreen && elMr6)} isFlexColumn>
                <AppDetailSupportGrid className={elMb11}>
                  {homePage && (
                    <AppDetailSupportGridCol>
                      <Subtitle hasNoMargin>Website</Subtitle>
                      <BodyText hasGreyText hasNoMargin>
                        <DesktopLink uri={homePage} acProcess={AcProcessType.web} target="_blank" content={homePage} />
                      </BodyText>
                    </AppDetailSupportGridCol>
                  )}
                  {supportEmail && (
                    <AppDetailSupportGridCol>
                      <Subtitle hasNoMargin>Support Email</Subtitle>
                      <BodyText hasGreyText hasNoMargin>
                        <DesktopLink
                          uri={supportEmail}
                          acProcess={AcProcessType.mail}
                          target="_blank"
                          content={supportEmail}
                        />
                      </BodyText>
                    </AppDetailSupportGridCol>
                  )}
                  {telephone && (
                    <AppDetailSupportGridCol>
                      <Subtitle hasNoMargin>Telephone</Subtitle>
                      <BodyText hasGreyText hasNoMargin>
                        {telephone}
                      </BodyText>
                    </AppDetailSupportGridCol>
                  )}
                  {termsAndConditionsUrl && (
                    <AppDetailSupportGridCol>
                      <Subtitle hasNoMargin>Terms and Conditions</Subtitle>
                      <BodyText hasGreyText hasNoMargin>
                        <DesktopLink
                          uri={termsAndConditionsUrl}
                          acProcess={AcProcessType.web}
                          target="_blank"
                          content={termsAndConditionsUrl}
                        />
                      </BodyText>
                    </AppDetailSupportGridCol>
                  )}
                  {privacyPolicyUrl && (
                    <AppDetailSupportGridCol>
                      <Subtitle hasNoMargin>Privacy Policy</Subtitle>
                      <BodyText hasGreyText hasNoMargin>
                        <DesktopLink
                          uri={privacyPolicyUrl}
                          acProcess={AcProcessType.web}
                          target="_blank"
                          content={privacyPolicyUrl}
                        />
                      </BodyText>
                    </AppDetailSupportGridCol>
                  )}
                  <AppDetailSupportGridCol>
                    <Subtitle hasNoMargin>Pricing Policy</Subtitle>
                    <BodyText hasGreyText hasNoMargin>
                      {!isFree && pricingUrl ? (
                        <DesktopLink
                          uri={pricingUrl}
                          acProcess={AcProcessType.web}
                          target="_blank"
                          content={pricingUrl}
                        />
                      ) : (
                        'Free'
                      )}
                    </BodyText>
                  </AppDetailSupportGridCol>
                </AppDetailSupportGrid>
                <div className={elMb11}>
                  <Subtitle hasBoldText>About Developer</Subtitle>
                  <BodyText hasNoMargin hasGreyText>
                    {developerAbout}
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
                      if (desktopType)
                        return <AppDetailPermissionChip key={id}>{desktopType.name}</AppDetailPermissionChip>
                    })}
                  </div>
                )}
              </FlexContainer>
            </FlexContainer>
          </AppsDetailContentGrid>
        </>
      )}
      <AppInstallModal title={`Install ${name}`}>
        <AppInstallModalContent
          app={app}
          closeModal={appInstallCloseModal}
          successOpenModal={successOpenModal}
          desktopIntegrationTypes={desktopIntegrationTypes}
          refetchApp={refetchApp}
        />
      </AppInstallModal>
      <InstallSuccessModal title="Success">
        <AppInstallSuccesModalContent app={app} closeModal={successCloseModal} developer={developer} />
      </InstallSuccessModal>
      <VideoModal className={appDetailVideoModal} title="Watch Video">
        <iframe
          className={elMb11}
          src={videoUrl ?? ''}
          title="YouTube video player"
          frameBorder="0"
          width="100%"
          height="100%"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <ButtonGroup alignment="center">
          <Button fixedWidth onClick={videoCloseModal} intent="low">
            Close
          </Button>
        </ButtonGroup>
      </VideoModal>
    </PageContainer>
  )
}
