<script>
  import { onMount, afterUpdate } from 'svelte'
  import searchWidgetStore from '../core/store'
  import { loadMap, centerMapToMarker, fitMapToBounds } from '../utils/map-helpers'
  import Marker from './marker.svelte'
  import WindowInfo from './window-info.svelte'
  import Fa from 'svelte-fa'
  import { faHome, faMapMarker } from '@fortawesome/free-solid-svg-icons'

  export let theme

  let map
  let mapElement
  let mapContainerElement

  $: isVisible = false

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

  const handleIsVisible = () => {
    isVisible = !isVisible
  }

  const handleMapCenter = () => {
    if ($searchWidgetStore.properties.length > 0 && !$searchWidgetStore.selectedProperty) {
      fitMapToBounds($searchWidgetStore.properties, map)
    }
    if ($searchWidgetStore.selectedProperty) {
      centerMapToMarker($searchWidgetStore.selectedProperty, map)
    }
  }

  onMount(async () => {
    mapContainerElement.addEventListener('transitionend', event => {
      if (event.target.classList.contains('google-map-outer-container')) {
        handleMapCenter()
      }
    })

    if (!window.google) {
      map = await loadMap(mapElement, theme)
    }
  })

  afterUpdate(() => {
    handleMapCenter()
  })
</script>

<style>
  .google-map-outer-container {
    position: absolute;
    transition: 0.4s all ease-in-out;
    width: 0%;
    right: 0em;
    height: 100%;
    z-index: 1;
  }

  .google-map-outer-container.google-map-visible {
    width: 100%;
  }

  .google-map-container {
    width: 100%;
    height: 100%;
    top: 3em;
  }

  .google-map-container.google-map-visible {
    width: 100%;
  }

  .google-map-toggle-switch {
    font-size: 2em;
    position: absolute;
    right: 0%;
    top: 0px;
    transition: 0.4s right ease-in-out;
    z-index: 1;
  }

  .google-map-toggle-switch.google-map-visible {
    right: calc(100% - 1em);
  }
</style>

<div
  class="google-map-outer-container {isVisible ? 'google-map-visible' : ''}
  {$searchWidgetStore.themeClasses.globalStyles}"
  bind:this={mapContainerElement}>
  {#if $searchWidgetStore.properties.length > 0}
    <div
      class="google-map-toggle-switch {isVisible ? 'google-map-visible' : ''}"
      on:click|preventDefault={handleIsVisible}>
      <Fa icon={isVisible ? faHome : faMapMarker} />
    </div>
  {/if}
  <div class="google-map-container {isVisible ? 'google-map-visible' : ''}" bind:this={mapElement}>
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
