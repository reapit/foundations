import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { FadeIn } from '@reapit/elements'
import { Title, Subtitle, BodyText, elMb4, elMb6, SmallText, Button, elMx4 } from '@reapit/elements/v3'
import Routes from '@/constants/routes'
import DeveloperEditonModal from '@/components/ui/developer-edition-modal'
import {
  hasGreyText,
  ImageTextPair,
  TextWrap,
  VideoContainer,
  SubscribeContainer,
  SubscribeInnerContainer,
  SubscribeHeadingContainer,
  SubscribeButtonContainer,
  // SubscribeImageContainer,
  // SubscribeImageBars,
  // SubscribeImageDevices,
  // SubscribeImageFooter,
  subscribeContainerExpanded,
  subscribeContainerContracted,
  PriceSection,
  BannerCol,
  // subscribingContractedContainer,
  // imgFooterContracted,
  // imgBarsContracted,
  // imgDevicesContracted,
} from './__styles__/styles'
import { Grid, Col } from '../../../styles/grid'
import { cx } from 'linaria'
import crmImage from '../../../assets/images/desktop/crm-sandbox.svg'
import phoneImage from '../../../assets/images/desktop/marketplace-agency-cloud.svg'
import customerImage from '../../../assets/images/desktop/customer-interact-app.svg'
import videoImage from '../../../assets/images/desktop/video-placeholder.svg'
import windowsImage from '../../../assets/images/desktop/windows-badge.svg'
// import devEditionImgOne from '../../../assets/images/desktop/developer-edition/developer-edition-01.svg'
// import devEditionImgTwo from '../../../assets/images/desktop/developer-edition/developer-edition-02.svg'
// import devEditionImgThree from '../../../assets/images/desktop/developer-edition/developer-edition-03.svg'

export type SubscribingState = 'INITIAL' | 'SUBSCRIBE_NOW' | 'SUBSCRIBE' | 'CONFIRMING' | 'SAVING' | 'SUBSCRIBED'

export const handleSetSubscribingState = (
  setSubscribingState: Dispatch<SetStateAction<SubscribingState>>,
  subscribingState: SubscribingState,
) => () => setSubscribingState(subscribingState)

export const BannerSection: FC = () => (
  <FadeIn>
    <BodyText className={cx(elMb4, hasGreyText)}>
      Reapit&#39;s Agency Cloud is a desktop application that offers estate agencies a comprehensive range of market
      leading agency products, including a Sales CRM, Lettings CRM, Client Accounts, Property Management and real-time
      Analytics.
    </BodyText>
    <Grid className={elMb6}>
      <BannerCol>
        <ImageTextPair>
          <img src={crmImage} />
          <TextWrap>Become familiar with our CRM software using sandbox data</TextWrap>
        </ImageTextPair>
      </BannerCol>
      <BannerCol>
        <ImageTextPair>
          <img src={phoneImage} />
          <TextWrap>Test your Marketplace application inside Agency Cloud</TextWrap>
        </ImageTextPair>
      </BannerCol>
      <BannerCol>
        <ImageTextPair>
          <img src={customerImage} />
          <TextWrap>Understand how customers will interact with your application</TextWrap>
        </ImageTextPair>
      </BannerCol>
    </Grid>
  </FadeIn>
)

export const AboutSection: FC = () => (
  <FadeIn>
    <Subtitle>About Foundations Desktop API</Subtitle>
    <BodyText className={cx(elMb4, hasGreyText)}>
      Developers that would like to integrate with or extend the functionality of Agency Cloud can use the Foundations
      Desktop API to build web applications for Reapit&#39;s app Marketplace that trigger events in the Agency Cloud
      desktop application, as well as associating their apps with common actions in Agency Cloud to replace default
      behaviours and screens.
    </BodyText>
    <BodyText className={cx(elMb4, hasGreyText)}>
      For example, a developer building a Marketplace app that provides AML and ID checking, can use the Desktop API to
      associate their app with the default ID checking screen in Agency Cloud. When a customer clicks the default button
      to launch the ID check screen, the developer&#39;s associated app would be presented instead.
    </BodyText>
    <BodyText className={cx(elMb4, hasGreyText)}>
      To learn more about what’s possible with the Desktop API, please visit the{' '}
      <a target="_blank" rel="noreferrer" href={`${Routes.API_DOCS}/api/desktop-api`}>
        documentation.
      </a>
    </BodyText>
  </FadeIn>
)

export const VideoSection: FC = () => (
  <FadeIn>
    <Subtitle>How your app integrates with the Developer Edition of Agency Cloud</Subtitle>
    <VideoContainer>
      <img src={videoImage} />
      <SmallText className={cx(hasGreyText)}>
        The Developer Edition of Agency Cloud allows developers using the Desktop API to test their apps within the
        desktop application using sandbox data.
      </SmallText>
    </VideoContainer>
  </FadeIn>
)

export const SubscribeSection: FC = () => {
  const [subscribingState, setSubscribingState] = useState<SubscribingState>('INITIAL')
  const isInitial = subscribingState === 'INITIAL'
  return (
    <FadeIn>
      <SubscribeContainer>
        <SubscribeHeadingContainer>
          <Title>Developer Edition</Title>
        </SubscribeHeadingContainer>
        <Grid rowGap={0}>
          <Col span={12} spanTablet={6} spanMobile={12}>
            {subscribingState === 'INITIAL' && (
              <FadeIn>
                <ImageTextPair className={elMx4}>
                  <img src={windowsImage} />
                  <TextWrap className={hasGreyText}>
                    The application is licensed per user / developer of an organisation and requires a Windows machine
                    to install.
                  </TextWrap>
                </ImageTextPair>
              </FadeIn>
            )}
            <SubscribeInnerContainer
              className={cx(!isInitial ? subscribeContainerExpanded : subscribeContainerContracted)}
            >
              {subscribingState === 'INITIAL' ? (
                <PriceSection>
                  <h3>£300</h3>
                  <div>month</div>
                  <Button
                    onClick={handleSetSubscribingState(setSubscribingState, 'SUBSCRIBE_NOW')}
                    intent="critical"
                    chevronRight
                    fullWidth
                  >
                    Subscribe Now
                  </Button>
                </PriceSection>
              ) : (
                <FadeIn>
                  <BodyText className={cx(elMb4, hasGreyText)}>
                    The Developer Edition of Agency Cloud allows developers using the Desktop API to test their apps
                    within the desktop application using sandbox data.
                  </BodyText>
                  <BodyText className={cx(elMb4, hasGreyText)}>
                    From 1st April, the Developer Edition of Agency Cloud will no longer be a free subscription. If you
                    had subscribed during the Beta Phase and still wish to continue to use the software, please re
                    subscribe.
                  </BodyText>
                  <BodyText className={cx(elMb4, hasGreyText)}>
                    The application is licenced per user/developer of an organisation and will require a Windows machine
                    to install it.
                  </BodyText>
                  <SubscribeButtonContainer>
                    <Button
                      intent="secondary"
                      fullWidth
                      onClick={handleSetSubscribingState(setSubscribingState, 'INITIAL')}
                    >
                      Cancel
                    </Button>
                    <Button intent="critical" chevronRight fullWidth>
                      Subscribe
                    </Button>
                  </SubscribeButtonContainer>
                </FadeIn>
              )}
            </SubscribeInnerContainer>
          </Col>
          {/* <Col span={12} spanTablet={6} spanMobile={12}>
            <SubscribeImageContainer className={cx(subscribingState !== 'INITIAL' && subscribingContractedContainer)}>
              <SubscribeImageBars
                className={cx(subscribingState !== 'INITIAL' && imgBarsContracted)}
                src={devEditionImgOne}
              />
              <SubscribeImageDevices
                className={cx(subscribingState !== 'INITIAL' && imgDevicesContracted)}
                src={devEditionImgTwo}
              />
              <SubscribeImageFooter
                className={cx(subscribingState !== 'INITIAL' && imgFooterContracted)}
                src={devEditionImgThree}
              />
            </SubscribeImageContainer>
          </Col> */}
        </Grid>
      </SubscribeContainer>
      <DeveloperEditonModal visible={subscribingState === 'CONFIRMING'} setSubscribingState={setSubscribingState} />
    </FadeIn>
  )
}

export const DeveloperDesktopPage: FC = () => (
  <ErrorBoundary>
    <Title>Desktop</Title>
    <Grid>
      <Col span={8} spanTablet={12} spanMobile={12}>
        <BannerSection />
        <Grid>
          <Col span={6} spanTablet={6} spanMobile={12}>
            <AboutSection />
          </Col>
          <Col span={6} spanTablet={6} spanMobile={12}>
            <VideoSection />
          </Col>
        </Grid>
      </Col>
      <Col span={4} spanTablet={12} spanMobile={12}>
        <SubscribeSection />
      </Col>
    </Grid>
  </ErrorBoundary>
)

export default DeveloperDesktopPage
