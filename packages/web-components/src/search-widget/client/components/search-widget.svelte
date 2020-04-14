<script>
  import { onMount } from 'svelte'
  import searchWidgetStore from '../core/store'
  import { generateThemeClasses, resetCSS } from '../../../common/styles'
  import SearchForm from './search-form.svelte'
  import GoogleMap from './google-map.svelte'
  import SearchResult from './search-result.svelte'
  import PropertyDetail from './property-detail.svelte'
  import Loader from '../../../common/components/loader.svelte'

  export let theme
  export let apiKey
  export let parentSelector

  const themeClasses = generateThemeClasses(theme, parentSelector)
  const { globalStyles, primaryHeading } = themeClasses
  let selectedProperty = null

  const handleItemClick = event => {
    selectedProperty = event.detail.property
  }

  const handleBackToResults = () => {
    selectedProperty = null
  }

  onMount(() => {
    searchWidgetStore.update(values => ({
      ...values,
      initializers: {
        theme,
        apiKey,
        parentSelector,
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
    {#if selectedProperty}
      <PropertyDetail property={selectedProperty} on:back={handleBackToResults} />
    {:else}
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
          <SearchResult {property} on:propertyClick={handleItemClick} />
        {/each}
      </div>
    {/if}
    <GoogleMap {theme} />
  </div>
</div>
