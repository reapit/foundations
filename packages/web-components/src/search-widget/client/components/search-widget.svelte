<script>
  import { onMount, onDestroy } from 'svelte'
  import * as TSDefinitions from '@reapit/foundations-ts-definitions'
  import * as SearchWidgetStore from '../core/store'
  import { generateGlobalTheme } from '../../../common/styles/theme'
  import * as Styles from '../../../common/styles/index'
  import SearchForm from './search-form.svelte'
  import GoogleMap from './google-map.svelte'
  import SearchResult from './search-result.svelte'

  export let theme = {}
  export let apiKey = ''

  let storeInstance

  const searchWidgetStore = SearchWidgetStore.default
  const { resetCSS } = Styles
  const globalCSSTheme = generateGlobalTheme(theme)
  const unsubscribeSearchWidgetStore = searchWidgetStore.subscribe(store => {
    storeInstance = store
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
  .content {
    display: flex;
    flex-direction: column;
    margin: 30px auto;
    width: 70%;
  }

  .search-results-items {
    display: flex;
    width: 100%;
    flex-direction: column;
  }

  .search-results-items div {
    padding-bottom: 2.5rem;
    box-sizing: border-box;
  }

  .map-wrap {
    width: 100%;
    height: 600px;
    margin-left: 20px;
  }
</style>

<div class={resetCSS}>
  <div class={globalCSSTheme}>
    <div class="content">
      <SearchForm />
      <div class="search-results-items">
        {#each storeInstance && storeInstance.properties ? storeInstance.properties._embedded : [] as property (property.id)}
          <SearchResult {property} />
        {/each}
      </div>
      <div class="map-wrap">
        <GoogleMap />
      </div>
    </div>
  </div>
</div>
