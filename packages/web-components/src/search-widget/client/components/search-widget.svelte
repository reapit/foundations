<script>
  import { onMount } from 'svelte'
  import searchWidgetStore from '../core/store'
  import { generateThemeClasses, resetCSS } from '../../../common/styles'
  import SearchForm from './search-form.svelte'
  import GoogleMap from './google-map.svelte'
  import SearchResult from './search-result.svelte'
  import Loader from '../../../common/components/loader.svelte'
  import Pagination from './pagination.svelte'

  export let theme
  export let apiKey
  export let customerId
  export let parentSelector
  export let detailPageUrl

  const themeClasses = generateThemeClasses(theme, parentSelector)
  const { globalStyles, primaryHeading } = themeClasses

  onMount(() => {
    searchWidgetStore.update(values => ({
      ...values,
      initializers: {
        theme,
        apiKey,
        customerId,
        parentSelector,
        detailPageUrl,
      },
      themeClasses,
    }))
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
    margin-top: 1em;
    margin-bottom: 0.5em;
  }

  .search-widget-items-container {
    display: flex;
    position: relative;
  }

  .search-widget-items {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin-bottom: 0.5em;
  }
</style>

<div class="{resetCSS} {globalStyles} search-widget">
  <SearchForm />
  <div class="search-widget-items-container">
    <div class="search-widget-items">
      {#if $searchWidgetStore.properties.length && !$searchWidgetStore.isLoading}
        <div class="search-widget-heading">
          <h2 class={primaryHeading}>{$searchWidgetStore.resultsMessage}</h2>
        </div>
      {/if}
      {#if $searchWidgetStore.isLoading}
        <Loader />
      {/if}
      {#each $searchWidgetStore.properties as property (property.id)}
        <SearchResult {property} />
      {/each}
      {#if $searchWidgetStore.properties.length > 0 && !$searchWidgetStore.isLoading}
        <Pagination />
      {/if}
    </div>
    <GoogleMap {theme} />
  </div>
</div>
