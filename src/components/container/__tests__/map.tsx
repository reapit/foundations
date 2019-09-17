import * as React from 'react'
import { MapContainer, mapStateToProps, filterInvalidMarker } from '../map'
import invalidValues from '@/constants/invalid-values'
import { shallow } from 'enzyme'
import { appointmentsDataStub } from '@/sagas/__stubs__/appointments'
import { appointmentDataStub } from '@/sagas/__stubs__/appointment'
import { TravelMode } from '../../ui/travel-mode'

describe('Map', () => {
  it('Should match snapshot', () => {
    const mockProps = {
      appointments: appointmentsDataStub.data.data,
      destinationLatLng: { lat: 0, lng: 0 },
      travelMode: 'WALKING' as TravelMode
    }
    const wrapper = shallow(<MapContainer {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('Should match snapshot', () => {
    const mockProps = {
      appointments: undefined,
      destinationLatLng: { lat: 0, lng: 0 },
      travelMode: 'WALKING' as TravelMode
    }
    const wrapper = shallow(<MapContainer {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('mapStateToProps', () => {
    it('should run correctly', () => {
      const mockState = {
        appointments: {
          appointments: appointmentsDataStub
        },
        direction: {
          destination: appointmentDataStub
        }
      } as any
      const result = mapStateToProps(mockState)
      const expected = {
        appointments: appointmentsDataStub.data.data,
        destinationLatLng: {
          lat: 52.1284,
          lng: -0.507145
        }
      }
      expect(result).toEqual(expected)
    })
    it('should run correctly', () => {
      const mockState = {
        appointments: null,
        direction: null
      } as any
      const result = mapStateToProps(mockState)
      const expected = {
        appointments: [],
        destinationLatLng: {
          lat: undefined,
          lng: undefined
        }
      }
      expect(result).toEqual(expected)
    })
  })
  describe('filterInvalidMarker', () => {
    const markers = [
      { id: '123', lat: 0, lng: 0 },
      { id: '3245', lat: 0, lng: 0 },
      { id: '67876', lat: invalidValues.UNDEFINED_LATLNG_NUMBER, lng: invalidValues.UNDEFINED_LATLNG_NUMBER }
    ]
    const expected = [{ id: '123', lat: 0, lng: 0 }, { id: '3245', lat: 0, lng: 0 }]
    const result = filterInvalidMarker(markers)
    expect(result).toEqual(expected)
  })
})
