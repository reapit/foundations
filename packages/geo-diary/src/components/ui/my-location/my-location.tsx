import React, { ChangeEvent, Dispatch, FC, SetStateAction, useEffect } from 'react'
import { Input } from '@reapit/elements/v3'
import {
  MyLocationIconContainer,
  MyLocationSection,
  MyLocationSectionResult,
  MyLocationSectionResults,
} from './__styles__/styles'
import { BiCurrentLocation } from 'react-icons/bi'
import { AppState, useAppState } from '../../../core/app-state'
import { handleRenderMyLocation } from '../map/google-map-component'
import { AppStateParams } from '../map/types'

export const handleFetchLocationResults = ({ appState, setAppState }: AppStateParams) => () => {
  const { mapRefs, locationQueryAddress } = appState

  const googleMaps = mapRefs?.googleMapsRef?.current

  if (googleMaps && locationQueryAddress) {
    const geocoder = new googleMaps.Geocoder()

    geocoder.geocode({ address: locationQueryAddress, region: 'GB' }, (results, status) => {
      console.log('results', results)
      if (status === 'OK') {
        setAppState((currentState) => ({
          ...currentState,
          locationQueryResults: results,
        }))
      } else {
        console.error('Current address request failed due to: ' + status)
      }
    })
  }
}

export const handleSetLocationQuery = (setAppState: Dispatch<SetStateAction<AppState>>) => (
  event: ChangeEvent<HTMLInputElement>,
) => {
  event.persist()
  console.log(event.target.value)
  setAppState((currentState) => ({
    ...currentState,
    locationQueryAddress: event.target.value,
  }))
}

export const MyLocation: FC = () => {
  const { appState, setAppState } = useAppState()
  const { locationAddress, hasGeoLocation } = appState

  useEffect(handleFetchLocationResults({ appState, setAppState }), [appState.locationQueryAddress])

  console.log(appState.locationQueryResults.map((locationQuery) => console.log(locationQuery.formatted_address)))
  return (
    <MyLocationSection>
      <Input
        placeholder={locationAddress ? locationAddress : 'Enter location'}
        onChange={handleSetLocationQuery(setAppState)}
      />
      {appState.locationQueryResults.length ? (
        <MyLocationSectionResults>
          {appState.locationQueryResults.map((result) => (
            <MyLocationSectionResult key={result.place_id}>{result.formatted_address}</MyLocationSectionResult>
          ))}
        </MyLocationSectionResults>
      ) : null}
      {hasGeoLocation && (
        <MyLocationIconContainer onClick={handleRenderMyLocation({ appState, setAppState })}>
          <BiCurrentLocation />
        </MyLocationIconContainer>
      )}
    </MyLocationSection>
  )
}
