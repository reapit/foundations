<script lang="typescript">
  import { onMount, createEventDispatcher, afterUpdate } from 'svelte'
  import { markers } from '../core/store'
  import GoogleMapLoader from './google-map-loader.svelte'
  import { DEFAULT_CENTER, DEFAULT_ZOOM } from '../../../common/utils/constants'
  import { getLatLng } from '../../../common/utils/map-helper'

  const dispatch = createEventDispatcher()

  export let apiKey: string = ''
  export let libraries: string = 'places'
  export let center: google.maps.LatLngLiteral
  export let zoom: number
  export let properties: any[] = []
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
        const { latitude, longitude } = getLatLng(property)
        const marker = new google.maps.Marker({
          position: {
            lat: latitude || DEFAULT_CENTER.lat,
            lng: longitude || DEFAULT_CENTER.lng,
          },
          icon: null,
          map,
        })

        const infoWindow = new google.maps.InfoWindow({
          content: `<h2>${property.id}</h2`,
        })

        google.maps.event.addListener(marker, 'click', () => {
          if (infoWindows.length > 0) {
            infoWindows.forEach((item: google.maps.InfoWindow) => {
              item.close()
            })
          }
          infoWindow.open(map, marker)
        })
        markers.update(current => [...current, marker])
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
