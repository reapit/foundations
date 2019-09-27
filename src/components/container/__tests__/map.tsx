import * as React from 'react'
import { MapContainer, mapStateToProps, filterInvalidMarker, mapDispatchToProps, Coordinate } from '../map'
import invalidValues from '@/constants/invalid-values'
import { shallow } from 'enzyme'
import { appointmentsDataStub } from '@/sagas/__stubs__/appointments'
import { appointmentDataStub } from '@/sagas/__stubs__/appointment'
import { TravelMode } from '../../ui/travel-mode'
import { oc } from 'ts-optchain'

describe('Map', () => {
  it('Should match snapshot', () => {
    const mockProps = {
      appointments: oc(appointmentsDataStub).appointments.data([]),
      destinationLatLng: { lat: 0, lng: 0 },
      travelMode: 'WALKING' as TravelMode,
      handleOnClick: jest.fn(),
      desktopMode: false
    }
    const wrapper = shallow(<MapContainer {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('Should match snapshot', () => {
    const mockProps = {
      appointments: undefined,
      destinationLatLng: { lat: 0, lng: 0 },
      travelMode: 'WALKING' as TravelMode,
      handleOnClick: jest.fn(),
      desktopMode: false
    }
    const wrapper = shallow(<MapContainer {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('mapStateToProps', () => {
    it('should run correctly', () => {
      const mockState = {
        appointments: {
          appointments: appointmentsDataStub.appointments
        },
        direction: {
          destination: appointmentDataStub
        },
        auth: {
          refreshSession: {
            refereshToken: 'TOKEN',
            mode: 'DESKTOP'
          }
        }
      } as any
      const result = mapStateToProps(mockState)
      const expected = {
        appointments: oc(appointmentsDataStub).appointments.data([]),
        destinationLatLng: {
          lat: 52.1284,
          lng: -0.507145
        },
        desktopMode: true
      }
      expect(result).toEqual(expected)
    })
    it('should run correctly', () => {
      const mockState = {
        appointments: null,
        direction: null,
        auth: {
          refreshSession: null
        }
      } as any
      const result = mapStateToProps(mockState)
      const expected = {
        appointments: [],
        destinationLatLng: {
          lat: undefined,
          lng: undefined
        },
        desktopMode: false
      }
      expect(result).toEqual(expected)
    })
  })
  describe('filterInvalidMarker', () => {
    const markers = ([
      { position: { id: '123', lat: 0, lng: 0 } },
      { position: { id: '3245', lat: 0, lng: 0 } },
      {
        position: {
          id: '67876',
          lat: invalidValues.UNDEFINED_LATLNG_NUMBER,
          lng: invalidValues.UNDEFINED_LATLNG_NUMBER
        }
      }
    ] as unknown) as Coordinate[]
    const expected = [{ position: { id: '123', lat: 0, lng: 0 } }, { position: { id: '3245', lat: 0, lng: 0 } }]
    const result = filterInvalidMarker(markers)
    expect(result).toEqual(expected)
  })

  it('mapDispatchToProps', () => {
    const mockDispatch = jest.fn()
    const mockId = '1'
    const { handleOnClick } = mapDispatchToProps(mockDispatch)
    const fn = handleOnClick(mockId)
    fn()
    expect(mockDispatch).toBeCalledWith({
      data: {
        id: '1'
      },
      type: 'APPOINTMENT_DETAIL_REQUEST_DATA'
    })
  })
})
