<script>
  import LightBox from './light-box/light-box.svelte'
  import { onDestroy, onMount } from 'svelte'
  import { link } from 'svelte-routing'
  import Fa from 'svelte-fa'
  import { faBed, faToilet } from '@fortawesome/free-solid-svg-icons'
  import Loader from '../../../common/components/loader.svelte'
  import searchWidgetStore from '../core/store'
  import { generateThemeClasses } from '../../../common/styles'
  import { combineAddress, getPrice, combineNumberBedTypeStyle } from '../utils/results-helpers'
  import { handleImageError } from '../utils/image-helpers'
  import { INVALID_BACKGROUND_AS_BASE64 } from '../../../common/utils/constants'
  import { getProperty } from '../api/property'

  export let propertyId
  export let theme
  export let apiKey
  export let parentSelector

  let property = {}
  let searchType
  let propertyImagesByPropertyId
  let transformedPropertyImages = []
  let sellingStatus = ''
  let lettingStatus = ''
  let loading = false
  let error = false

  const themeClasses = generateThemeClasses(theme, parentSelector)
  const { primaryHeading, secondaryHeading, secondaryStrapline, bodyText, offerBanner } = themeClasses

  const unsubscribeSearchWidgetStore = searchWidgetStore.subscribe(store => {
    searchType = store.searchType

    propertyImagesByPropertyId = store.propertyImagesByPropertyId
  })

  const loadProperty = async propertyId => {
    try {
      loading = true
      property = await getProperty({ apiKey, propertyId })
      loading = false
      if (property) {
        const propertyImages = (propertyImagesByPropertyId && propertyImagesByPropertyId[propertyId]) || []
        transformedPropertyImages = propertyImages.map(propertyImage => propertyImage.url)
        sellingStatus = (property.selling && property.selling.status) || ''
        lettingStatus = (property.letting && property.letting.status) || ''
      } else {
        error = true
      }
    } catch (error) {
      console.error(error)
      loading = false
    }
  }

  onMount(() => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
    window.ReapitViewingBookingComponent &&
      new window.ReapitViewingBookingComponent({
        theme: window.theme,
        apiKey: '',
        parentSelector: '#appointment-bookings-viewing',
        variant: 'VIEWING',
        propertyId,
      })

    loadProperty(propertyId)
  })

  onDestroy(() => {
    unsubscribeSearchWidgetStore()
  })
</script>

<style>
  .property-detail-item {
    box-sizing: border-box;
    padding: 0.5em;
    border: 1px solid transparent;
    border-radius: 0.3em;
    position: absolute;
  }

  .property-detail-item img {
    width: 100%;
    height: 12em;
  }

  .property-detail-image-container {
    width: 100%;
    border-radius: 0.3em;
    position: relative;
    overflow: hidden;
    margin-bottom: 0.5em;
  }

  .property-detail-offer-banner {
    text-align: center;
    position: absolute;
    width: 12.5em;
    padding: 1.2em;
    top: 2em;
    right: -3.75em;
    transform: rotate(45deg);
    font-weight: 600;
  }

  .property-detail-item-address-secondary {
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

  .property-detail-item-pricing-text {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .property-detail-item-beds-text {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .property-detail-item-description-text {
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    max-width: 700px;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 7em;
    line-height: 1.2em;
  }

  .property-detail-item-icon-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .property-detail-item-icon {
    margin-right: 0.33em;
  }

  .property-detail-item-icon:last-child {
    margin-left: 1em;
  }

  .property-detail-light-box-container {
    width: 1000px;
  }

  .back-link {
    display: block;
    padding-bottom: 1em;
  }
</style>

{#if loading}
  <Loader />
{:else if !loading && error}
  <a use:link data-testid="btn-back" class="back-link {secondaryHeading}" href="/">Back to results</a>
  <div class={primaryHeading}>No Property Found</div>
{:else}
  <div class="property-detail-item" data-testid="select-property-detail">
    <a use:link data-testid="btn-back" class="back-link {secondaryHeading}" href="/">Back to results</a>
    <div class="property-detail-image-container">
      {#if sellingStatus === 'underOffer'}
        <div class="property-detail-offer-banner {offerBanner}">Under Offer</div>
      {/if}
      {#if lettingStatus === 'underOffer'}
        <div class="property-detail-offer-banner {offerBanner}">Let Agreed</div>
      {/if}

      {#if !transformedPropertyImages || transformedPropertyImages.length === 0}
        <img alt="property-detail image" src={INVALID_BACKGROUND_AS_BASE64} on:error={handleImageError} />
      {:else}
        <div class="property-detail-light-box-container">
          <LightBox images={transformedPropertyImages} />
        </div>
      {/if}
    </div>
    <div>
      <div class="{secondaryStrapline} property-detail-item-address-secondary">
        <div class="{secondaryHeading} property-detail-item-address-primary">
          {(property && property.address && property.address.line1) || ''}
        </div>
        {property && combineAddress(property.address)}
      </div>
    </div>
    <div class="{primaryHeading} property-detail-item-pricing-text">{getPrice(property, searchType)}</div>
    <div class="{secondaryStrapline} property-detail-item-beds-text">{combineNumberBedTypeStyle(property)}</div>
    <div class="{bodyText} property-detail-item-description-text">{property.description}</div>
    <div class="{secondaryHeading} property-detail-item-icon-container">
      <div>
        <span class="property-detail-item-icon">
          <Fa icon={faBed} />
        </span>
        {property.bedrooms || 0}
        <span class="property-detail-item-icon">
          <Fa icon={faToilet} />
        </span>
        {property.bathrooms || 0}
      </div>
    </div>
    <div id="appointment-bookings-viewing" />
  </div>
{/if}
