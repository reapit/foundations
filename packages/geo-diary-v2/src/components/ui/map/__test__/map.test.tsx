import React from 'react'
import { appointments } from '@/graphql/__mocks__/appointments'
import { shallow } from 'enzyme'
import AppointmentMap, { UNDEFINED_LATLNG_NUMBER, Coordinate, filterInvalidMarker } from '../map'

const locationMock = { search: '?state=CLIENT', pathname: '/test' }

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(() => locationMock),
}))

describe('map', () => {
  describe('AppointmentMap', () => {
    it('should match snapshot', () => {
      const mockProps = {
        appointments: appointments._embedded,
        destinationAddress: 'mock Address',
      }
      const wrapper = shallow(<AppointmentMap {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('filterInvalidMarker', () => {
    const markers = ([
      { position: { id: '123', lat: 0, lng: 0 } },
      { position: { id: '3245', lat: 0, lng: 0 } },
      {
        position: {
          id: '67876',
          lat: UNDEFINED_LATLNG_NUMBER,
          lng: UNDEFINED_LATLNG_NUMBER,
        },
      },
    ] as unknown) as Coordinate[]
    const expected = [{ position: { id: '123', lat: 0, lng: 0 } }, { position: { id: '3245', lat: 0, lng: 0 } }]
    const result = filterInvalidMarker(markers)
    expect(result).toEqual(expected)
  })
})
