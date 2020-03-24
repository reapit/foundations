<script lang="typescript">
  import { onMount, onDestroy, afterUpdate, createEventDispatcher } from 'svelte'
  import * as TSDefinitions from '@reapit/foundations-ts-definitions'
  import { getInfoWindow } from '../../../common/utils/map-helpers'
  import { GOOGLE_MAP_CONTEXT_NAME, INVALID_BACKGROUND_AS_BASE64 } from '../../../common/utils/constants'

  const dispatch = createEventDispatcher()

  export let selectedMarker: google.maps.Marker
  export let propertyImages: Record<string, TSDefinitions.PropertyImageModel>
  export let selectedProperty: TSDefinitions.PropertyModel
  export let searchType: 'Sale' | 'Rent'
  export let map: google.maps.Map

  let windowInfo: google.maps.InfoWindow

  onMount(() => {
    windowInfo = getInfoWindow(selectedProperty, searchType, propertyImages)

    google.maps.event.addListener(windowInfo, 'closeclick', () => {
      dispatch('windowInfoClick')
    })

    windowInfo.open(map, selectedMarker)
  })

  afterUpdate(() => {
    windowInfo.close()

    windowInfo = getInfoWindow(selectedProperty, searchType, propertyImages)

    google.maps.event.addListener(windowInfo, 'closeclick', () => {
      dispatch('windowInfoClick')
    })

    windowInfo.open(map, selectedMarker)
  })

  onDestroy(() => {
    windowInfo.close()
  })
</script>
