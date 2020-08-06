import React from 'react'
import ProjectorProperty from './property'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'

type ProjectorProps = {
  config: any
}

const Projector: React.FC<ProjectorProps> = props => {
  return (
    <div className="projector-modal">
      <Carousel
        showArrows={false}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        autoPlay={true}
        infiniteLoop={true}
        interval={5000}
      >
        <ProjectorProperty />
        <ProjectorProperty />
      </Carousel>
    </div>
  )
}

export default Projector
