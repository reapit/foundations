import React from 'react'
import Slider from 'react-slick'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import FeaturedApp from '../../ui/featured-app'
import { SlickWrapper } from './__styles__/slick'
import { Section } from '@reapit/elements'

export interface FeaturedAppsProps {
  apps: AppSummaryModel[]
}

export const FeaturedApps: React.FC<FeaturedAppsProps> = ({ apps }) => {
  while (apps.length < 5) {
    apps.push({})
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    className: 'center',
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1215,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }
  return (
    <Section>
      <SlickWrapper>
        <Slider {...settings}>
          {apps.map((app, index) => {
            return <FeaturedApp key={app.id || index} app={app} />
          })}
        </Slider>
      </SlickWrapper>
    </Section>
  )
}
