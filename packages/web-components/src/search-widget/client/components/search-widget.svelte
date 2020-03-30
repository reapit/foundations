<script>
  import { onMount, onDestroy } from 'svelte'
  import * as TSDefinitions from '@reapit/foundations-ts-definitions'
  import searchWidgetStore from '../core/store'
  import { generateThemeStyles } from '../../../common/styles/theme'
  import * as Styles from '../../../common/styles/index'
  import SearchForm from './search-form.svelte'
  import GoogleMap from './google-map.svelte'
  import SearchResult from './search-result.svelte'

  export let theme
  export let apiKey

  let properties
  let primaryHeading
  let searchKeyword
  let searchType

  const { resetCSS } = Styles
  const themeStyles = generateThemeStyles(theme)
  const { globalStyles } = themeStyles
  const unsubscribeSearchWidgetStore = searchWidgetStore.subscribe(store => {
    properties = (store.properties && store.properties._embedded) || []
    primaryHeading = store.initializers.theme.primaryHeading
    searchKeyword = store.searchKeyword
    searchType = store.searchType
  })

  onMount(() => {
    searchWidgetStore.update(values => ({
      ...values,
      initializers: {
        theme: themeStyles,
        apiKey,
      },
    }))
  })

  onDestroy(() => {
    unsubscribeSearchWidgetStore()
  })
</script>

<style>
  .search-widget {
    max-width: 1200px;
    margin: 0 auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 1em;
    width: 100%;
  }

  .search-results-heading {
    margin-left: 1em;
    display: block;
    width: 100%;
  }

  .search-results-items {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
</style>

<div class={`${resetCSS} ${globalStyles} search-widget`}>
  <SearchForm />
  <div class="search-results-items">
    {#if properties.length}
      <h2 class={`search-results-heading ${primaryHeading}`}>{properties.length} results for {searchKeyword}, for {searchType.toLowerCase()}</h2>
    {/if}
    {#each properties as property (property.id)}
      <SearchResult {property} />
    {/each}
  </div>
  <GoogleMap />
</div>
