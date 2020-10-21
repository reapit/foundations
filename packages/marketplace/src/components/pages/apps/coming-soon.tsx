import * as React from 'react'
import useResizeObserver from '@react-hook/resize-observer'
import { GridThreeColItem, Grid, H3 } from '@reapit/elements'

import placeHolderImage from '@/assets/images/default-feature-image.jpg'
import comingSoonImageZoopla from '@/assets/images/coming-soon/Zoopla.jpg'
import comingSoonImageYourkeys from '@/assets/images/coming-soon/1Yourkeys.jpg'
import comingSoonImageStarberry from '@/assets/images/coming-soon/2Starberry.jpg'
import comingSoonImageVyomm from '@/assets/images/coming-soon/5Vyomm.jpg'
import comingSoonImageSpectre from '@/assets/images/coming-soon/6Spectre.jpg'
import comingSoonImageTwentyCiVMC from '@/assets/images/coming-soon/TwentyCiVMC.jpg'
import comingSoonImageTwentyci from '@/assets/images/coming-soon/TwentyCiProspect.jpg'
import comingSoonImageZero from '@/assets/images/coming-soon/8Zero.jpg'
import comingSoonImageYomdel from '@/assets/images/coming-soon/9Yomdel.jpg'
import comingSoonImageIntegrated from '@/assets/images/coming-soon/12Integrated.jpg'
import comingSoonSmsSpeedway from '@/assets/images/coming-soon/SMS2.jpg'
import comingSoonSmsSpeedWayIdVerification from '@/assets/images/coming-soon/SMSMobile.jpg'
import comingSoonIAMProperty from '@/assets/images/coming-soon/3IAMProperty.jpg'
import comingSoonReapitPayments from '@/assets/images/coming-soon/ReapitPayments.jpg'
import comingSoonImageMAB from '@/assets/images/coming-soon/MAB.jpg'
import comingSoonMovingHub from '@/assets/images/coming-soon/MovingHub.jpg'
import comingSoonOnTheMarket from '@/assets/images/coming-soon/OnTheMarket.jpg'
import comingSoonPerfectPortal from '@/assets/images/coming-soon/PerfectPortal.jpg'
import comingSoonRightMove from '@/assets/images/coming-soon/RightMove.jpg'

import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { ComingSoonApp } from '@/types/global'

export type ComingSoonAppsProps = {
  setComingSoonAppSectionHeight?: React.Dispatch<React.SetStateAction<number>>
}

export type ComingSoonAppProps = { app: ComingSoonApp; isDesktop: boolean }

export const onImageError = (event: React.SyntheticEvent<HTMLImageElement>) =>
  (event.currentTarget.src = placeHolderImage)

const comingSoonImagesMap = {
  comingSoonImageZoopla,
  comingSoonImageYourkeys,
  comingSoonImageVyomm,
  comingSoonImageStarberry,
  comingSoonImageYomdel,
  comingSoonImageIntegrated,
  comingSoonImageTwentyci,
  comingSoonImageZero,
  comingSoonImageSpectre,
  comingSoonSmsSpeedway,
  comingSoonImageTwentyCiVMC,
  comingSoonSmsSpeedWayIdVerification,
  comingSoonIAMProperty,
  comingSoonReapitPayments,
  comingSoonImageMAB,
  comingSoonMovingHub,
  comingSoonOnTheMarket,
  comingSoonPerfectPortal,
  comingSoonRightMove,
}

export const getComingAppLinkHref = (isDesktop: boolean, email?: string) => {
  if (email) {
    const prefix = isDesktop ? 'agencycloud://process/email?address=' : 'mailto:'
    return `${prefix}${email}?subject=Reapit%20Foundations%20Marketplace%20-%20Coming%20Soon&body=Dear%20Reapit%20App%20Developer%2C%20%0A%0AI%20would%20like%20more%20information%20about%20your%20app%20featured%20in%20the%20%E2%80%98Coming%20Soon%E2%80%99%20section%20of%20the%20Reapit%20Marketplace%20%0A%0ARegards`
  }

  return null
}

export const handleComingSoonSectionResizeObserver = (
  setComingSoonAppSectionHeight: React.Dispatch<React.SetStateAction<number>> | undefined,
) => {
  return (entry: ResizeObserverEntry) => {
    if (!setComingSoonAppSectionHeight) {
      return
    }
    const elementHeight = entry.contentRect.height
    setComingSoonAppSectionHeight(elementHeight)
  }
}

export const ComingSoonAppComponent: React.FC<ComingSoonAppProps> = ({ app: { email, image }, isDesktop }) => {
  const emailLink = getComingAppLinkHref(isDesktop, email)
  const ImageComponent = () => <img className="image" src={comingSoonImagesMap[image]} onError={onImageError} />
  return (
    <GridThreeColItem key={email}>
      <div className="card border-0">
        <div className="card-image">
          {isDesktop && emailLink ? (
            <a href={emailLink}>
              <ImageComponent />
            </a>
          ) : emailLink ? (
            <a href={emailLink} target="_blank" rel="noopener noreferrer">
              <ImageComponent />
            </a>
          ) : (
            <ImageComponent />
          )}
        </div>
      </div>
    </GridThreeColItem>
  )
}

const ComingSoonApps: React.FC<ComingSoonAppsProps> = ({ setComingSoonAppSectionHeight }) => {
  const comingSoonAppSectionRef = React.useRef<HTMLDivElement>(null)
  const { connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)

  useResizeObserver(comingSoonAppSectionRef, handleComingSoonSectionResizeObserver(setComingSoonAppSectionHeight))

  return (
    <div id="coming-soon-section" ref={comingSoonAppSectionRef}>
      <H3 isHeadingSection>Agency Cloud Apps</H3>
      <Grid isMultiLine>
        {(window.reapit.config.comingSoonApps.agencyCloud || []).map(app => (
          <ComingSoonAppComponent key={app.image} app={app} isDesktop={connectIsDesktop} />
        ))}
      </Grid>
      <div className="bb mb-4" />
      <H3 isHeadingSection>Third Party Integrations</H3>
      <Grid isMultiLine>
        {(window.reapit.config.comingSoonApps.thirdParty || []).map(app => (
          <ComingSoonAppComponent key={app.image} app={app} isDesktop={connectIsDesktop} />
        ))}
      </Grid>
      <div className="bb mb-4" />
      <H3 isHeadingSection>Portal Integrations</H3>
      <Grid isMultiLine>
        {(window.reapit.config.comingSoonApps.portals || []).map(app => (
          <ComingSoonAppComponent key={app.image} app={app} isDesktop={connectIsDesktop} />
        ))}
      </Grid>
    </div>
  )
}

export default React.memo(ComingSoonApps)
