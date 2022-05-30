import React from 'react'
import { render } from '../../../tests/react-testing'
import { handleOpenNativeMap, MapPanel } from '../map-panel'
import { AppState } from '../../../../core/app-state'

const mockAppState = {
  currentLat: 1234,
  currentLng: 1234,
  destinationLat: 1234,
  destinationLng: 1234,
} as AppState

jest.mock('../../../../core/app-state')

describe('MapPanel', () => {
  it('should match snapshot without an appointment in state', () => {
    expect(
      render(
        <MapPanel
          routeInformation={{ duration: { text: 'TEXT', value: 1000 }, distance: { text: 'TEXT', value: 1000 } }}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should get a mapUrl for IOS and set on window with handleOpenNativeMap', () => {
    const windowSpy = jest.spyOn(window, 'open')
    const curried = handleOpenNativeMap({ appState: mockAppState, ios: true })

    curried()

    expect(windowSpy).toHaveBeenLastCalledWith('maps://maps.google.com/maps?saddr=1234,1234&daddr=1234,1234')
  })

  it('should get a mapUrl for android and set on window with handleOpenNativeMap', () => {
    const windowSpy = jest.spyOn(window, 'open')
    const curried = handleOpenNativeMap({ appState: mockAppState, ios: false })

    curried()

    expect(windowSpy).toHaveBeenLastCalledWith('https://maps.google.com/maps?saddr=1234,1234&daddr=1234,1234')
  })
})
