<script>
  import { onMount, onDestroy, afterUpdate, beforeUpdate } from 'svelte'
  import searchWidgetStore from '../core/store'
  import { getLatLng, loadMap, centerMapToMarker, fitMapToBounds } from '../../../common/utils/map-helpers'
  import { DEFAULT_CENTER, GOOGLE_MAP_CONTEXT_NAME, DEFAULT_ZOOM } from '../../../common/utils/constants'
  import { loader } from '../../../common/utils/loader'
  import Marker from './marker.svelte'
  import WindowInfo from './window-info.svelte'

  let map
  let mapElement
  let mapLoading = false
  let selectedMarker
  let properties = []
  let propertyImages
  let selectedProperty
  let searchType

  const unsubscribeSearchWidgetStore = searchWidgetStore.subscribe(store => {
    selectedMarker = store.selectedMarker
    properties = (store.properties && store.properties._embedded) || []
    propertyImages = store.propertyImages
    selectedProperty = store.selectedProperty
    searchType = store.searchType
    console.log(properties)
  })

  const handleMarkerClick = event => {
    const { selectedProperty, selectedMarker } = event.detail
    searchWidgetStore.update(store => ({
      ...store,
      selectedProperty,
      selectedMarker,
    }))
  }

  const handleCloseWindowInfo = () => {
    searchWidgetStore.update(store => ({
      ...store,
      selectedMarker: null,
    }))
  }

  onMount(async () => {
    if (!window.google) {
      map = await loadMap(mapElement)
    }
  })

  afterUpdate(() => {
    if (properties.length > 0 && !selectedProperty) {
      fitMapToBounds(properties, map)
    }
    if (selectedProperty) {
      centerMapToMarker(selectedProperty, map)
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
  {#if properties.length > 0 && selectedMarker}
    <WindowInfo
      on:windowInfoClick={handleCloseWindowInfo}
      {propertyImages}
      {selectedProperty}
      {selectedMarker}
      {searchType}
      {map} />
  {/if}
  {#each properties as property (property.id)}
    <Marker on:markerClick={handleMarkerClick} {map} {property} />
  {/each}
</div>
