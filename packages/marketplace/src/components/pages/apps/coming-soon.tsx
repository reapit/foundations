import * as React from 'react'
import { GridThreeColItem, Grid } from '@reapit/elements'

import placeHolderImage from '@/assets/images/default-feature-image.jpg'

import comingSoonImageYourkeys from '@/assets/images/coming-soon/1Yourkeys.jpg'

import comingSoonImageStarberry from '@/assets/images/coming-soon/2Starberry.jpg'

import comingSoonImageVyomm from '@/assets/images/coming-soon/5Vyomm.jpg'
import comingSoonImageSpectre from '@/assets/images/coming-soon/6Spectre.jpg'

import comingSoonImageTwentyci from '@/assets/images/coming-soon/7Twentyci.jpg'

import comingSoonImageZero from '@/assets/images/coming-soon/8Zero.jpg'

import comingSoonImageYomdel from '@/assets/images/coming-soon/9Yomdel.jpg'
import comingSoonImageIntegrated from '@/assets/images/coming-soon/12Integrated.jpg'
import comingSoonSmsSpeedway from '@/assets/images/coming-soon/SMS2.jpg'

export type ComingSoonAppsProps = {
  setComingSoonAppSectionHeight?: React.Dispatch<React.SetStateAction<number>>
}

export const onImageError = (event: React.SyntheticEvent<HTMLImageElement>) =>
  (event.currentTarget.src = placeHolderImage)

const comingSoonImagesMap = {
  comingSoonImageYourkeys,
  comingSoonImageVyomm,
  comingSoonImageStarberry,
  comingSoonImageYomdel,
  comingSoonImageIntegrated,
  comingSoonImageTwentyci,
  comingSoonImageZero,
  comingSoonImageSpectre,
  comingSoonSmsSpeedway,
}

export const emptyComingSoonAppLinkHref = 'javascript:;'

export const getComingAppLinkHref = (email?: string) => {
  if (email) {
    return `mailto:${email}?subject=Reapit%20Foundations%20Marketplace%20-%20Coming%20Soon&body=Dear%20Reapit%20App%20Developer%2C%20%0A%0AI%20would%20like%20more%20information%20about%20your%20app%20featured%20in%20the%20%E2%80%98Coming%20Soon%E2%80%99%20section%20of%20the%20Reapit%20Marketplace%20%0A%0ARegards`
  }

  return emptyComingSoonAppLinkHref
}

const ComingSoonApps: React.FC<ComingSoonAppsProps> = ({ setComingSoonAppSectionHeight }) => {
  const comingSoonAppSectionRef = React.useRef<HTMLDivElement>(null)

  React.useLayoutEffect(() => {
    const offsetHeight = document.getElementById('coming-soon-section')?.offsetHeight
    console.log('offsetHeight', offsetHeight)

    if (offsetHeight && setComingSoonAppSectionHeight) {
      setComingSoonAppSectionHeight(offsetHeight)
    }

    console.log(
      '---- coming soon boundingClientRect ----',
      document.getElementById('coming-soon-section')?.getBoundingClientRect(),
    )
  })

  return (
    <div id="coming-soon-section" ref={comingSoonAppSectionRef} style={{ minHeight: '100%' }}>
      <Grid isMultiLine>
        {(window.reapit.config.comingSoonApps || []).map(({ email, image }) => (
          <GridThreeColItem key={email}>
            <div className="card">
              <div className="card-image">
                <a href={getComingAppLinkHref(email)}>
                  <img className="image" src={comingSoonImagesMap[image]} onError={onImageError} />
                </a>
              </div>
            </div>
          </GridThreeColItem>
        ))}
      </Grid>
    </div>
  )
}

export default ComingSoonApps
