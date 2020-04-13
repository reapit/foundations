<script>
  import { onMount, createEventDispatcher } from 'svelte'
  import { getMarker } from '../utils/map-helpers'

  const dispatch = createEventDispatcher()

  export let property
  export let map
  let marker

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
