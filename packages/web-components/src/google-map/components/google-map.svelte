<script lang="typescript">
  import { onMount, createEventDispatcher } from 'svelte'
  import store from '../core/store'
  import GoogleMapLoader from './google-map-loader.svelte'
  import * as Styles from '../../common/styles'

  const dispatch = createEventDispatcher()
  const { resetCSS } = Styles

  export let apiKey: string = ''
  export let libraries: string = 'places'
  export let center = null
  export let zoom = 10
  export let onLoaded = null

  let mapElement
  let map

  const initialise = () => {
    setTimeout(() => {
      const google = window['google']
      map = new google.maps.Map(mapElement, {
        center: center,
        zoom: zoom,
      })
      new google.maps.Marker({ position: center, map: map })
      onLoaded && onLoaded()
    }, 1)
  }
</script>

<style>
  .map-wrap {
    height: 100vh;
    width: 100%;
  }
</style>

<div class={resetCSS}>
  <GoogleMapLoader {apiKey} {libraries} on:ready={initialise} />
  <div class="map-wrap" bind:this={mapElement} />
</div>
