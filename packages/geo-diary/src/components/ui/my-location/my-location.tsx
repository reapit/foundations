import React, { ChangeEvent, Dispatch, MouseEvent, FC, SetStateAction, useCallback, useEffect } from 'react'
import { Input } from '@reapit/elements/v3'
import {
  MyLocationIconContainer,
  MyLocationSection,
  MyLocationSectionResult,
  MyLocationSectionResults,
} from './__styles__/styles'
import { BiCurrentLocation, BiX } from 'react-icons/bi'
import { AppState, useAppState } from '../../../core/app-state'
import { AppStateParams, GeocoderResult } from '../map/types'
import { getGeoCoords } from '../../../utils/map-utils'
import debounce from 'lodash.debounce'
import { DebouncedFunc } from 'lodash'

interface HandleFetchLocationResultsParams extends AppStateParams {
  debouncedGeolocate: DebouncedFunc<({ appState, setAppState }: AppStateParams) => void>
}

export const fetchLocationResults = ({ appState, setAppState }: AppStateParams) => {
  const { mapRefs, locationQueryAddress } = appState
  const googleMaps = mapRefs?.googleMapsRef?.current

  if (googleMaps && locationQueryAddress) {
    const geocoder = new googleMaps.Geocoder()

    geocoder.geocode({ address: locationQueryAddress, region: 'GB' }, (results, status) => {
      if (status === 'OK') {
        setAppState((currentState) => ({
          ...currentState,
          locationQueryResults: results,
        }))
      } else {
        console.error(`Current address request failed due to ${status}`)
      }
    })
  }
}

export const handleFetchLocationResults = ({
  appState,
  setAppState,
  debouncedGeolocate,
}: HandleFetchLocationResultsParams) => () => {
  debouncedGeolocate({ appState, setAppState })

  return debouncedGeolocate.cancel
}

export const handleSetLocationQuery = (setAppState: Dispatch<SetStateAction<AppState>>) => (
  event: ChangeEvent<HTMLInputElement>,
) => {
  event.persist()
  setAppState((currentState) => ({
    ...currentState,
    locationQueryAddress: event.target.value,
  }))
}

export const handleCloseResults = (setAppState: Dispatch<SetStateAction<AppState>>) => (
  event: MouseEvent<SVGSVGElement>,
) => {
  event.stopPropagation()
  setAppState((currentState) => ({
    ...currentState,
    locationQueryAddress: null,
    locationQueryResults: [],
  }))
}

export const handleSelectResult = (setAppState: Dispatch<SetStateAction<AppState>>, result: GeocoderResult) => (
  event: MouseEvent<HTMLDivElement>,
) => {
  event.stopPropagation()
  setAppState((currentState) => ({
    ...currentState,
    locationQueryAddress: null,
    locationQueryResults: [],
    locationAddress: result.formatted_address,
    currentLat: result.geometry.location.lat(),
    currentLng: result.geometry.location.lng(),
  }))
}

export const handleGeoLocateMe = (appState: AppState, setAppState: Dispatch<SetStateAction<AppState>>) => async () => {
  const geoCoords = await getGeoCoords()
  setAppState((currentState) => ({
    ...currentState,
    ...geoCoords,
  }))
}

export const MyLocation: FC = () => {
  const { appState, setAppState } = useAppState()
  const { locationAddress, hasGeoLocation, locationQueryAddress, locationQueryResults } = appState
  const debouncedGeolocate = useCallback(debounce(fetchLocationResults, 1000), [locationQueryAddress])

  useEffect(handleFetchLocationResults({ debouncedGeolocate, setAppState, appState }), [locationQueryAddress])

  return (
    <MyLocationSection>
      <Input
        placeholder={locationAddress ? locationAddress : 'Enter location'}
        onChange={handleSetLocationQuery(setAppState)}
        value={locationQueryAddress ?? ''}
      />
      {locationQueryResults.length ? (
        <MyLocationSectionResults>
          {locationQueryResults.map((result) => (
            <MyLocationSectionResult key={result.place_id} onClick={handleSelectResult(setAppState, result)}>
              {result.formatted_address}
              <BiX onClick={handleCloseResults(setAppState)} />
            </MyLocationSectionResult>
          ))}
        </MyLocationSectionResults>
      ) : null}
      {hasGeoLocation && (
        <MyLocationIconContainer onClick={handleGeoLocateMe(appState, setAppState)}>
          <BiCurrentLocation />
        </MyLocationIconContainer>
      )}
    </MyLocationSection>
  )
}
