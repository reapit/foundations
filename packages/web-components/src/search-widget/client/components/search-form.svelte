<script>
  import { onDestroy, onMount } from 'svelte'
  import { getProperties } from '../api/properties'
  import { getPropertyImages } from '../api/property-images'
  import searchWidgetStore from '../core/store'

  let inputValue = ''
  let apiKey = ''
  let button = ''
  let input = ''

  const unsubscribeSearchWidgetStore = searchWidgetStore.subscribe(store => {
    apiKey = store.initializers.apiKey
    button = store.initializers.theme.button
    input = store.initializers.theme.input
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

  onMount(() => {
    inputValue = 'london'

    handleFetchProperties(false)
  })

  onDestroy(() => {
    unsubscribeSearchWidgetStore()
  })
</script>

<style>
  .search-form {
    width: 20em;
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

  .search-button:focus, .search-input:focus {
    outline: none;
  }

</style>

<form class="search-form" on:submit|preventDefault on:input|preventDefault={handleInput}>
  <input class={`${input} search-input`} type="text" data-testid="search-input" id="search" placeholder="Town or Postcode" />
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
