<script lang="typescript">
  import { onMount, createEventDispatcher } from 'svelte'
  import * as TSDefinitions from '@reapit/foundations-ts-definitions'
  import { getMarker } from '../../../common/utils/map-helpers'
  import { DEFAULT_CENTER } from '../../../common/utils/constants'

  const dispatch = createEventDispatcher()

  export let property: TSDefinitions.PropertyModel
  export let map: google.maps.Map
  let marker: google.maps.Marker

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
