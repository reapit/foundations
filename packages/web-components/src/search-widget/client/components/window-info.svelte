<script>
  import { onMount, onDestroy, afterUpdate, createEventDispatcher } from 'svelte'
  import { getInfoWindow } from '../utils/map-helpers'
  import { GOOGLE_MAP_CONTEXT_NAME, INVALID_BACKGROUND_AS_BASE64 } from '../../../common/utils/constants'

  const dispatch = createEventDispatcher()

  export let selectedMarker
  export let propertyImages
  export let selectedProperty
  export let searchType
  export let map
  export let themeClasses

  let windowInfo

  onMount(() => {
    windowInfo = getInfoWindow(selectedProperty, searchType, propertyImages, themeClasses)

    google.maps.event.addListener(windowInfo, 'closeclick', () => {
      dispatch('windowInfoClick')
    })

    windowInfo && windowInfo.open && windowInfo.open(map, selectedMarker)
  })

  afterUpdate(() => {
    windowInfo && windowInfo.close && windowInfo.close()

    windowInfo = getInfoWindow(selectedProperty, searchType, propertyImages, themeClasses)

    google.maps.event.addListener(windowInfo, 'closeclick', () => {
      dispatch('windowInfoClick')
    })

    windowInfo && windowInfo.open && windowInfo.open(map, selectedMarker)
  })

  onDestroy(() => {
    windowInfo && windowInfo.close && windowInfo.close()
  })
</script>
