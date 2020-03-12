import GoogleMapWidget from '../components/google-map.svelte'

export type Coords = {
  lat: number
  lng: number
}

export type CoordinateProps = {
  position: Coords
}

export interface GoogleMapWidgeInitializers {
  apiKey: string
  libraries?: string
  target?: HTMLElement
  center?: Coords
  zoom?: number
  coordinates?: Array<CoordinateProps>
  onLoaded?: () => void
}

export const GoogleMapWidgetComponent = ({
  target = document.body,
  apiKey,
  libraries,
  center,
  zoom,
  coordinates,
  onLoaded,
}: GoogleMapWidgeInitializers) =>
  new GoogleMapWidget({
    target,
    props: {
      apiKey,
      libraries,
      center,
      zoom,
      coordinates,
      onLoaded,
    },
  })

Object.defineProperty(window, 'ReapitGoogleMapWidgetComponent', {
  value: GoogleMapWidgetComponent,
})
