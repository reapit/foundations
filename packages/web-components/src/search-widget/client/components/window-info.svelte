<script lang="typescript">
  import { onMount, onDestroy, getContext, createEventDispatcher } from 'svelte'
  import * as TSDefinitions from '@reapit/foundations-ts-definitions'
  import * as SearchWidgetStore from '../core/store'
  import { getContent, getPrice, getLatLng } from '../../../common/utils/map-helper'
  import { GOOGLE_MAP_CONTEXT_NAME, INVALID_BACKGROUND_AS_BASE64 } from '../../../common/utils/constants'

  const dispatch = createEventDispatcher()

  export let marker: google.maps.Marker
  export let propertyImages: Record<string, TSDefinitions.PropertyImageModel>
  export let property: TSDefinitions.PropertyModel
  export let searchType: SearchWidgetStore.SearchType
  let windowInfo: google.maps.InfoWindow

  let content

  onMount(() => {
    let imageUrl = INVALID_BACKGROUND_AS_BASE64
    if (property) {
      const propertyId = property?.id
      const propertyImage = propertyId && propertyImages ? propertyImages[propertyId] : {}
      if (propertyImage?.url) {
        imageUrl = propertyImage.url
      }
    }
    let price = ''
    if (searchType) {
      price = getPrice(property, searchType)
    }
    const { latitude, longitude } = getLatLng(property)
    const marketingMode = property && property.marketingMode
    const address = {
      line1: property?.address?.line1 || '',
      line2: property?.address?.line2 || '',
    }
    const lettingPrice = property?.letting?.rent
    const rentFrequency = property?.letting?.rentFrequency
    const bedrooms = property?.bedrooms
    const bathrooms = property?.bathrooms

    const { getMap } = getContext(GOOGLE_MAP_CONTEXT_NAME)
    const map = getMap()

    windowInfo = new google.maps.InfoWindow({
      content: getContent({
        price,
        latitude,
        longitude,
        bedrooms,
        bathrooms,
        address,
        marketingMode,
        lettingPrice,
        rentFrequency,
        imageUrl,
      }),
    })

    google.maps.event.addListener(windowInfo,'closeclick',function(){
      dispatch('click')
    });

    windowInfo.open(map, marker)
  })

  onDestroy(() => {
    windowInfo.close()
  })
</script>
