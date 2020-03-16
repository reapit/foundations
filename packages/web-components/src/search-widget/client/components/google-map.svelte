<script lang="typescript">
  import { onMount, createEventDispatcher, afterUpdate } from 'svelte'
  import store from '../core/store'
  import { markers } from '../core/store'
  import GoogleMapLoader from './google-map-loader.svelte'
  import { DEFAULT_CENTER, DEFAULT_ZOOM } from '../../../common/utils/constants'
  import { getLatLng, createMarker } from '../../../common/utils/map-helper'

  const dispatch = createEventDispatcher()

  export let apiKey: string = ''
  export let libraries: string = 'places'
  export let center: google.maps.LatLngLiteral
  export let zoom: number
  export let properties: any[] = []
  export let propertyImages: any = {}
  export let property = null

  let mapElement: HTMLElement
  let map: google.maps.Map

  afterUpdate(() => {
    if (map) {
      showPropertiesMarker(map)
    }
  })

  const initialiseMap = () => {
    const google = window['google']
    map = new google.maps.Map(mapElement, {
      center: center,
      zoom: zoom,
    })

    showPropertiesMarker(map)
  }

  const showPropertiesMarker = (map: google.maps.Map) => {
    const infoWindows: any[] = []
    if (properties) {
      // clear marker
      $markers.forEach(marker => marker.setMap(null))
      // push marker to store
      properties.forEach(property => {
        const newMarker = createMarker({
          property,
          map,
          infoWindows,
          propertyImages,
          searchType: $store.searchType,
        })

        if (newMarker) {
          infoWindows.push(newMarker.infoWindow)
          markers.update(current => [...current, newMarker.marker])
        }
      })

      if (properties && !property) {
        const bounds = new google.maps.LatLngBounds()
        $markers.forEach(marker => bounds.extend(marker.getPosition()))
        map.fitBounds(bounds)
        return
      }

      if (property) {
        const { latitude, longitude } = getLatLng(property) as {
          latitude: number
          longitude: number
        }
        const centerPoint = new google.maps.LatLng(latitude, longitude)
        map.setCenter(centerPoint)
        map.setZoom(DEFAULT_ZOOM)
        return
      }
    }
  }
</script>

<style>
  .map-wrap {
    height: 100%;
    width: 100%;
  }
</style>

<GoogleMapLoader {apiKey} {libraries} on:ready={initialiseMap} />
<div class="map-wrap" bind:this={mapElement} />
