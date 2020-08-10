import React, { useState, useEffect } from 'react'
import { useReapitConnect, ReapitConnectSession } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import getProjectorProperties from '../../../util/projector-properties'
import ProjectorProperty from './property'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'

type ProjectorProps = {
  config: any
}

const Projector: React.FC<ProjectorProps> = props => {
  const { config } = props
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  const [loading, setLoading] = useState(true)
  const [properties, setProperties]: any = useState([])

  useEffect(() => {
    const fetchProjectorProperties = async () => {
      setProperties(await getProjectorProperties(connectSession as ReapitConnectSession, config))
    }
    if (connectSession) {
      fetchProjectorProperties()
    }
  }, [connectSession])

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
