<script>
  import { onDestroy, onMount } from 'svelte'
  import { createEventDispatcher } from 'svelte'
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
    offerBanner,
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

  const dispatch = createEventDispatcher()

  const handleBack = () => {
    dispatch('back')
  }

  onMount(() => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  })

  onDestroy(() => {
    unsubscribeSearchWidgetStore()
  })
</script>

<style>
  .property-item {
    box-sizing: border-box;
    cursor: pointer;
    padding: 0.5em;
    border: 1px solid transparent;
    border-radius: 0.3em;
  }

  .property-item img {
    width: 100%;
    height: 12em;
  }

  .property-image-container {
    width: 100%;
    border-radius: 0.3em;
    position: relative;
    overflow: hidden;
    margin-bottom: 0.5em;
  }

  .property-offer-banner {
    text-align: center;
    position: absolute;
    width: 12.5em;
    padding: 1.2em;
    top: 2em;
    right: -3.75em;
    transform: rotate(45deg);
    font-weight: 600;
  }

  .property-item-address-secondary {
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

  .property-item-pricing-text {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .property-item-beds-text {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .property-item-description-text {
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    max-width: 700px;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 7em;
    line-height: 1.2em;
  }

  .property-item-icon-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .property-item-icon {
    margin-right: 0.33em;
  }

  .property-item-icon:last-child {
    margin-left: 1em;
  }
</style>

<div class="property-item" data-testid="select-property">
  <a data-testid="btn-back" class={secondaryHeading} on:click|preventDefault={handleBack} href="/">Back to results</a>
  <div class="property-image-container">
    {#if sellingStatus === 'underOffer'}
      <div class="property-offer-banner {offerBanner}">Under Offer</div>
    {/if}
    {#if lettingStatus === 'underOffer'}
      <div class="property-offer-banner {offerBanner}">Let Agreed</div>
    {/if}
    <img alt="property image" src={imageUrl} on:error={handleImageError} />
  </div>
  <div>
    <div class="{secondaryStrapline} property-item-address-secondary">
      <div class="{secondaryHeading} property-item-address-primary">
        {(property.address && property.address.line1) || ''}
      </div>
      {combineAddress(property.address)}
    </div>
  </div>
  <div class="{primaryHeading} property-item-pricing-text">{getPrice(property, searchType)}</div>
  <div class="{secondaryStrapline} property-item-beds-text">{combineNumberBedTypeStyle(property)}</div>
  <div class="{bodyText} property-item-description-text">{property.description}</div>
  <div class="{secondaryHeading} property-item-icon-container">
    <div>
      <span class="property-item-icon">
        <Fa icon={faBed} />
      </span>
      {property.bedrooms || 0}
      <span class="property-item-icon">
        <Fa icon={faToilet} />
      </span>
      {property.bathrooms || 0}
    </div>
  </div>
</div>
