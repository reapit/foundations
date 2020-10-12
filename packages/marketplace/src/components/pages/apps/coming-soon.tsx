import * as React from 'react'
import useResizeObserver from '@react-hook/resize-observer'
import { GridThreeColItem, Grid } from '@reapit/elements'

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
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'

export type ComingSoonAppsProps = {
  setComingSoonAppSectionHeight?: React.Dispatch<React.SetStateAction<number>>
}

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
}

export const emptyComingSoonAppLinkHref = 'javascript:;'

export const getComingAppLinkHref = (isDesktop: boolean, email?: string) => {
  if (email) {
    const prefix = isDesktop ? 'agencycloud://process/email?address=' : 'mailto:'
    return `${prefix}${email}?subject=Reapit%20Foundations%20Marketplace%20-%20Coming%20Soon&body=Dear%20Reapit%20App%20Developer%2C%20%0A%0AI%20would%20like%20more%20information%20about%20your%20app%20featured%20in%20the%20%E2%80%98Coming%20Soon%E2%80%99%20section%20of%20the%20Reapit%20Marketplace%20%0A%0ARegards`
  }

  return emptyComingSoonAppLinkHref
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

const ComingSoonApps: React.FC<ComingSoonAppsProps> = ({ setComingSoonAppSectionHeight }) => {
  const comingSoonAppSectionRef = React.useRef<HTMLDivElement>(null)
  const { connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)

  useResizeObserver(comingSoonAppSectionRef, handleComingSoonSectionResizeObserver(setComingSoonAppSectionHeight))

  return (
    <div id="coming-soon-section" ref={comingSoonAppSectionRef}>
      <Grid isMultiLine>
        {(window.reapit.config.comingSoonApps || []).map(({ email, image }) => (
          <GridThreeColItem key={email}>
            <div className="card border-0">
              <div className="card-image">
                {connectIsDesktop ? (
                  <a href={getComingAppLinkHref(connectIsDesktop, email)}>
                    <img className="image" src={comingSoonImagesMap[image]} onError={onImageError} />
                  </a>
                ) : (
                  <a href={getComingAppLinkHref(connectIsDesktop, email)} target="_blank" rel="noopener noreferrer">
                    <img className="image" src={comingSoonImagesMap[image]} onError={onImageError} />
                  </a>
                )}
              </div>
            </div>
          </GridThreeColItem>
        ))}
      </Grid>
    </div>
  )
}

export default ComingSoonApps
