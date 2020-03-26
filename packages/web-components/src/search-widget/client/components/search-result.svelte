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

  const unsubscribeSearchWidgetStore = searchWidgetStore.subscribe(store => {
    selectedProperty = store.selectedProperty
    searchType = store.searchType
    propertyImages = store.propertyImages
  })

  const id = (property && property.id) || ''
  const propertyImage = propertyImages && propertyImages[id]
  const imageUrl = (propertyImage && propertyImage.url) || INVALID_BACKGROUND_AS_BASE64
  const sellingStatus = (property.selling && property.selling.status) || ''
  const lettingStatus = (property.letting && property.letting.status) || ''
  const selectedPropertyId = (selectedProperty && selectedProperty.id) || ''
  const isSelectedProperty = property.id === selectedPropertyId

  const selectProperty = () => {
    searchWidgetStore.update(store => ({
      ...store,
      selectedProperty: property,
    }))
  }

  onDestroy(() => {
    unsubscribeSearchWidgetStore()
  })
</script>

<style>
  .result-item {
    cursor: pointer;
  }

  .result-image-container {
    border: 0px solid grey;
    margin-top: 0px;
    width: 100%;
    border-radius: 5px;
    position: relative;
    overflow: hidden;
  }

  .result-image-container.selected {
    border-width: 2px;
  }

  .result-offer-flag {
    background: grey;
    text-align: center;
    position: absolute;
    width: 200px;
    padding: 20px;
    top: 30px;
    right: -60px;
    transform: rotate(45deg);
    font-size: 1rem;
    font-weight: 600;
    color: #fff;
  }

  .result-item-address-primary {
    font-size: 18px;
    font-weight: bold;
    margin-right: 5px;
  }

  .result-item-address-secondary {
    hyphens: auto;
    display: contents;
    color: grey;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 65px;
    line-height: 22px;
    font-size: 18px;
  }

  .result-item-pricing-text {
    color: grey;
    font-size: 24px;
    font-weight: bold;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .result-item-beds-text {
    font-weight: bold;
    font-size: 18px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .result-item-description-text {
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    max-width: 700px;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 130px;
    font-size: 16px;
    line-height: 22px;
  }

  .result-item-icon-container {
    color: grey;
    display: flex;
    align-items: center;
  }

  .result-item-icon {
    margin-right: 0.3rem;
  }

  .result-item-icon:last-child {
    margin-left: 1rem;
  }
</style>

<div class="result-item" data-testid="select-property" on:click|preventDefault={selectProperty}>
  <div class="result-image-container {isSelectedProperty ? 'selected' : ''}">
    {#if sellingStatus === 'underOffer'}
      <div class="result-offer-flag">Under Offer</div>
    {/if}
    {#if lettingStatus === 'underOffer'}
      <div class="result-offer-flag">Let Agreed</div>
    {/if}
    <img alt="property image" src={imageUrl} />
  </div>
  <div>
    <div class="result-item-address-secondary">
      <div class="result-item-address-primary">{(property.address && property.address.line1) || ''}</div>
      {combineAddress(property.address)}
    </div>
  </div>
  <div class="result-item-pricing-text">{getPrice(property, searchType)}</div>
  <div class="result-item-beds-text">{combineNumberBedTypeStyle(property)}</div>
  <div class="result-item-description-text">{property.description}</div>
  <div class="result-item-icon-container">
    <span class="result-item-icon">
      <Fa icon={faBed} />
    </span>
    {property.bedrooms || 0}
    <span class="result-item-icon">
      <Fa icon={faToilet} />
    </span>
    {property.bathrooms || 0}
  </div>
</div>
