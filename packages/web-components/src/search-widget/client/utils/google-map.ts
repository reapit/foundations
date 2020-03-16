import { createMarker, getLatLng } from '../../../common/utils/map-helper'
import { DEFAULT_ZOOM } from '../../../common/utils/constants'
import { SearchWidgetStore } from '../core/store'
import { Writable } from 'svelte/store'

export const showPropertiesMarker = (
  map: google.maps.Map,
  storeInstance: SearchWidgetStore,
  searchWidgetStore: Writable<SearchWidgetStore>,
) => {
  const { properties, propertyImages, markers, selectedProperty, searchType } = storeInstance
  const infoWindows: any[] = []
  console.log('called', properties)
  if (properties && properties._embedded) {
    // clear marker
    markers.forEach(marker => marker.setMap(null))
    // push marker to store
    properties._embedded.forEach(property => {
      console.log(property)
      const newMarker = createMarker({
        property,
        map,
        infoWindows,
        propertyImages,
        searchType,
      })
      console.log(newMarker)
      if (newMarker) {
        infoWindows.push(newMarker.infoWindow)
        searchWidgetStore.update(current => ({
          ...current,
          markers: [...current.markers, newMarker.marker],
        }))
      }
    })

    if (properties && !selectedProperty) {
      const bounds = new google.maps.LatLngBounds()
      markers.forEach(marker => bounds.extend(marker.getPosition() as google.maps.LatLng))
      map.fitBounds(bounds)
      return
    }

    if (selectedProperty) {
      const { latitude, longitude } = getLatLng(selectedProperty) as {
        latitude: number
        longitude: number
      }
      const centerPoint = new google.maps.LatLng(latitude, longitude)
      map.setCenter(centerPoint)
      map.setZoom(DEFAULT_ZOOM)
      return
    }
  }
}
