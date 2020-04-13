<script>
  import { onMount, afterUpdate } from 'svelte'
  import searchWidgetStore from '../core/store'
  import { loadMap, centerMapToMarker, fitMapToBounds } from '../utils/map-helpers'
  import Marker from './marker.svelte'
  import WindowInfo from './window-info.svelte'

  export let theme

  let map
  let mapElement

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
      map = await loadMap(mapElement, theme)
    }
  })

  afterUpdate(() => {
    if ($searchWidgetStore.properties.length > 0 && !$searchWidgetStore.selectedProperty) {
      fitMapToBounds($searchWidgetStore.properties, map)
    }
    if ($searchWidgetStore.selectedProperty) {
      centerMapToMarker($searchWidgetStore.selectedProperty, map)
    }
  })
</script>

<style>
  .google-map-container {
    width: 100%;
    height: 600px;
  }

  .google-map-outer-container {
    padding: 0.5em;
  }
</style>

<div class="google-map-outer-container">
  <div class="google-map-container" bind:this={mapElement}>
    {#if $searchWidgetStore.properties.length > 0 && $searchWidgetStore.selectedProperty}
      <WindowInfo
        on:windowInfoClick={handleCloseWindowInfo}
        propertyImages={$searchWidgetStore.propertyImages}
        selectedProperty={$searchWidgetStore.selectedProperty}
        selectedMarker={$searchWidgetStore.selectedMarker}
        searchType={$searchWidgetStore.searchType}
        themeClasses={$searchWidgetStore.themeClasses}
        {map} />
    {/if}
    {#each $searchWidgetStore.properties as property (property.id)}
      <Marker on:markerClick={handleMarkerClick} {map} {property} />
    {/each}
  </div>
</div>
