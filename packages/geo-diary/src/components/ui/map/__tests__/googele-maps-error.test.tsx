import React from 'react'
import { shallow } from 'enzyme'
import { GoogleMapsError } from '../google-maps-error'

describe('GoogleMapsError', () => {
  it('should match snapshot', () => {
    expect(shallow(<GoogleMapsError />)).toMatchSnapshot()
  })
})
