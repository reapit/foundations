<script>
  import { onMount, onDestroy } from 'svelte'
  import searchWidgetStore from '../core/store'
  import { generateThemeClasses } from '../../../common/styles/theme'
  import * as Styles from '../../../common/styles/index'
  import SearchForm from './search-form.svelte'
  import GoogleMap from './google-map.svelte'
  import SearchResult from './search-result.svelte'
  import Loader from './loader.svelte'

  export let theme
  export let apiKey
  export let target

  let searchKeyword
  let searchType
  let resultsMessage

  $: isLoading = false
  $: properties = []

  const { resetCSS } = Styles
  const themeClasses = generateThemeClasses(theme, target)
  const { globalStyles, primaryHeading } = themeClasses

  const unsubscribeSearchWidgetStore = searchWidgetStore.subscribe(store => {
    properties = (store.properties && store.properties._embedded) || []
    searchKeyword = store.searchKeyword
    searchType = store.searchType
    isLoading = store.isLoading
    resultsMessage = store.resultsMessage
  })

  onMount(() => {
    searchWidgetStore.update(values => ({
      ...values,
      initializers: {
        theme,
        apiKey,
        target,
      },
      themeClasses,
    }))
  })

  onDestroy(() => {
    unsubscribeSearchWidgetStore()
  })
</script>

<style>
  .search-widget {
    margin: 0 auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 1em;
    width: 100%;
  }

  .search-results-heading {
    display: block;
    width: 100%;
    margin-bottom: 0.5em;
  }

  .search-results-items {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin-bottom: 0.5em;
  }
</style>

<div class={`${resetCSS} ${globalStyles} search-widget`}>
  <SearchForm />
  <div class="search-results-items">
    {#if properties.length && !isLoading}
      <div class="search-results-heading">
        <h2 class={`${primaryHeading}`}>{resultsMessage}</h2>
      </div>
    {/if}
    {#if isLoading}
      <Loader />
    {/if}
    {#each properties as property (property.id)}
      <SearchResult {property} />
    {/each}
  </div>
  <GoogleMap />
</div>
