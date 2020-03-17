import { createMarker, getLatLng } from '../../../common/utils/map-helper'
import { DEFAULT_ZOOM } from '../../../common/utils/constants'
import { SearchWidgetStore } from '../core/store'
import { Writable } from 'svelte/store'

export const showPropertiesMarker = (
  map: google.maps.Map,
  storeInstance: SearchWidgetStore,
  searchWidgetStore: Writable<SearchWidgetStore>,
) => {
  const { properties, propertyImages, markers: storeMarkers, selectedProperty, searchType } = storeInstance
  const infoWindows: any[] = []
  const markers: google.maps.Marker[] = []
  if (properties && properties._embedded) {
    // clear current marker from map
    storeMarkers.forEach(marker => marker.setMap(null))
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
      if (newMarker) {
        infoWindows.push(newMarker.infoWindow)
        markers.push(newMarker.marker)
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
