import React, { ChangeEvent, Dispatch, MouseEvent, FC, SetStateAction, useCallback, useEffect } from 'react'
import { Input } from '@reapit/elements'
import {
  DepartureIcon,
  DestinationLocationSection,
  destinationSectionExpanded,
  inputWithIcon,
  JourneyIcon,
  myLocationHasDestination,
  MyLocationIconContainer,
  MyLocationIconWrap,
  MyLocationInnerWrap,
  MyLocationSection,
  MyLocationSectionResult,
  MyLocationSectionResults,
  MyLocationWrap,
} from './__styles__/styles'
import { BiCurrentLocation, BiX } from 'react-icons/bi'
import { AppState, useAppState } from '../../../core/app-state'
import { AppStateParams, GeocoderResult } from '../map/types'
import { getGeoCoords } from '../../../utils/map-utils'
import debounce from 'lodash.debounce'
import { DebouncedFunc } from 'lodash'
import { cx } from '@linaria/core'
import pinIcon from '../../../assets/pin.svg'

interface HandleFetchLocationResultsParams extends AppStateParams {
  debouncedGeolocate: DebouncedFunc<({ appState, setAppState }: AppStateParams) => void>
}

export const fetchLocationResults = ({ appState, setAppState }: AppStateParams) => {
  const { mapRefs, locationQueryAddress } = appState
  const googleMaps = mapRefs?.googleMapsRef?.current

  if (googleMaps && locationQueryAddress) {
    const geocoder = new googleMaps.Geocoder()

    geocoder.geocode({ address: locationQueryAddress, region: 'GB' }, (results, status) => {
      if (status === 'OK' && results) {
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

export const handleFetchLocationResults =
  ({ appState, setAppState, debouncedGeolocate }: HandleFetchLocationResultsParams) =>
  () => {
    debouncedGeolocate({ appState, setAppState })

    return debouncedGeolocate.cancel
  }

export const handleSetLocationQuery =
  (setAppState: Dispatch<SetStateAction<AppState>>) => (event: ChangeEvent<HTMLInputElement>) => {
    event.persist()
    setAppState((currentState) => ({
      ...currentState,
      locationQueryAddress: event.target.value,
    }))
  }

export const handleCloseResults =
  (setAppState: Dispatch<SetStateAction<AppState>>) => (event: MouseEvent<SVGSVGElement>) => {
    event.stopPropagation()
    setAppState((currentState) => ({
      ...currentState,
      locationQueryAddress: null,
      locationQueryResults: [],
    }))
  }

export const handleSelectResult =
  (setAppState: Dispatch<SetStateAction<AppState>>, result: GeocoderResult) => (event: MouseEvent<HTMLDivElement>) => {
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

export const handleGeoLocateMe = (setAppState: Dispatch<SetStateAction<AppState>>) => async () => {
  const geoCoords = await getGeoCoords()
  setAppState((currentState) => ({
    ...currentState,
    ...geoCoords,
  }))
}

export const MyLocation: FC = () => {
  const { appState, setAppState } = useAppState()
  const { locationAddress, hasGeoLocation, locationQueryAddress, locationQueryResults, tab, destinationAddress } =
    appState
  const debouncedGeolocate = useCallback(debounce(fetchLocationResults, 1000), [locationQueryAddress])
  const hasDesination = tab === 'MAP' && destinationAddress
  const hasIcon = locationQueryResults.length || hasGeoLocation
  useEffect(handleFetchLocationResults({ debouncedGeolocate, setAppState, appState }), [locationQueryAddress])

  return (
    <MyLocationWrap>
      {hasDesination && (
        <MyLocationIconWrap>
          <DepartureIcon />
          <JourneyIcon />
          <img src={pinIcon} />
        </MyLocationIconWrap>
      )}
      <MyLocationInnerWrap className={cx(hasDesination && myLocationHasDestination)}>
        <MyLocationSection>
          <Input
            className={cx(hasIcon && inputWithIcon)}
            placeholder={locationAddress ? locationAddress : 'Enter location'}
            onChange={handleSetLocationQuery(setAppState)}
            value={locationQueryAddress ?? ''}
          />
          {hasIcon && (
            <MyLocationIconContainer onClick={handleGeoLocateMe(setAppState)}>
              {locationQueryResults.length ? <BiX onClick={handleCloseResults(setAppState)} /> : null}
              {hasGeoLocation && <BiCurrentLocation />}
            </MyLocationIconContainer>
          )}
          {locationQueryResults.length ? (
            <MyLocationSectionResults>
              {locationQueryResults.map((result) => (
                <MyLocationSectionResult key={result.place_id} onClick={handleSelectResult(setAppState, result)}>
                  {result.formatted_address}
                </MyLocationSectionResult>
              ))}
            </MyLocationSectionResults>
          ) : null}
        </MyLocationSection>
        <DestinationLocationSection className={cx(hasDesination && destinationSectionExpanded)}>
          {destinationAddress}
        </DestinationLocationSection>
      </MyLocationInnerWrap>
    </MyLocationWrap>
  )
}
