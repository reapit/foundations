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
  ButtonGroup,
  Button,
} from '@reapit/elements'
import { useHistory, useParams } from 'react-router-dom'
import { AcProcessType, DesktopLink, HTMLRender, useReapitGet } from '@reapit/utils-react'
import {
  AppDetailModel,
  DesktopIntegrationTypeModelPagedResult,
  DeveloperModel,
  InstallationModelPagedResult,
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
  AppDetailCategoryChip,
  htmlRender,
} from './__styles__'
import { Carousel } from '../carousel'
import { IsFreeNotice } from '../apps-browse/__styles__'
import { useModal } from '@reapit/elements'
import { AppInstallModalContent } from './app-install-modal'
import { AppInstallSuccesModalContent } from './app-install-success-modal'
import { useReapitConnect } from '@reapit/connect-session'
import { selectIsAdmin } from '../../utils/auth'

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
  const { Modal: AppInstallModal, openModal: appInstallOpenModal, closeModal: appInstallCloseModal } = useModal()
  const { Modal: InstallSuccessModal, openModal: successOpenModal, closeModal: successCloseModal } = useModal()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const clientId = connectSession?.loginIdentity.clientId
  const developerId = connectSession?.loginIdentity.developerId

  const baseParams = {
    clientId,
    appId,
    onlyInstalled: true,
  }

  const queryParams = developerId ? { ...baseParams, developerId } : baseParams

  const [installations] = useReapitGet<InstallationModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getInstallations],
    queryParams,
    fetchWhenTrue: [clientId, appId],
  })

  const [appDetail, appDetailLoading, , refetchApp] = useReapitGet<AppDetailModel>({
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
  const isInstalled = Boolean(installations?.totalCount)
  const isAdmin = selectIsAdmin(connectSession)

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
                {isInstalled && (
                  <>
                    <Icon icon="tickSolidSystem" className={elMr5} intent="success" />
                    <SmallText className={elMr5} hasNoMargin>
                      {isDirectApi ? 'Integration Enabled' : 'App Installed'}
                    </SmallText>
                  </>
                )}
                <Icon icon="tickSolidSystem" className={elMr5} intent="success" />
                <SmallText className={elMr5} hasNoMargin>
                  Verified by Reapit
                </SmallText>
                {category?.name && <AppDetailCategoryChip className={elFadeIn}>{category.name}</AppDetailCategoryChip>}
                {isDirectApi && (
                  <SmallText className={elMr5} hasBoldText hasNoMargin>
                    Integration
                  </SmallText>
                )}
                {isFree && <IsFreeNotice>FREE</IsFreeNotice>}
              </FlexContainer>
            </FlexContainer>
          </FlexContainer>
          <ButtonGroup className={elMb11} alignment="left">
            {!isInstalled && isAdmin && (
              <Button intent="critical" onClick={appInstallOpenModal}>
                {isDirectApi ? 'Enable Integration' : 'Install App'}
              </Button>
            )}
            {supportEmail && (
              <DesktopLink
                uri={supportEmail}
                acProcess={AcProcessType.mail}
                target="_blank"
                content={
                  <Button intent="low">{isDirectApi ? 'Enquire About Integration' : 'Enquire About App'}</Button>
                }
              />
            )}
          </ButtonGroup>
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
                  <DesktopLink uri={homePage} acProcess={AcProcessType.web} target="_blank" content={homePage} />
                </BodyText>
              </Col>
            )}
            {supportEmail && (
              <Col>
                <Subtitle hasNoMargin>Support Email</Subtitle>
                <BodyText hasGreyText hasNoMargin>
                  <DesktopLink
                    uri={supportEmail}
                    acProcess={AcProcessType.mail}
                    target="_blank"
                    content={supportEmail}
                  />
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
                <Subtitle hasNoMargin>Terms and Conditions</Subtitle>
                <BodyText hasGreyText hasNoMargin>
                  <DesktopLink
                    uri={termsAndConditionsUrl}
                    acProcess={AcProcessType.web}
                    target="_blank"
                    content={termsAndConditionsUrl}
                  />
                </BodyText>
              </Col>
            )}
            {privacyPolicyUrl && (
              <Col>
                <Subtitle hasNoMargin>Privacy Policy</Subtitle>
                <BodyText hasGreyText hasNoMargin>
                  <DesktopLink
                    uri={privacyPolicyUrl}
                    acProcess={AcProcessType.web}
                    target="_blank"
                    content={privacyPolicyUrl}
                  />
                </BodyText>
              </Col>
            )}
            <Col>
              <Subtitle hasNoMargin>Pricing Policy</Subtitle>
              <BodyText hasGreyText hasNoMargin>
                {!isFree && pricingUrl ? (
                  <DesktopLink uri={pricingUrl} acProcess={AcProcessType.web} target="_blank" content={pricingUrl} />
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
    </PageContainer>
  )
}
