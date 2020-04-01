<script>
  import { onDestroy } from 'svelte'
  import Fa from 'svelte-fa'
  import { faBed, faToilet } from '@fortawesome/free-solid-svg-icons'
  import searchWidgetStore from '../core/store'
  import { combineAddress, getPrice, combineNumberBedTypeStyle } from '../utils/results-helpers'
  import { INVALID_BACKGROUND_AS_BASE64 } from '../../../common/utils/constants'

  export let property

  let selectedProperty
  let searchType
  let propertyImages
  let themeClasses = {}

  const unsubscribeSearchWidgetStore = searchWidgetStore.subscribe(store => {
    selectedProperty = store.selectedProperty
    searchType = store.searchType
    propertyImages = store.propertyImages
    themeClasses = store.themeClasses
  })

  const {
    primaryHeading,
    secondaryHeading,
    primaryStrapline,
    secondaryStrapline,
    bodyText,
    selectedItem,
    resultItem,
  } = themeClasses

  const id = (property && property.id) || ''
  const propertyImage = propertyImages && propertyImages[id]
  const imageUrl = (propertyImage && propertyImage.url) || INVALID_BACKGROUND_AS_BASE64
  const sellingStatus = (property.selling && property.selling.status) || ''
  const lettingStatus = (property.letting && property.letting.status) || ''

  $: isSelectedProperty = property.id === (selectedProperty && selectedProperty.id) || ''

  const selectProperty = () => {
    searchWidgetStore.update(store => ({
      ...store,
      selectedProperty: property,
    }))
  }

  const handleImageError = source => {
    source.src = INVALID_BACKGROUND_AS_BASE64
    source.target.src = INVALID_BACKGROUND_AS_BASE64
    source.onerror = ''
    return true
  }

  onDestroy(() => {
    unsubscribeSearchWidgetStore()
  })
</script>

<style>
  .search-result-item {
    box-sizing: border-box;
    cursor: pointer;
    padding: 0.5em;
    border: 1px solid transparent;
    border-radius: 0.3em;
  }

  .search-result-item img {
    width: 100%;
    height: 12em;
  }

  .search-result-image-container {
    width: 100%;
    border-radius: 0.3em;
    position: relative;
    overflow: hidden;
    margin-bottom: 0.5em;
  }

  .search-result-offer-flag {
    background: grey;
    text-align: center;
    position: absolute;
    width: 200px;
    padding: 20px;
    top: 30px;
    right: -60px;
    transform: rotate(45deg);
    font-weight: 600;
    color: #fff;
  }

  .search-result-item-address-secondary {
    hyphens: auto;
    display: contents;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 3.6em;
    line-height: 1.2em;
  }

  .search-result-item-pricing-text {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .search-result-item-beds-text {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .search-result-item-description-text {
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    max-width: 700px;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 7em;
    line-height: 1.2em;
  }

  .search-result-item-icon-container {
    display: flex;
    align-items: center;
  }

  .search-result-item-icon {
    margin-right: 0.33em;
  }

  .search-result-item-icon:last-child {
    margin-left: 1em;
  }
</style>

<div
  class={`search-result-item ${resultItem} ${isSelectedProperty ? selectedItem : ''}`}
  data-testid="select-property"
  on:click|preventDefault={selectProperty}>
  <div class="search-result-image-container">
    {#if sellingStatus === 'underOffer'}
      <div class="search-result-offer-flag">Under Offer</div>
    {/if}
    {#if lettingStatus === 'underOffer'}
      <div class="search-result-offer-flag">Let Agreed</div>
    {/if}
    <img alt="property image" src={imageUrl} on:error={handleImageError} />
  </div>
  <div>
    <div class={`${secondaryStrapline} search-result-item-address-secondary`}>
      <div class={`${secondaryHeading} search-result-item-address-primary`}>
        {(property.address && property.address.line1) || ''}
      </div>
      {combineAddress(property.address)}
    </div>
  </div>
  <div class={`${primaryHeading} search-result-item-pricing-text`}>{getPrice(property, searchType)}</div>
  <div class={`${secondaryStrapline} search-result-item-beds-text`}>{combineNumberBedTypeStyle(property)}</div>
  <div class={`${bodyText} search-result-item-description-text`}>{property.description}</div>
  <div class={`${secondaryHeading} search-result-item-icon-container`}>
    <span class="search-result-item-icon">
      <Fa icon={faBed} />
    </span>
    {property.bedrooms || 0}
    <span class="search-result-item-icon">
      <Fa icon={faToilet} />
    </span>
    {property.bathrooms || 0}
  </div>
</div>
