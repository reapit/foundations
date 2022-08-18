import React, {
  createRef,
  Dispatch,
  FC,
  LegacyRef,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
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
  PersistentNotification,
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
import { LoginIdentity, useReapitConnect } from '@reapit/connect-session'
import { selectIsAdmin } from '../../utils/auth'
import { filterRestrictedAppDetail } from '../../utils/browse-app'
import { cx } from '@linaria/core'
import { AppsDetailHeader } from './apps-detail-header'
import { trackEventHandler, trackEvent } from '../../core/analytics'
import { navigateBack } from '../../utils/navigation'
import { TrackingEvent } from '../../core/analytics-events'

export interface AppIdParams {
  appId: string
}

export enum VideoType {
  HowTo = 'How To Use App',
  Marketing = 'Marketing Presentation',
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

export const handleOpenVideoModal =
  (
    setVideoUrl: Dispatch<SetStateAction<string | null>>,
    videoOpenModal: () => void,
    videoType: VideoType,
    videoUrl?: string,
  ) =>
  () => {
    if (videoUrl) {
      trackEvent(TrackingEvent.ClickInstallAppButton, true, { videoType, videoUrl })

      setVideoUrl(videoUrl)
      videoOpenModal()
    }
  }

export const handleOpenInstallModal =
  (appInstallOpenModal: () => void, appName?: string, clientId?: string | null, email?: string) => () => {
    trackEvent(TrackingEvent.ClickInstallAppButton, true, { appName, clientId, email })

    appInstallOpenModal()
  }

export const handleCloseVideoModal = (closeModal: () => void) => () => {
  trackEvent(TrackingEvent.ClickCloseVideo, true)

  closeModal()
}

export const handleSalesBannerTimeout =
  (setSalesBannerVisible: Dispatch<SetStateAction<boolean>>, isMobile: boolean) => () => {
    const timeout = setTimeout(() => {
      if (!isMobile) {
        setSalesBannerVisible(true)
      }
    }, 5000)

    return () => clearTimeout(timeout)
  }

export const handleSalesBannerClick =
  (
    setSalesBannerVisible: Dispatch<SetStateAction<boolean>>,
    salesBannerVisibile: boolean,
    loginIdentity?: LoginIdentity,
  ) =>
  () => {
    if (salesBannerVisibile) {
      const { email, name, clientId, userCode, orgName } = loginIdentity ?? {}
      trackEvent(TrackingEvent.ClickSalesLeadBanner, true, { email, name, clientId, userCode, orgName })
    }
    setSalesBannerVisible(!salesBannerVisibile)
  }

export const AppsDetail: FC = () => {
  const history = useHistory()
  const { appId } = useParams<AppIdParams>()
  const imageRefs = useRef<LegacyRef<HTMLDivElement>[]>([])
  const mediaQuery = useMediaQuery()
  const carouselCols = useMemo<number>(handleCarouselCols(mediaQuery), [mediaQuery])
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [salesBannerVisible, setSalesBannerVisible] = useState(false)
  const { Modal: AppInstallModal, openModal: appInstallOpenModal, closeModal: appInstallCloseModal } = useModal()
  const { Modal: InstallSuccessModal, openModal: successOpenModal, closeModal: successCloseModal } = useModal()
  const { Modal: VideoModal, openModal: videoOpenModal, closeModal: videoCloseModal } = useModal()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const clientId = connectSession?.loginIdentity.clientId
  const email = connectSession?.loginIdentity.email
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

  const shouldTrack = Boolean(appId && name)

  useEffect(trackEventHandler(TrackingEvent.LoadAppDetail, shouldTrack, { appId, appName: name }), [
    unfilteredAppDetail,
  ])

  useEffect(handleSalesBannerTimeout(setSalesBannerVisible, mediaQuery.isMobile), [mediaQuery])

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

  const installModalOpen = useCallback(handleOpenInstallModal(appInstallOpenModal, name, clientId, email), [
    connectSession,
    unfilteredAppDetail,
  ])

  const videoModalOpenHowTo = useCallback(
    handleOpenVideoModal(setVideoUrl, videoOpenModal, VideoType.HowTo, (videos ?? [])[0]?.uri),
    [connectSession, unfilteredAppDetail],
  )

  const videoModalOpenMarketing = useCallback(
    handleOpenVideoModal(setVideoUrl, videoOpenModal, VideoType.Marketing, (videos ?? [])[1]?.uri),
    [connectSession, unfilteredAppDetail],
  )

  const trackEnquiryEmail = useCallback(trackEventHandler(TrackingEvent.ClickSendEnquiryEmail, true), [])
  const trackVisitHomepage = useCallback(trackEventHandler(TrackingEvent.ClickVisitAppPage, true), [])
  const trackSupportEmail = useCallback(trackEventHandler(TrackingEvent.ClickSendSupportEmail, true), [])
  const trackViewTerms = useCallback(trackEventHandler(TrackingEvent.ClickViewTermsAndConditions, true), [])
  const trackViewPrivacyPolicy = useCallback(trackEventHandler(TrackingEvent.ClickViewPrivacyPolicy, true), [])
  const trackViewPricing = useCallback(trackEventHandler(TrackingEvent.ClickViewPricing, true), [])
  const salesBannerClick = useCallback(
    handleSalesBannerClick(setSalesBannerVisible, salesBannerVisible, connectSession?.loginIdentity),
    [salesBannerVisible, connectSession],
  )

  const videoModalClose = useCallback(handleCloseVideoModal(videoCloseModal), [])

  return (
    <PageContainer>
      {appDetailLoading ? (
        <Loader />
      ) : (
        <>
          <PersistentNotification onClick={salesBannerClick} isExpanded={salesBannerVisible} intent="critical">
            Interested in hearing more about this app? Click here and one of the Reapit Team will be in touch!
          </PersistentNotification>
          <AppDetailBackButton onClick={navigateBack(history)}>
            <Icon icon="backSystem" intent="primary" />
          </AppDetailBackButton>
          <AppsDetailHeader app={app} />
          <ButtonGroup className={elMb11} alignment="left">
            {!isInstalled && isAdmin && !hideInstall && (
              <Button intent="critical" onClick={installModalOpen}>
                {isDirectApi ? 'Enable Integration' : 'Install App'}
              </Button>
            )}
            {supportEmail && (
              <DesktopLink
                onClick={trackEnquiryEmail}
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
                    <Button intent="low" onClick={videoModalOpenHowTo}>
                      <FlexContainer isFlexAlignCenter>
                        <Icon className={cx(elMr4)} icon="videoSystem" intent="primary" fontSize="1.25em" />
                        {VideoType.HowTo}
                      </FlexContainer>
                    </Button>
                    {videos && videos?.length > 1 && (
                      <Button intent="low" onClick={videoModalOpenMarketing}>
                        <FlexContainer isFlexAlignCenter>
                          <Icon className={cx(elMr4)} icon="videoSystem" intent="primary" fontSize="1.25em" />
                          {VideoType.Marketing}
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
                        <DesktopLink
                          onClick={trackVisitHomepage}
                          uri={homePage}
                          acProcess={AcProcessType.web}
                          target="_blank"
                          content={homePage}
                        />
                      </BodyText>
                    </AppDetailSupportGridCol>
                  )}
                  {supportEmail && (
                    <AppDetailSupportGridCol>
                      <Subtitle hasNoMargin>Support Email</Subtitle>
                      <BodyText hasGreyText hasNoMargin>
                        <DesktopLink
                          onClick={trackSupportEmail}
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
                          onClick={trackViewTerms}
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
                          onClick={trackViewPrivacyPolicy}
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
                          onClick={trackViewPricing}
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
          <Button fixedWidth onClick={videoModalClose} intent="low">
            Close
          </Button>
        </ButtonGroup>
      </VideoModal>
    </PageContainer>
  )
}
