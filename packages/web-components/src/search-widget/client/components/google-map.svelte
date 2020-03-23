<script lang="typescript">
  import { onMount, onDestroy, afterUpdate, beforeUpdate } from 'svelte'
  import * as TSDefinitions from '@reapit/foundations-ts-definitions'
  import * as SearchWidgetStore from '../core/store'
  import { getLatLng, createMarker } from '../../../common/utils/map-helper'
  import { DEFAULT_CENTER, GOOGLE_MAP_CONTEXT_NAME, DEFAULT_ZOOM } from '../../../common/utils/constants'
  import { loader } from '../../../common/utils/loader'
  import Marker from './marker.svelte'
  import WindowInfo from './window-info.svelte'

  const searchWidgetStore = SearchWidgetStore.default

  let storeInstance: SearchWidgetStore.SearchWidgetStore
  let map: google.maps.Map
  let mapElement: HTMLDivElement
  let mapLoading: boolean = false
  let selectedMarker: {
    marker: google.maps.Marker
    property: TSDefinitions.PropertyModel
  } | null

  export let properties: TSDefinitions.PropertyModel[] = []
  export let propertyImages: Record<string, TSDefinitions.PropertyImageModel>
  export let selectedProperty: TSDefinitions.PropertyModel

  const unsubscribeSearchWidgetStore = searchWidgetStore.subscribe(store => {
    storeInstance = store
  })

  afterUpdate(() => {
    if (properties.length > 0 && !selectedProperty) {
      const bounds = new google.maps.LatLngBounds()
      properties.forEach(property =>
        bounds.extend({
          lat: property?.address?.geolocation?.latitude || DEFAULT_CENTER.lat,
          lng: property?.address?.geolocation?.longitude || DEFAULT_CENTER.lng,
        }),
      )
      map.fitBounds(bounds)
    }
    if (selectedProperty) {
      const { latitude, longitude } = getLatLng(selectedProperty) as {
        latitude: number
        longitude: number
      }
      const centerPoint = new google.maps.LatLng(latitude, longitude)
      map.setCenter(centerPoint)
      map.setZoom(DEFAULT_ZOOM)
      return
    }
  })

  const handleMarkerClick = (event: CustomEvent) => {
    selectedMarker = event.detail
  }

  const handleCloseWindowInfo = () => {
    selectedMarker = null
  }

  onMount(() => {
    Object.defineProperty(window, 'onMapReady', {
      value: () => {
        map = new google.maps.Map(mapElement, {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
      })
      mapLoading = false
      }
    });

    if (!mapLoading && !window.google) {
      const url = [
        `//maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=places&callback=onMapReady`,
      ].join('')
      mapLoading = true

      loader(url, () => {
        console.log('maps loaded')
        return {}
      })
    }
  })

  onDestroy(() => {
    unsubscribeSearchWidgetStore()
  })
</script>

<style>
  .map-wrap {
    height: 100%;
    width: 100%;
  }
</style>

<div class="map-wrap" bind:this={mapElement}>
  {#if properties.length > 0 && !!selectedMarker}
    <WindowInfo on:windowInfoClick={handleCloseWindowInfo} propertyImages={propertyImages} property={selectedMarker.property} marker={selectedMarker.marker} searchType={'Rent'} {map} />
  {/if}
  {#each properties as property (property.id)}
    <Marker {property} on:markerClick={handleMarkerClick} {map} />
  {/each}
</div>
