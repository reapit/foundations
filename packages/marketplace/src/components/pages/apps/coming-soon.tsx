import * as React from 'react'
import { GridFourColItem, FadeIn } from '@reapit/elements-legacy'

import placeHolderImage from '@/assets/images/default-feature-image.jpg'
import comingSoonImageTwentyCiVMC from '@/assets/images/coming-soon/TwentyCiVMC.jpg'
import comingSoonSmsSpeedway from '@/assets/images/coming-soon/SMS2.jpg'
import comingSoonSmsSpeedWayIdVerification from '@/assets/images/coming-soon/SMSMobile.jpg'
import comingSoonPerfectPortal from '@/assets/images/coming-soon/PerfectPortal.jpg'
import comingSoonBarbuck from '@/assets/images/coming-soon/Barbuck.jpg'
import comingSoonFacebook from '@/assets/images/coming-soon/Facebook.jpg'
import comingSoonOffr from '@/assets/images/coming-soon/Offr.jpg'
import comingSoonLifeTimeLegal from '@/assets/images/coming-soon/lifetimelegal.jpg'
import comingSoonAgentPoint from '@/assets/images/coming-soon/AgentPoint.png'
import comingSoonCannellSigns from '@/assets/images/coming-soon/CannellSigns.png'
import { ComingSoonApp } from '@/types/global'
import {
  CategoryTitle,
  ComingSoonImage,
  ComingSoonImageWrap,
  ComingSoonInner,
  ComingSoonItem,
  ComingSoonTitle,
} from './__styles__'
import { CloudIcon } from '../../../assets/images/icons/cloud'
import { TriangleIcon } from '../../../assets/images/icons/triangle'
import { SquareIcon } from '../../../assets/images/icons/square'

export type ComingSoonAppsProps = {
  setComingSoonAppSectionHeight?: React.Dispatch<React.SetStateAction<number>>
}

export type ComingSoonAppProps = {
  app: ComingSoonApp
  isDesktop: boolean
}

export const onImageError = (event: React.SyntheticEvent<HTMLImageElement>) =>
  (event.currentTarget.src = placeHolderImage)

const comingSoonImagesMap = {
  comingSoonSmsSpeedway,
  comingSoonImageTwentyCiVMC,
  comingSoonSmsSpeedWayIdVerification,
  comingSoonPerfectPortal,
  comingSoonBarbuck,
  comingSoonFacebook,
  comingSoonOffr,
  comingSoonLifeTimeLegal,
  comingSoonAgentPoint,
  comingSoonCannellSigns,
}

export const getComingAppLinkHref = (isDesktop: boolean, email?: string) => {
  if (email) {
    const prefix = isDesktop ? 'agencycloud://process/email?address=' : 'mailto:'
    return `${prefix}${email}?subject=Reapit%20Foundations%20Marketplace%20-%20Coming%20Soon&body=Dear%20Reapit%20App%20Developer%2C%20%0A%0AI%20would%20like%20more%20information%20about%20your%20app%20featured%20in%20the%20%E2%80%98Coming%20Soon%E2%80%99%20section%20of%20the%20Reapit%20Marketplace%20%0A%0ARegards`
  }

  return null
}

export const ComingSoonAppComponent: React.FC<ComingSoonAppProps> = ({
  app: { email, image, integrationType },
  isDesktop,
}) => {
  const emailLink = getComingAppLinkHref(isDesktop, email)
  const ImageComponent = () => <img className="image" src={comingSoonImagesMap[image]} onError={onImageError} />
  const Icon = integrationType === 'AC' ? CloudIcon : integrationType === 'TP' ? TriangleIcon : SquareIcon
  const displayText =
    integrationType === 'AC'
      ? 'Agency Cloud App'
      : integrationType === 'TP'
      ? 'Third Party Integration'
      : 'Portal Integration'
  return (
    <GridFourColItem>
      <FadeIn>
        <ComingSoonItem>
          <ComingSoonTitle>In Development</ComingSoonTitle>
          <ComingSoonInner>
            <ComingSoonImageWrap>
              <ComingSoonImage>
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
              </ComingSoonImage>
            </ComingSoonImageWrap>
            <CategoryTitle>
              <Icon /> {displayText}
            </CategoryTitle>
          </ComingSoonInner>
        </ComingSoonItem>
      </FadeIn>
    </GridFourColItem>
  )
}
