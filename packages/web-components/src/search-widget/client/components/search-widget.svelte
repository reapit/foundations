<script>
  import { onMount, onDestroy } from 'svelte'
  import * as TSDefinitions from '@reapit/foundations-ts-definitions'
  import * as SearchWidgetStore from '../core/store'
  import { generateGlobalTheme } from '../../../common/styles/theme'
  import * as Styles from '../../../common/styles/index'
  import SearchForm from './search-form.svelte'
  import GoogleMap from './google-map.svelte'

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

  const handleItemClick = (property) => {
    searchWidgetStore.update(values => ({
      ...values,
      selectedProperty: property,
    }))
  }
</script>

<style>
  .content {
    display: flex;
    margin-top: 30px;
  }
  .search-results {
    width: 20%;
  }
  .search-results__item {
    padding: 16px;
  }
  .search-results__item:hover {
    background-color: grey;
    color: white;
  }
  .search-results__item--selected {
    border-radius: 4px;
    border: 1px solid blue;
  }
  .map-wrap {
    width: 600px;
    height: 600px;
    margin-left: 20px;
  }
</style>

<div class={resetCSS}>
  <div class={globalCSSTheme}>
    <SearchForm />
    <div class="content">
      <ul class="search-results">
        {#each storeInstance && storeInstance.properties ? storeInstance.properties._embedded : [] as property (property.id)}
          <li on:click={e => handleItemClick(property)}
            class="search-results__item { storeInstance.selectedProperty && storeInstance.selectedProperty.id === property.id ? 'search-results__item--selected' : '' }">{property.id}</li>
        {/each}
      </ul>
      <div class="map-wrap">
        <GoogleMap />
      </div>
    </div>
  </div>
</div>
