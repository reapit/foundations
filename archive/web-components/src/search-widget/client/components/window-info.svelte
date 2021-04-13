<script lang="ts">
  import { onMount, onDestroy, afterUpdate, createEventDispatcher } from 'svelte'
  import { getInfoWindow } from '../utils/map-helpers'
  import * as Theme from '../../../common/styles/types'
  import * as PropertyTypes from '../../types'

  const dispatch = createEventDispatcher()

  export let selectedMarker: google.maps.Marker
  export let propertyImages: Record<string, PropertyTypes.PickedPropertyImageModel[]>
  export let selectedProperty: PropertyTypes.PickedPropertyModel
  export let searchType: 'Rent' | 'Sale'
  export let map: google.maps.Map
  export let themeClasses: Theme.ThemeBaseClasses

  let windowInfo: google.maps.InfoWindow

  onMount(() => {
    windowInfo = getInfoWindow(selectedProperty, searchType, propertyImages, themeClasses)

    window.google.maps.event.addListener(windowInfo, 'closeclick', () => {
      dispatch('windowInfoClick')
    })

    windowInfo && windowInfo.open && windowInfo.open(map, selectedMarker)
  })

  afterUpdate(() => {
    windowInfo && windowInfo.close && windowInfo.close()

    windowInfo = getInfoWindow(selectedProperty, searchType, propertyImages, themeClasses)

    window.google.maps.event.addListener(windowInfo, 'closeclick', () => {
      dispatch('windowInfoClick')
    })

    windowInfo && windowInfo.open && windowInfo.open(map, selectedMarker)
  })

  onDestroy(() => {
    windowInfo && windowInfo.close && windowInfo.close()
  })
</script>
