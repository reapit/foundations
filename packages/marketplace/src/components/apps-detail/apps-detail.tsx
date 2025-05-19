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
  PersistentNotification,
  elMt6,
} from '@reapit/elements'
import { useNavigate, useParams } from 'react-router-dom'
import { AcProcessType, DesktopLink, HTMLRender } from '@reapit/utils-react'
import { AppDetailModel, DesktopIntegrationTypeModelPagedResult } from '@reapit/foundations-ts-definitions'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { GetActionNames, getActions, useReapitGet } from '@reapit/use-reapit-data'
import {
  AppDetailBackButton,
  AppsDetailContentColMain,
  AppDetailImage,
  AppDetailImageWrapper,
  AppDetailPermissionChip,
  appDetailVideoModal,
  AppsDetailContentGrid,
  AppDetailSupportGrid,
  AppDetailSupportGridCol,
  appDetailInfoLineAdjust,
  AppsDetailContentColCarousel,
  AppsDetailContentColPermissions,
  AppDetailImageWrap,
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
import { DESKTOP_CONTEXT_KEY, navigateBack, openNewPage } from '../../utils/navigation'
import { TrackingEvent } from '../../core/analytics-events'

export interface AppIdParams {
  appId: string
}

export enum VideoType {
  HowTo = 'Getting started with ',
  Marketing = 'Why ',
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
    appName?: string,
    clientId?: string | null,
    email?: string,
  ) =>
  () => {
    if (videoUrl) {
      const isDesktop = Boolean(window[DESKTOP_CONTEXT_KEY])
      const isVimeo = videoUrl.includes('https://player.vimeo.com/video/')
      const isYouTube = videoUrl.includes('https://www.youtube.com/embed/')

      trackEvent(TrackingEvent.ClickViewVideo, true, { videoType, videoUrl, appName, clientId, email })

      if (isYouTube || (!isDesktop && isVimeo)) {
        setVideoUrl(videoUrl)
        videoOpenModal()
      } else {
        const newPageHandle = openNewPage(videoUrl)
        newPageHandle()
      }
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
  const navigate = useNavigate()
  const { appId } = useParams<'appId'>()
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
    action: getActions[GetActionNames.getAppById],
    queryParams: { clientId },
    uriParams: {
      appId,
    },
    fetchWhenTrue: [appId, clientId],
  })

  const appDetail = useMemo(filterRestrictedAppDetail(unfilteredAppDetail, connectSession), [unfilteredAppDetail])

  const [desktopIntegrationTypes] = useReapitGet<DesktopIntegrationTypeModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getDesktopIntegrationTypes],
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
  const isSandbox = clientId === 'SBOX' || clientId === 'SBXA'
  const isSboxDev = sessionDeveloperId && isSandbox && sessionDeveloperId === developerId
  const isInstalled = Boolean(installedOn)
  const isAdmin = selectIsAdmin(connectSession)

  const installModalOpen = useCallback(handleOpenInstallModal(appInstallOpenModal, name, clientId, email), [
    connectSession,
    unfilteredAppDetail,
  ])

  const videoModalOpenHowTo = useCallback(
    handleOpenVideoModal(setVideoUrl, videoOpenModal, VideoType.HowTo, (videos ?? [])[0]?.uri, name, clientId, email),
    [connectSession, unfilteredAppDetail],
  )

  const videoModalOpenMarketing = useCallback(
    handleOpenVideoModal(
      setVideoUrl,
      videoOpenModal,
      VideoType.Marketing,
      (videos ?? [])[1]?.uri,
      name,
      clientId,
      email,
    ),
    [connectSession, unfilteredAppDetail],
  )

  const trackEnquiryEmail = useCallback(
    trackEventHandler(TrackingEvent.ClickSendEnquiryEmail, true, {
      clientId,
      email,
      enquiryEmail: supportEmail,
      appName: name,
    }),
    [app, connectSession],
  )
  const trackVisitHomepage = useCallback(
    trackEventHandler(TrackingEvent.ClickVisitAppPage, true, { clientId, email, appName: name }),
    [app, connectSession],
  )
  const trackSupportEmail = useCallback(
    trackEventHandler(TrackingEvent.ClickSendSupportEmail, true, { clientId, email, supportEmail, appName: name }),
    [app, connectSession],
  )
  const trackViewTerms = useCallback(
    trackEventHandler(TrackingEvent.ClickViewTermsAndConditions, true, { clientId, email, appName: name }),
    [app, connectSession],
  )
  const trackViewPrivacyPolicy = useCallback(
    trackEventHandler(TrackingEvent.ClickViewPrivacyPolicy, true, { clientId, email, appName: name }),
    [app, connectSession],
  )
  const trackViewPricing = useCallback(
    trackEventHandler(TrackingEvent.ClickViewPricing, true, { clientId, email, appName: name }),
    [app, connectSession],
  )
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
          {/* Feature flagging sales banner in production */}
          {process.env.appEnv !== 'production' && (
            <PersistentNotification onClick={salesBannerClick} isExpanded={salesBannerVisible} intent="primary">
              Interested in hearing more about this app? Click here and one of the Reapit Team will be in touch!
            </PersistentNotification>
          )}
          <AppDetailBackButton onClick={navigateBack(navigate)}>
            <Icon icon="chevronLeft" intent="primary" />
          </AppDetailBackButton>
          <AppsDetailHeader app={app} />
          <ButtonGroup className={elMb11} alignment="left">
            {!isInstalled && (isAdmin || isSboxDev) && (
              <Button intent="primary" onClick={installModalOpen}>
                {isDirectApi ? 'Enable Integration' : 'Install App'}
              </Button>
            )}
            {supportEmail && (
              <DesktopLink
                onClick={trackEnquiryEmail}
                uri={`${supportEmail}?subject=${name}%20Enquiry&body=Dear%20${developer}%2C%20%0A%0AI%20would%20like%20more%20information%20about%20${name}%20featured%20in%20the%20Reapit%20AppMarket%20%0A%0ARegards`}
                acProcess={AcProcessType.mail}
                target="_blank"
                consentModal={{
                  title: 'Email enquiry',
                  body: `Thank you for your interest in ‘${name}’, to make an enquiry please click ‘Continue’ below. We will launch your default mail client and your information will be shared with ‘${developer}’.`,
                }}
                content={
                  <Button intent="default">{isDirectApi ? 'Enquire About Integration' : 'Enquire About App'}</Button>
                }
              />
            )}
          </ButtonGroup>
          <AppsDetailContentGrid>
            <AppsDetailContentColMain>
              <Subtitle hasBoldText>About App</Subtitle>
              <HTMLRender
                html={description ?? ''}
                image={
                  <AppDetailImageWrap>
                    {heroImage?.uri ? (
                      <AppDetailImage src={heroImage.uri} alt={description} />
                    ) : (
                      <PlaceholderImage className={elMb7} placeholder="placeholderLarge" size={192} fillAvailable />
                    )}
                  </AppDetailImageWrap>
                }
              />
              {videos && Boolean(videos?.length) && (
                <ButtonGroup>
                  <Button intent="default" onClick={videoModalOpenHowTo}>
                    <FlexContainer isFlexAlignCenter>
                      <Icon className={cx(elMr4)} icon="video" intent="primary" fontSize="1.25em" />
                      {VideoType.HowTo}
                      {name}
                    </FlexContainer>
                  </Button>
                  {videos && videos?.length > 1 && (
                    <Button intent="default" onClick={videoModalOpenMarketing}>
                      <FlexContainer isFlexAlignCenter>
                        <Icon className={cx(elMr4)} icon="video" intent="primary" fontSize="1.25em" />
                        {VideoType.Marketing}
                        {name}
                      </FlexContainer>
                    </Button>
                  )}
                </ButtonGroup>
              )}
            </AppsDetailContentColMain>
            <AppsDetailContentColCarousel>
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
            </AppsDetailContentColCarousel>
            <AppsDetailContentColPermissions>
              <AppDetailSupportGrid className={elMb11}>
                {homePage && (
                  <AppDetailSupportGridCol>
                    <Subtitle hasNoMargin>Website</Subtitle>
                    <BodyText className={appDetailInfoLineAdjust} hasGreyText hasNoMargin>
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
                    <BodyText className={appDetailInfoLineAdjust} hasGreyText hasNoMargin>
                      <DesktopLink
                        onClick={trackSupportEmail}
                        uri={supportEmail}
                        acProcess={AcProcessType.mail}
                        consentModal={{
                          title: 'Email enquiry',
                          body: `Thank you for your interest in ‘${name}’, to make an enquiry please click ‘Continue’ below. We will launch your default mail client and your information will be shared with ‘${developer}’.`,
                        }}
                        target="_blank"
                        content={supportEmail}
                      />
                    </BodyText>
                  </AppDetailSupportGridCol>
                )}
                {telephone && (
                  <AppDetailSupportGridCol>
                    <Subtitle hasNoMargin>Telephone</Subtitle>
                    <BodyText className={appDetailInfoLineAdjust} hasGreyText hasNoMargin>
                      {telephone}
                    </BodyText>
                  </AppDetailSupportGridCol>
                )}
                {termsAndConditionsUrl && (
                  <AppDetailSupportGridCol>
                    <Subtitle hasNoMargin>Terms and Conditions</Subtitle>
                    <BodyText className={appDetailInfoLineAdjust} hasGreyText hasNoMargin>
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
                    <BodyText className={appDetailInfoLineAdjust} hasGreyText hasNoMargin>
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
                  <BodyText className={appDetailInfoLineAdjust} hasGreyText hasNoMargin>
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
                <BodyText className={cx(elMt6)} hasGreyText>
                  For more detailed information about App permissions, please{' '}
                  <DesktopLink
                    uri="https://foundations-documentation.reapit.cloud/platform-glossary/permissions"
                    acProcess={AcProcessType.web}
                    target="_blank"
                    content="https://foundations-documentation.reapit.cloud/platform-glossary/permissions"
                  />
                </BodyText>
              </div>
              {Boolean(desktopIntegrationTypeIds?.length) && (
                <div className={elMb11}>
                  <Subtitle hasBoldText>AgencyCloud Launch Point</Subtitle>
                  {desktopIntegrationTypeIds?.map((id) => {
                    const desktopType = desktopIntegrationTypes?.data?.find((item) => item.id === id)
                    if (desktopType)
                      return <AppDetailPermissionChip key={id}>{desktopType.name}</AppDetailPermissionChip>
                  })}
                </div>
              )}
            </AppsDetailContentColPermissions>
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
          <Button onClick={videoModalClose} intent="default">
            Close
          </Button>
        </ButtonGroup>
      </VideoModal>
    </PageContainer>
  )
}
