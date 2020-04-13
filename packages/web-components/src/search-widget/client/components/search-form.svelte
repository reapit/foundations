<script>
  import { getProperties } from '../api/properties'
  import { getPropertyImages } from '../api/property-images'
  import searchWidgetStore from '../core/store'

  let inputValue = ''
  let apiKey = ''

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
      properties: [],
      propertyImages: {},
      selectedMarker: null,
      selectedProperty: null,
      searchType: isRental ? 'Rent' : 'Sale',
    }))

    const properties = await getProperties(inputValue, isRental, apiKey)

    const propertyImages = await getPropertyImages(properties._embedded, apiKey)

    if (properties && properties._embedded.length) {
      const propertiesArray = properties._embedded
      const numberResults = propertiesArray.length
      const resultsMessage = `${numberResults} result${numberResults === 1 ? '' : 's'}${
        inputValue.length ? ` for ${inputValue},` : ''
      } for ${isRental ? 'rent' : 'sale'}`

      searchWidgetStore.update(values => ({
        ...values,
        isLoading: false,
        resultsMessage,
        properties: propertiesArray,
      }))
    }

    if (propertyImages) {
      searchWidgetStore.update(values => ({
        ...values,
        propertyImages,
      }))
    }
  }
</script>

<style>
  .search-form {
    margin: 1em auto;
    display: flex;
    flex-direction: column;
  }

  .search-form-button-container {
    display: flex;
    justify-content: space-around;
  }

  .search-form-button {
    padding: 0.5em;
    transition: all 0.2s ease-in-out;
    width: 50%;
  }

  .search-form-input {
    padding: 0.5em;
    margin-bottom: 1em;
  }

  .search-form-button:focus,
  .search-form-input:focus {
    outline: none;
  }
</style>

<form
  class="search-form {$searchWidgetStore.themeClasses.searchBox}"
  on:submit|preventDefault
  on:input|preventDefault={handleInput}>
  <input
    class="{$searchWidgetStore.themeClasses.input} search-form-input"
    type="text"
    data-testid="search-form-input"
    id="search"
    placeholder="Town or Postcode" />
  <div class="search-form-button-container">
    <button
      class="{$searchWidgetStore.themeClasses.button} search-form-button"
      on:click|preventDefault={() => handleFetchProperties(true)}
      data-testid="lettings"
      type="button">
      TO RENT
    </button>
    <button
      class="{$searchWidgetStore.themeClasses.button} search-form-button"
      on:click|preventDefault={() => handleFetchProperties(false)}
      data-testid="sales"
      type="button">
      FOR SALE
    </button>
  </div>
</form>
