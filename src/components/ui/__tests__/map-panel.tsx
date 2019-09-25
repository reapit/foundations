import * as React from 'react'
import { shallow } from 'enzyme'
import { MapPanel, MapPanelProps, mapStateToProps, mapDispatchToProps } from '../map-panel'
import toJson from 'enzyme-to-json'
import { ReduxState } from '@/types/core'

describe('MapPanel', () => {
  it('should match a snapshot when valid LAT, LONG', () => {
    const props: MapPanelProps = {
      duration: '15 mins',
      distance: '3 miles',
      currentLocation: { lat: 52.522905940278065, lng: -1.241455078125 },
      destination: { lat: 52.158215, lng: -0.433459 },
      filterType: 'Today',
      showAllAppointment: jest.fn()
    }
    expect(toJson(shallow(<MapPanel {...props} />))).toMatchSnapshot()
  })

  it('should match a snapshot when invalid LAT, LONG', () => {
    const props: MapPanelProps = {
      duration: '15 mins',
      distance: '3 miles',
      currentLocation: { lat: 52.522905940278065, lng: -1.241455078125 },
      destination: { lat: undefined, lng: undefined },
      filterType: 'Today',
      showAllAppointment: jest.fn()
    }
    expect(toJson(shallow(<MapPanel {...props} />))).toMatchSnapshot()
  })

  describe('mapStateToProps', () => {
    it('should return correctly', () => {
      const state = {
        appointments: {
          time: 'Today'
        }
      } as ReduxState
      const expected = {
        filterType: 'Today'
      }
      const result = mapStateToProps(state)
      expect(result).toEqual(expected)
    })

    it('should return when undefined', () => {
      const state = {} as ReduxState
      const expected = {
        filterType: 'Today'
      }
      const result = mapStateToProps(state)
      expect(result).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {
    it('should run correctly', () => {
      const mockDispatch = jest.fn()
      const { showAllAppointment } = mapDispatchToProps(mockDispatch)
      showAllAppointment()
      expect(mockDispatch).toBeCalled()
    })
  })
})
