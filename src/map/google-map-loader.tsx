import React from 'react'
import load from 'little-loader'
import { queryParams, Params } from '../utils/query-params'

const GOOGLE_MAP_PLACES_API = 'https://maps.googleapis.com/maps/api/js'

export type LoadedCallBackParams = {
  setError: (err: string) => void
  setGoogleMap: (googleMap: any) => void
}

export const loadedCallback = ({
  setError,
  setGoogleMap
}: LoadedCallBackParams) => (err: any) => {
  if (err) {
    setError(err)
  }
  if (!err) {
    const googleMap = window.google ? window.google.maps : null
    setGoogleMap(googleMap)
  }
}

export type HandleUseEffectParams = {
  setError: (err: string) => void
  params: Params
  setGoogleMap: (googleMap: any) => void
}

export const handleUseEffect = ({
  setError,
  params,
  setGoogleMap
}: HandleUseEffectParams) => () => {
  load(
    `${GOOGLE_MAP_PLACES_API}?${queryParams(params)}`,
    loadedCallback({ setError, setGoogleMap })
  )
}

export type RenderProps = {
  googleMap: {} | null
  error: string | null
}

export type GoogleMapLoaderProps = {
  params: Params
  render: ({ googleMap, error }: RenderProps) => any
}

export const GoogleMapLoader: React.FC<GoogleMapLoaderProps> = ({
  render,
  params
}) => {
  const [googleMap, setGoogleMap] = React.useState(null)
  const [error, setError] = React.useState('')
  React.useEffect(handleUseEffect({ setError, setGoogleMap, params }), [])
  return render({ googleMap, error })
}

export default GoogleMapLoader
