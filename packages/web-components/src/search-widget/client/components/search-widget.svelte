<script>
  import { onMount, onDestroy } from 'svelte'
  import searchWidgetStore from '../core/store'
  import { generateThemeClasses, resetCSS } from '../../../common/styles'
  import SearchForm from './search-form.svelte'
  import GoogleMap from './google-map.svelte'
  import SearchResult from './search-result.svelte'
  import Loader from '../../../common/components/loader.svelte'

  export let theme
  export let apiKey
  export let target

  let searchKeyword
  let searchType
  let resultsMessage

  $: isLoading = false
  $: properties = []

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

  .search-widget-heading {
    display: block;
    width: 100%;
    margin-bottom: 0.5em;
  }

  .search-widget-items {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin-bottom: 0.5em;
  }
</style>

<div class={`${resetCSS} ${globalStyles} search-widget`}>
  <SearchForm />
  <div class="search-widget-items">
    {#if properties.length && !isLoading}
      <div class="search-widget-heading">
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
