import React, { useState, useEffect } from 'react'
import { useReapitConnect, ReapitConnectSession } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import getProjectorProperties from '@/util/projector-properties'
import ProjectorProperty from './property'
import { PropertyProjectorConfig } from '@/types/global'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'

export type ProjectorProps = {
  config: PropertyProjectorConfig
}

const Projector: React.FC<ProjectorProps> = props => {
  const { config } = props
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  const [loading, setLoading] = useState<boolean>(true)
  const [properties, setProperties]: any = useState([])
  const [userError, setUserError] = useState<string>('')
  const [hideToolTipMessage, setHideToolTipMessage] = useState<boolean>(false)

  useEffect(() => {
    const fetchProjectorProperties = async () => {
      try {
        setProperties(await getProjectorProperties(connectSession as ReapitConnectSession, config))
        setLoading(false)
      } catch (error) {
        console.error(error)
        switch (error.message) {
          case 'NO_PROPERTIES_FOUND':
            setUserError('No properties found with given criteria.')
            break
          case 'NO_PROPERTIES_WITH_IMAGES_FOUND':
            setUserError('The properties returned do not have any images.')
            break
          default:
            setUserError('Something went wrong, please try again.')
            break
        }
      }
    }

    if (connectSession) {
      fetchProjectorProperties()
      setTimeout(() => setHideToolTipMessage(true), 5000)
    }
  }, [connectSession])

  const getInterval = () => {
    if (config.interval === 0) {
      return 5000
    }
    return config.interval * 1000
  }

  if (loading) {
    return (
      <div className="projector-loading" style={{ backgroundColor: config.primaryColour }}>
        {userError === '' ? 'loading...' : `${userError} Press 'ESC' to close.`}
      </div>
    )
  }

  const projectorStyles: React.CSSProperties = {
    backgroundColor: config.primaryColour,
    borderColor: config.secondaryColour,
  }
  return (
    <div className="projector-modal">
      <header style={projectorStyles}>
        <img src={config.logo} />
      </header>
      <Carousel
        showArrows={false}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        autoPlay={true}
        infiniteLoop={true}
        interval={getInterval()}
        stopOnHover={false}
      >
        {properties.map((property, idx) => (
          <ProjectorProperty key={idx} config={config} property={property} />
        ))}
      </Carousel>
      <div className={hideToolTipMessage ? 'carousel-tooltip fade-out' : 'carousel-tooltip'}>
        To close the Projector, press the 'ESC' key on your keyboard.
      </div>
    </div>
  )
}

export default Projector
