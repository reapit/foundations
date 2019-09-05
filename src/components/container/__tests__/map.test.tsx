import * as React from 'react'
import invalidValues from '@/constants/invalid-values'
import { MapContainer, filterInvalidMarker } from '../map'
import { shallow } from 'enzyme'

const { UNDEFINED_LATLNG_NUMBER, UNDEFINED_NULL_STRING } = invalidValues

describe('Map', () => {
  it('filter invalid marker correctly', () => {
    const input = [
      {
        lat: UNDEFINED_LATLNG_NUMBER,
        lng: UNDEFINED_LATLNG_NUMBER,
        id: UNDEFINED_NULL_STRING,
        address1: 'not ok',
        address2: 'not ok'
      },
      {
        lat: 0,
        lng: 0,
        id: '0',
        address1: 'ok',
        address2: 'ok'
      }
    ]

    expect(filterInvalidMarker(input)).toEqual([
      {
        lat: 0,
        lng: 0,
        id: '0',
        address1: 'ok',
        address2: 'ok'
      }
    ])
  })
})

describe('Map', () => {
  it('Should match snapshot', () => {
    expect(shallow(<MapContainer appointments={[]} />)).toMatchSnapshot()
  })
})
