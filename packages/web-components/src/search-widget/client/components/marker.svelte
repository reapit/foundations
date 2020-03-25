<script>
  import { onMount, createEventDispatcher } from 'svelte'
  import { getMarker } from '../../../common/utils/map-helpers'
  import { DEFAULT_CENTER } from '../../../common/utils/constants'

  const dispatch = createEventDispatcher()

  export let property
  export let map
  let marker

  onMount(() => {
    marker = getMarker(property, map)

    google.maps.event.addListener(marker, 'click', () => {
      dispatch('markerClick', {
        selectedMarker: marker,
        selectedProperty: property,
      })
    })
  })
</script>
