import React from 'react'
import { storiesOf } from '@storybook/react'
import { Map } from './index'

const MAP_API_KEY = process.env.MAP_API_KEY || ''

const Component = ({ marker }) => {
  return (
    <div>
      <h1>{marker.title}</h1>
      <div
        onClick={() => {
          alert(marker.content)
        }}
      >
        {marker.content}
      </div>
    </div>
  )
}

const onLoadedDirection = response => {
  console.log(response)
}

const onLoaded = response => {
  console.log(response)
}

storiesOf('Map', module)
  .add('with route direction from current location', () => {
    return (
      <Map
        apiKey={MAP_API_KEY}
        markers={[
          { lat: 10.806203, lng: 106.666807, title: 'mockTitle 1', content: 'mockContent 1' },
          { lat: 10.814087, lng: 106.665145, title: 'mockTitle 2', content: 'mockContent 2' }
        ]}
        destinationPoint={{ lat: 10.815204, lng: 106.662956 }}
        travelMode="DRIVING"
        defaultCenter={{ lat: 10.806203, lng: 106.666807 }}
        defaultZoom={16}
        autoFitBounds={true}
        component={Component}
        onLoadedDirection={onLoadedDirection}
        onLoaded={onLoaded}
      />
    )
  })
  .add('with no defaultCenter', () => {
    return (
      <Map
        apiKey={MAP_API_KEY}
        markers={[
          { lat: 10.806203, lng: 106.666807, title: 'mockTitle 1', content: 'mockContent 1' },
          { lat: 10.814087, lng: 106.665145, title: 'mockTitle 2', content: 'mockContent 2' }
        ]}
        autoFitBounds={false}
        travelMode="DRIVING"
        defaultZoom={16}
        component={Component}
        onLoadedDirection={onLoadedDirection}
        onLoaded={onLoaded}
      />
    )
  })
