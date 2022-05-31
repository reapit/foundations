import React from 'react'
import { render } from '../../../../tests/react-testing'
import { GoogleMapsError } from '../google-maps-error'

describe('GoogleMapsError', () => {
  it('should match snapshot', () => {
    expect(render(<GoogleMapsError />)).toMatchSnapshot()
  })
})
