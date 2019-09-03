import React from 'react'
import { storiesOf } from '@storybook/react'
import { Map } from './index'

storiesOf('Map', module).add('Map', () => {
  const MY_API_KEY = 'APIKEY'
  return (
    <Map
      apiKey={MY_API_KEY}
      markers={[
        { lat: 10.806203, lng: 106.666807, title: 'mockTitle', content: 'mockContent' },
        { lat: 10.814087, lng: 106.665145, title: 'mockTitle', content: 'mockContent' }
      ]}
      defaultCenter={{ lat: 10.806203, lng: 106.666807 }}
      defaultZoom={16}
    />
  )
})
