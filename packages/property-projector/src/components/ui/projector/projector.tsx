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
  const [userError, setUserError]: any = useState(false)

  useEffect(() => {
    const fetchProjectorProperties = async () => {
      try {
        setProperties(await getProjectorProperties(connectSession as ReapitConnectSession, config))
        setLoading(false)
      } catch (error) {
        console.error(error)
        if (error.message === 'NO_PROPERTIES_FOUND') {
          setUserError('No properties found with given criteria.')
        }
      }
    }
    if (connectSession) {
      fetchProjectorProperties()
    }
  }, [connectSession])

  if (loading) {
    return (
      <div className="projector-loading" style={{ backgroundColor: config.primaryColour }}>
        {userError === false ? 'loading...' : `${userError} Press 'ESC' to close.`}
      </div>
    )
  }

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
        stopOnHover={false}
      >
        {properties.map(property => (
          <ProjectorProperty config={config} property={property} />
        ))}
      </Carousel>
    </div>
  )
}

export default Projector
