<script>
  import { slide } from 'svelte/transition'
  import { cubicInOut } from 'svelte/easing'
  import Fa from 'svelte-fa'
  import { faSearch } from '@fortawesome/free-solid-svg-icons'
  import { getProperties } from '../api/properties'
  import { getPropertyImages } from '../api/property-images'
  import searchWidgetStore from '../core/store'
  import { calculateTotalPage } from '../utils/results-helpers'
  import {
    minNumOfBedrooms,
    maxNumOfBedrooms,
    orderByPrices,
    propertyTypes,
    addedInTimes,
    getMinPriceRange,
    getMaxPriceRange,
    getResultMessage,
  } from '../utils/search-helper'

  let searchKeyword = ''
  let currentPage = 1
  let showAdvancedSearch = false
  let searchType = 'Sale'
  let minBedroom = 0
  let maxBedroom = 0
  let orderPrice = '-price'
  let propertyType = ''
  let addedIn = ''
  let minPrice = 0
  let maxPrice = 0

  const handleInput = ({ target }) => {
    searchKeyword = target.value
    searchWidgetStore.update(values => ({
      ...values,
      searchKeyword: searchKeyword,
    }))
  }

  const handleFetchProperties = async () => {
    const isRental = searchType === 'Rent'

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
    const properties = await getProperties({
      apiKey: $searchWidgetStore.initializers.apiKey,
      pageNumber: $searchWidgetStore.pageNumber,
      keywords: searchKeyword,
      isRental,
      bedroomsFrom: minBedroom,
      bedroomsTo: maxBedroom,
      priceFrom: minPrice,
      priceTo: maxPrice,
      sortBy: orderPrice,
      propertyType,
      addedIn,
    })
    const propertyImagesByPropertyId = await getPropertyImages(
      properties._embedded,
      $searchWidgetStore.initializers.apiKey,
    )
    // hide advanced search
    showAdvancedSearch = false

    if (properties && properties._embedded.length) {
      const resultsMessage = getResultMessage({
        properties,
        searchKeyword,
        searchType,
        minBeds: minBedroom,
        maxBeds: maxBedroom,
        minPrice,
        maxPrice,
        orderBy: orderPrice,
        propertyType,
        addedIn,
      })
      const totalPage = calculateTotalPage(properties.totalCount)
      searchWidgetStore.update(values => ({
        ...values,
        isLoading: false,
        resultsMessage,
        properties: properties._embedded,
        totalPage,
      }))
    }
    if (propertyImagesByPropertyId) {
      searchWidgetStore.update(values => ({
        ...values,
        propertyImagesByPropertyId,
      }))
    }
  }

  const toggleAdvancedSearch = () => {
    showAdvancedSearch = !showAdvancedSearch
  }

  $: if ($searchWidgetStore.pageNumber !== currentPage) {
    currentPage = $searchWidgetStore.pageNumber
    handleFetchProperties()
  }
</script>

<style>
  .search-form {
    margin: 1em auto;
    display: flex;
    flex-direction: column;
  }

  .search-form-button {
    padding: 0.5em;
    transition: all 0.2s ease-in-out;
    border-left: 1px;
  }

  .search-form-input {
    padding: 0.5em;
    margin-bottom: 1em;
  }

  .search-form-button:focus,
  .search-form-input:focus {
    outline: none;
  }

  .search-form-control {
    margin-top: 8px;
    text-align: left;
    font-size: 1rem;
  }

  .search-form-control-radio {
    cursor: pointer;
    display: inline-block;
    line-height: 1.25;
  }

  .search-form-advanced-search {
    background: none;
    border: none;
    outline: none;
    float: right;
    cursor: pointer;
  }

  @media screen and (min-width: 560px) {
    .filter-form-container {
      display: flex;
      margin-left: -0.5rem;
      margin-right: -0.5rem;
    }

    .filter-form-column {
      flex: 1;
      margin-top: 0;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }
  }

  .filter-form-container {
    transition: max-height 0.2s ease-out;
  }

  .filter-form-input-container:not(:first-child) {
    margin-top: 1rem;
  }

  .filter-form-input-container legend,
  .filter-form-input-container label {
    display: block;
    text-align: center;
  }

  .filter-form-input-container-body {
    margin-top: 0.5rem;
  }

  .filter-form-input-container-body > select {
    width: 100%;
  }

  .filter-form-input-container-body-horizontal {
    display: flex;
    justify-content: space-between;
  }

  .filter-form-input-container-body-horizontal > select {
    width: 46%;
  }
  .filter-form-column {
    margin-top: 1rem;
  }
</style>

<form on:submit|preventDefault>
  <div class="search-form {$searchWidgetStore.themeClasses.searchBox}">
    <input
      on:input|preventDefault={handleInput}
      class="{$searchWidgetStore.themeClasses.input} search-form-input"
      type="text"
      data-testid="search-form-input"
      id="search"
      placeholder="Town or Postcode" />

    <button
      class="{$searchWidgetStore.themeClasses.button} search-form-button"
      on:click|preventDefault={() => handleFetchProperties()}
      data-testid="btnSearch"
      type="button">
      Search Properties
    </button>
    <div class="search-form-control">
      <label class="{$searchWidgetStore.themeClasses.bodyText} search-form-control-radio">
        <input data-testid="sales" type="radio" name="searchType" bind:group={searchType} value="Sale" />
        For sell
      </label>
      <label class="{$searchWidgetStore.themeClasses.bodyText} search-form-control-radio">
        <input data-testid="lettings" type="radio" name="searchType" bind:group={searchType} value="Rent" />
        To rent
      </label>
      <button
        type="button"
        data-testid="btnAdvancedSearch"
        on:click={toggleAdvancedSearch}
        class="{$searchWidgetStore.themeClasses.bodyText} search-form-advanced-search">
        Advanced Search
        <Fa icon={faSearch} />
      </button>
    </div>
  </div>
  {#if showAdvancedSearch}
    <div
      data-testid="advanced-search-container"
      transition:slide={{ duration: 300, easing: cubicInOut }}
      class="filter-form-container">
      <div class="filter-form-column">
        <div class="filter-form-input-container">
          <legend>Bedrooms</legend>
          <div class="filter-form-input-container-body filter-form-input-container-body-horizontal">
            <select bind:value={minBedroom} class={$searchWidgetStore.themeClasses.input}>
              {#each minNumOfBedrooms as numOfBedroom}
                <option
                  disabled={numOfBedroom.value != 0 && numOfBedroom.value >= maxBedroom && maxBedroom != 0}
                  value={numOfBedroom.value}>
                  {numOfBedroom.label}
                </option>
              {/each}
            </select>
            <select bind:value={maxBedroom} class={$searchWidgetStore.themeClasses.input}>
              {#each maxNumOfBedrooms as numOfBedroom}
                <option
                  disabled={numOfBedroom.value != 0 && numOfBedroom.value <= minBedroom && minBedroom != 0}
                  value={numOfBedroom.value}>
                  {numOfBedroom.label}
                </option>
              {/each}
            </select>
          </div>
        </div>

        <div class="filter-form-input-container">
          <label for="orderResultsBy">Order Results By</label>
          <div class="filter-form-input-container-body">
            <select bind:value={orderPrice} class={$searchWidgetStore.themeClasses.input}>
              {#each orderByPrices as orderByPrice}
                <option value={orderByPrice.value}>{orderByPrice.label}</option>
              {/each}
            </select>
          </div>
        </div>
      </div>
      <div class="filter-form-column">
        <div class="filter-form-input-container">
          <label for="propertyType">Property Type</label>
          <div class="filter-form-input-container-body">
            <select bind:value={propertyType} class={$searchWidgetStore.themeClasses.input}>
              {#each propertyTypes as propertyType}
                <option value={propertyType.value}>{propertyType.label}</option>
              {/each}
            </select>
          </div>
        </div>

        <div class="filter-form-input-container">
          <label for="addedIn">Added in</label>
          <div class="filter-form-input-container-body">
            <select bind:value={addedIn} class={$searchWidgetStore.themeClasses.input}>
              {#each addedInTimes as addedInTime}
                <option value={addedInTime.value}>{addedInTime.label}</option>
              {/each}
            </select>
          </div>
        </div>
      </div>
      <div class="filter-form-column">
        <div class="filter-form-input-container">
          <legend>Price</legend>
          <div class="filter-form-input-container-body filter-form-input-container-body-horizontal">
            <select bind:value={minPrice} class={$searchWidgetStore.themeClasses.input}>
              {#each getMinPriceRange() as minPrice}
                <option
                  disabled={minPrice.value != 0 && minPrice.value >= maxPrice && maxPrice != 0}
                  value={minPrice.value}>
                  {minPrice.label}
                </option>
              {/each}
            </select>
            <select bind:value={maxPrice} class={$searchWidgetStore.themeClasses.input}>
              {#each getMaxPriceRange() as maxPrice}
                <option
                  disabled={maxPrice.value != 0 && maxPrice.value <= minPrice && minPrice != 0}
                  value={maxPrice.value}>
                  {maxPrice.label}
                </option>
              {/each}
            </select>
          </div>
        </div>
      </div>
    </div>
  {/if}
</form>
