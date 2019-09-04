import React from 'react'
import { storiesOf } from '@storybook/react'
import { Map } from './index'

const MY_API_KEY = 'GMAPS_API_KEY'

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

storiesOf('Map', module)
  .add('with defaultCenter and defaultZoom', () => {
    return (
      <Map
        apiKey={MY_API_KEY}
        markers={[
          { lat: 10.806203, lng: 106.666807, title: 'mockTitle 1', content: 'mockContent 1' },
          { lat: 10.814087, lng: 106.665145, title: 'mockTitle 2', content: 'mockContent 2' }
        ]}
        defaultCenter={{ lat: 10.806203, lng: 106.666807 }}
        defaultZoom={16}
        component={Component}
      />
    )
  })
  .add('with no defaultCenter and defaultZoom', () => {
    return (
      <Map
        apiKey={MY_API_KEY}
        markers={[
          { lat: 10.806203, lng: 106.666807, title: 'mockTitle 1', content: 'mockContent 1' },
          { lat: 10.814087, lng: 106.665145, title: 'mockTitle 2', content: 'mockContent 2' }
        ]}
        component={Component}
      />
    )
  })
