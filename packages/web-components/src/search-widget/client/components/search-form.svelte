<script>
  import { getProperties } from '../api/properties'
  import { getPropertyImages } from '../api/property-images'
  import searchWidgetStore from '../core/store'
  import { calculateTotalPage, getResultMessage } from '../utils/results-helpers'

  let searchKeyword = ''

  const handleInput = ({ target }) => {
    searchKeyword = target.value
    searchWidgetStore.update(values => ({
      ...values,
      searchKeyword: searchKeyword,
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
    const properties = await getProperties(
      searchKeyword,
      isRental,
      $searchWidgetStore.initializers.apiKey,
      $searchWidgetStore.pageNumber
    )
    const propertyImages = await getPropertyImages(
      properties._embedded,
      $searchWidgetStore.initializers.apiKey
    )
    if (properties && properties._embedded.length) {
      const resultsMessage = getResultMessage({ properties, searchKeyword, isRental })
      const totalPage = calculateTotalPage(properties.totalCount)
      searchWidgetStore.update(values => ({
        ...values,
        isLoading: false,
        resultsMessage,
        properties: properties._embedded,
        totalPage,
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
