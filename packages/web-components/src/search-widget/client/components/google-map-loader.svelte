<script lang="typescript">
  import { onMount, createEventDispatcher } from 'svelte'
  import { mapLoaded, mapLoading } from '../core/store'
  import { loader } from '../../../common/utils/loader'

  const dispatch = createEventDispatcher()

  export let apiKey: string = ''
  export let libraries: string = 'places'

  $: {
    if ($mapLoaded) dispatch('ready')
  }

  onMount(() => {
    window.onMapReady = () => {
      mapLoaded.set(true)
      delete window['onMapReady']
    }

    if ($mapLoaded) {
      dispatch('ready')
    }

    if (!$mapLoading) {
      const url = [
        '//maps.googleapis.com/maps/api/js?',
        apiKey ? `key=${apiKey}&` : '',
        `libraries=${libraries}&callback=onMapReady`,
      ].join('')
      mapLoading.set(true)

      loader(url, () => {
        return $mapLoaded
      })
    }
  })
</script>
