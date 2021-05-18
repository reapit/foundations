import * as React from 'react'
import { GridFourColItem, FadeIn } from '@reapit/elements'

import placeHolderImage from '@/assets/images/default-feature-image.jpg'
import comingSoonImageZoopla from '@/assets/images/coming-soon/Zoopla.jpg'
import comingSoonImageYourkeys from '@/assets/images/coming-soon/1Yourkeys.jpg'
import comingSoonImageSpectre from '@/assets/images/coming-soon/6Spectre.jpg'
import comingSoonImageTwentyCiVMC from '@/assets/images/coming-soon/TwentyCiVMC.jpg'
import comingSoonImageTwentyci from '@/assets/images/coming-soon/TwentyCiProspect.jpg'
import comingSoonImageZero from '@/assets/images/coming-soon/8Zero.jpg'
import comingSoonImageIntegrated from '@/assets/images/coming-soon/12Integrated.jpg'
import comingSoonSmsSpeedway from '@/assets/images/coming-soon/SMS2.jpg'
import comingSoonSmsSpeedWayIdVerification from '@/assets/images/coming-soon/SMSMobile.jpg'
import comingSoonOnTheMarket from '@/assets/images/coming-soon/OnTheMarket.jpg'
import comingSoonPerfectPortal from '@/assets/images/coming-soon/PerfectPortal.jpg'
import comingSoonRightMove from '@/assets/images/coming-soon/RightMove.jpg'
import comingSoonDataWarehouse from '@/assets/images/coming-soon/DataWarehouse.jpg'
import comingSoonNotify from '@/assets/images/coming-soon/Notify.jpg'
import comingSoonSignatureSense from '@/assets/images/coming-soon/Signature.jpg'
import comingSoonFCCParagon from '@/assets/images/coming-soon/FCCParagon.jpg'
import comingSoonPropoly from '@/assets/images/coming-soon/Propoly.jpg'
import comingSoonHomeHero from '@/assets/images/coming-soon/Homehero.jpg'
import comingSoonBarbuck from '@/assets/images/coming-soon/Barbuck.jpg'
import comingSoonCoadjute from '@/assets/images/coming-soon/Coadjute.jpg'
import comingSoonSMSWorks from '@/assets/images/coming-soon/SMSWorks.jpg'
import comingSoonFacebook from '@/assets/images/coming-soon/Facebook.jpg'
import comingSoonOffr from '@/assets/images/coming-soon/Offr.jpg'
import comingSoonAddland from '@/assets/images/coming-soon/Addland.jpg'
import comingSoonBYM from '@/assets/images/coming-soon/BYM.jpg'
import comingSoonApex from '@/assets/images/coming-soon/Apex.jpg'
import comingSoonBricksAndAgent from '@/assets/images/coming-soon/BricksandAgent.jpg'
import comingSoonCommVersion from '@/assets/images/coming-soon/CommVersion.jpg'
import comingSoonDocuSign from '@/assets/images/coming-soon/Docusign.jpg'
import comingSoonJustMoveIn from '@/assets/images/coming-soon/Justmovein.jpg'
import comingSoonLifeTimeLegal from '@/assets/images/coming-soon/lifetimelegal.jpg'
import comingSoonRealMedia from '@/assets/images/coming-soon/RealMediaGroup.jpg'
import comingSoonRentProfile from '@/assets/images/coming-soon/Rentprofile.jpg'
import comingSoonTheBunch from '@/assets/images/coming-soon/TheBunch.jpg'
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
  comingSoonImageZoopla,
  comingSoonImageYourkeys,
  comingSoonImageIntegrated,
  comingSoonImageTwentyci,
  comingSoonImageZero,
  comingSoonImageSpectre,
  comingSoonSmsSpeedway,
  comingSoonImageTwentyCiVMC,
  comingSoonSmsSpeedWayIdVerification,
  comingSoonOnTheMarket,
  comingSoonPerfectPortal,
  comingSoonRightMove,
  comingSoonDataWarehouse,
  comingSoonNotify,
  comingSoonSignatureSense,
  comingSoonFCCParagon,
  comingSoonPropoly,
  comingSoonHomeHero,
  comingSoonBarbuck,
  comingSoonCoadjute,
  comingSoonSMSWorks,
  comingSoonFacebook,
  comingSoonOffr,
  comingSoonAddland,
  comingSoonBYM,
  comingSoonApex,
  comingSoonBricksAndAgent,
  comingSoonCommVersion,
  comingSoonDocuSign,
  comingSoonJustMoveIn,
  comingSoonLifeTimeLegal,
  comingSoonRealMedia,
  comingSoonRentProfile,
  comingSoonTheBunch,
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
          <ComingSoonTitle>Coming soon</ComingSoonTitle>
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
