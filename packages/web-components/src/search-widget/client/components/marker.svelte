<script lang="ts"> 
  import { onMount, createEventDispatcher } from 'svelte'
  import { getMarker } from '../utils/map-helpers'
  import * as PropertyTypes from '../../types'

  const dispatch = createEventDispatcher()

  export let property: PropertyTypes.PickedPropertyModel
  export let map: google.maps.Map
  let marker: google.maps.Marker

  onMount(() => {
    marker = getMarker(property, map)
    window.google.maps.event.addListener(marker, 'click', () => {
      dispatch('markerClick', {
        selectedMarker: marker,
        selectedProperty: property,
      })
    })
  })
</script>
