<script lang="typescript">
  import { onMount, onDestroy } from 'svelte'
  import * as SearchWidgetStore from '../core/store'
  import { getLatLng, createMarker } from '../../../common/utils/map-helper'
  import { DEFAULT_CENTER, DEFAULT_ZOOM } from '../../../common/utils/constants'
  import { showPropertiesMarker } from '../utils/google-map'
  import { loader } from '../../../common/utils/loader'
  
  const searchWidgetStore = SearchWidgetStore.default

  let storeInstance: SearchWidgetStore.SearchWidgetStore
  let map: google.maps.Map
  let mapElement: HTMLDivElement
  let mapLoading: boolean = false

  const unsubscribeSearchWidgetStore = searchWidgetStore.subscribe(store => {
    if (map && storeInstance && storeInstance.properties !== store.properties) {
      showPropertiesMarker(map, store, searchWidgetStore)
      storeInstance = store
    }

    storeInstance = store
  })

  onMount(() => {
    (window as any).onMapReady = () => {
      map = new google.maps.Map(mapElement, {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
      })
    
      mapLoading = false
    }

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

<div class="map-wrap" bind:this={mapElement} />
