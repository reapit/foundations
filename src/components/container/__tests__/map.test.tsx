import * as React from 'react'
import invalidValues from '@/constants/invalid-values'
import { MapContainer, filterInvalidMarker } from '../map'
import { shallow } from 'enzyme'

const { UNDEFINED_LATLNG_NUMBER } = invalidValues

describe('Map', () => {
  it('filter invalid marker correctly', () => {
    const input = [
      {
        lat: UNDEFINED_LATLNG_NUMBER,
        lng: UNDEFINED_LATLNG_NUMBER,
        title: 'not ok',
        content: 'not ok'
      },
      {
        lat: 0,
        lng: 0,
        title: 'ok',
        content: 'ok'
      }
    ]

    expect(filterInvalidMarker(input)).toEqual([
      {
        lat: 0,
        lng: 0,
        title: 'ok',
        content: 'ok'
      }
    ])
  })
  it('Should match snapshot', () => {
    expect(shallow(<MapContainer appointments={[]} />)).toMatchSnapshot()
  })
})
