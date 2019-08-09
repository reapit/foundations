import * as React from 'react'
import bulma from '@/styles/vendor/bulma'
import Slider, { Settings } from 'react-slick'
import carouselStyles from '../../styles/elements/carousel.scss?mod'
import ChevronLeftIcon from '@/components/svg/chevron-left'
import '@/styles/vendor/slick.scss'
import { AppDetailModel } from '@/types/marketplace-api-schema'

export interface AppDetailProps {
  data: AppDetailModel
}

const SlickButtonNav = ({ currentSlide, slideCount, children, ...props }) => <button {...props}>{children}</button>

export const AppDetail: React.FunctionComponent<AppDetailProps> = ({ data }) => {
  const { media = [], description, name, summary, developer, homePage, supportEmail } = data

  const icon = media.filter(({ type }) => type === 'icon')[0]
  const carouselImages = media.filter(({ type }) => type === 'image')

  const settings: Settings = {
    dots: false,
    speed: 500,
    variableWidth: true,
    prevArrow: (
      // @ts-ignore
      <SlickButtonNav>
        <ChevronLeftIcon />
      </SlickButtonNav>
    ),
    nextArrow: (
      // @ts-ignore
      <SlickButtonNav>
        <ChevronLeftIcon />
      </SlickButtonNav>
    )
  }

  return (
    <>
      <div className={bulma.media}>
        <div className={bulma.mediaLeft}>
          <figure className={bulma.image + ' ' + bulma.is128x128}>{icon && <img src={icon.uri} />}</figure>
        </div>
        <div className={bulma.mediaContent}>
          <div className={bulma.content}>
            <h3 className={bulma.is3} style={{ marginBottom: 0 }}>
              {name}
            </h3>
            <p>
              <small className={bulma.hasTextLink}>{developer}</small>
            </p>
            <p>{summary}</p>
          </div>
        </div>
      </div>
      {carouselImages.length > 0 && (
        <div className={carouselStyles.container}>
          <Slider {...settings}>
            {carouselImages.map(({ uri }, index) => (
              <div key={index} className={carouselStyles.slide}>
                <img src={uri} />
              </div>
            ))}
          </Slider>
        </div>
      )}
      <br />
      <p>{description}</p>
    </>
  )
}

export default AppDetail
