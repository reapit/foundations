import { writable, Writable } from 'svelte/store'
import { GoogleMapWidgeInitializers } from './index'

export interface GoogleMapWidgetStore {
  initializers: GoogleMapWidgeInitializers
}

const googleMapWidgetStore: Writable<GoogleMapWidgetStore> = writable({
  initializers: {
    apiKey: '',
  },
})

export default googleMapWidgetStore

export const mapLoaded = writable<boolean>(false)
export const mapLoading = writable<boolean>(false)
