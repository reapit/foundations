<script>
  import { onDestroy } from 'svelte'
  import { getProperties } from '../api/properties'
  import { getPropertyImages } from '../api/property-images'
  import searchWidgetStore from '../core/store'

  let inputValue = ''
  let apiKey = ''
  let themeClasses = {}

  const unsubscribeSearchWidgetStore = searchWidgetStore.subscribe(store => {
    themeClasses = store.themeClasses
  })

  $: input = themeClasses.input
  $: button = themeClasses.button
  $: searchBox = themeClasses.searchBox

  const handleInput = ({ target }) => {
    inputValue = target.value
    searchWidgetStore.update(values => ({
      ...values,
      searchKeyword: inputValue,
    }))
  }

  const handleFetchProperties = async isRental => {
    searchWidgetStore.update(values => ({
      ...values,
      isLoading: true,
      resultsMessage: '',
      properties: null,
      propertyImages: null,
      searchType: isRental ? 'Rent' : 'Sale',
    }))

    const properties = await getProperties(inputValue, isRental, apiKey)

    const propertyImages = await getPropertyImages(properties._embedded, apiKey)

    if (properties) {
      const numberResults = (properties._embedded && properties._embedded.length) || 0
      searchWidgetStore.update(values => ({
        ...values,
        isLoading: false,
        resultsMessage: `${numberResults} result${numberResults === 1 ? '' : 's'} for ${inputValue}, for ${
          isRental ? 'rent' : 'sale'
        }`,
        properties,
      }))
    }

    if (propertyImages) {
      searchWidgetStore.update(values => ({
        ...values,
        propertyImages,
      }))
    }
  }

  onDestroy(() => {
    unsubscribeSearchWidgetStore()
  })
</script>

<style>
  .search-form {
    margin: 1em auto;
    display: flex;
    flex-direction: column;
  }

  .search-button-container {
    display: flex;
    justify-content: space-around;
  }

  .search-button {
    padding: 0.5em;
    transition: all 0.2s ease-in-out;
    width: 50%;
  }

  .search-input {
    padding: 0.5em;
    margin-bottom: 1em;
  }

  .search-button:focus,
  .search-input:focus {
    outline: none;
  }
</style>

<form class={`search-form ${searchBox}`} on:submit|preventDefault on:input|preventDefault={handleInput}>
  <input
    class={`${input} search-input`}
    type="text"
    data-testid="search-input"
    id="search"
    placeholder="Town or Postcode" />
  <div class="search-button-container">
    <button
      class={`${button} search-button`}
      on:click|preventDefault={() => handleFetchProperties(true)}
      data-testid="lettings"
      type="button">
      TO RENT
    </button>
    <button
      class={`${button} search-button`}
      on:click|preventDefault={() => handleFetchProperties(false)}
      data-testid="sales"
      type="button">
      FOR SALE
    </button>
  </div>
</form>
