<script>
  import { onDestroy } from 'svelte'
  import { getProperties } from '../api/properties'
  import { getPropertyImages } from '../api/property-images'
  import searchWidgetStore from '../core/store'

  let inputValue = ''
  let apiKey = ''

  const unsubscribeSearchWidgetStore = searchWidgetStore.subscribe(store => {
    apiKey = store.initializers.apiKey
  })

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
      searchType: isRental ? 'Rent' : 'Sale',
    }))

    const properties = await getProperties(inputValue, isRental, apiKey)

    const propertyImages = await getPropertyImages(properties._embedded, apiKey)

    if (properties) {
      searchWidgetStore.update(values => ({
        ...values,
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
  form.search-form {
    margin: 30px auto;
  }
</style>

<form class="search-form" on:submit|preventDefault on:input|preventDefault={handleInput}>
  <input type="text" data-testid="search-input" id="search" />
  <button on:click|preventDefault={() => handleFetchProperties(true)} data-testid="lettings" type="button">
    For rent
  </button>
  <button on:click|preventDefault={() => handleFetchProperties(false)} data-testid="sales" type="button">
    For sale
  </button>
</form>
