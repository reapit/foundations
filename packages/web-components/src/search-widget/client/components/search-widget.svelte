<script lang="typescript">
  import { onMount, onDestroy } from 'svelte'
  import searchWidgetStore from '../core/store'
  import { generateGlobalTheme } from '../../../common/styles/theme'
  import * as Styles from '../../../common/styles/index'
  import SearchForm from './search-form.svelte'
  import GoogleMap from './google-map.svelte'

  export let theme: Styles.InitializerTheme = {}
  export let apiKey: string = ''

  const { resetCSS } = Styles
  const globalCSSTheme = generateGlobalTheme(theme)
  const unsubscribeSearchWidgetStore = searchWidgetStore.subscribe(store => {
    console.log(store)
  })

  onMount(() => {
    searchWidgetStore.update(values => ({
      ...values,
      initializers: {
        theme,
        apiKey,
      },
    }))
  })

  onDestroy(() => {
    unsubscribeSearchWidgetStore()
  })
</script>

<style>
  .map-wrap {
    width: 600px;
    height: 600px;
    margin-bottom: 30px;
    margin-top: 30px;
  }
</style>

<div class={resetCSS}>
  <div class={globalCSSTheme}>
    <SearchForm />
    <div class="map-wrap">
      <GoogleMap />
    </div>
  </div>
</div>
