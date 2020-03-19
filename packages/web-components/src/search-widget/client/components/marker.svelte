<script lang="typescript">
  import { onMount, onDestroy, getContext, createEventDispatcher } from 'svelte'
  import * as TSDefinitions from '@reapit/foundations-ts-definitions'
  import { getLatLng } from '../../../common/utils/map-helper'
  import { DEFAULT_CENTER, GOOGLE_MAP_CONTEXT_NAME } from '../../../common/utils/constants'

  const dispatch = createEventDispatcher()

  export let property: TSDefinitions.PropertyModel
  let marker: google.maps.Marker

  const { getMap } = getContext(GOOGLE_MAP_CONTEXT_NAME)
  const map = getMap()

  onMount(() => {
    const { latitude, longitude } = getLatLng(property)
    marker = new google.maps.Marker({
      position: {
        lat: latitude || DEFAULT_CENTER.lat,
        lng: longitude || DEFAULT_CENTER.lng,
      },
      map,
    })

    google.maps.event.addListener(marker, 'click', () => {
      dispatch('click', {
        marker: marker,
        property: property,
      })
    })
  })

  onDestroy(() => {
    marker.setMap(null)
  })
</script>
