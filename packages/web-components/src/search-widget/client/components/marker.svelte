<script lang="typescript">
  import { onMount, onDestroy, getContext, createEventDispatcher } from 'svelte'
  import * as TSDefinitions from '@reapit/foundations-ts-definitions'
  import { getLatLng } from '../../../common/utils/map-helper'
  import { DEFAULT_CENTER } from '../../../common/utils/constants'

  const dispatch = createEventDispatcher()

  export let property: TSDefinitions.PropertyModel
  export let map: google.maps.Map
  let marker: google.maps.Marker

  onMount(() => {
    console.log(property)
    const { latitude, longitude } = getLatLng(property)
    marker = new google.maps.Marker({
      position: {
        lat: latitude || DEFAULT_CENTER.lat,
        lng: longitude || DEFAULT_CENTER.lng,
      },
      map,
    })

    google.maps.event.addListener(marker, 'click', () => {
      dispatch('markerClick', {
        marker: marker,
        property: property,
      })
    })
  })

  onDestroy(() => {
    marker.setMap(null)
  })
</script>
