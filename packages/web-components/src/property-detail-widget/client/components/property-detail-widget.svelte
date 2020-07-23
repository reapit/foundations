<script lang="ts">
  import { generateThemeClasses } from '../../../common/styles'
  import { onMount, afterUpdate } from 'svelte'
  import Fa from 'svelte-fa'
  import { faBed, faToilet } from '@fortawesome/free-solid-svg-icons'
  import { getProperty } from '../../../search-widget/client/api/property'
  import Loader from '../../../common/components/loader.svelte'
  import { INVALID_BACKGROUND_AS_BASE64 } from '../../../common/utils/constants'
  import { handleImageError } from '../../../search-widget/client/utils/image-helpers'
  import {
    combineAddress,
    getPrice,
    combineNumberBedTypeStyle,
  } from '../../../search-widget/client/utils/results-helpers'
  import LightBox from '../../../search-widget/client/components/light-box/light-box.svelte'
  import { parseQueryString } from '../../../common/utils/parse-query-string'

  export let theme
  export let apiKey
  export let customerId
  export let parentSelector

  const params = parseQueryString(window.location.search)
  let propertyId = params['id']
  let searchType = params['searchType']
  let property = {}
  let propertyImageUrls = params['propertyImageUrls'] || ''
  let transformedPropertyImages = []
  let sellingStatus = ''
  let lettingStatus = ''
  let loading = false
  let error = false

  const themeClasses = generateThemeClasses(theme, parentSelector)
  const { primaryHeading, secondaryHeading, secondaryStrapline, bodyText, offerBanner } = themeClasses

  const loadProperty = async propertyId => {
    try {
      loading = true
      property = await getProperty({ apiKey, customerId, propertyId })
      loading = false
      if (property) {
        transformedPropertyImages = propertyImageUrls.split(',')
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
    loadProperty(propertyId)
  })

  let bookViewingComponentSelector = '#book-viewing-widget'

  /*Render the view-booking component*/
  afterUpdate(() => {
    /*
      If something strange happen and document.querySelector(bookViewingComponentSelector) is undefined
      The view booking componen will render in the body element, and stay there forever!?
    */
    if (!loading && !error && document.querySelector(bookViewingComponentSelector)) {
      new window.ReapitBookViewingWidget({
        theme,
        apiKey,
        customerId,
        parentSelector: bookViewingComponentSelector,
        variant: 'VIEWING',
        propertyId,
      })
    }
  })
</script>

<style>
  .property-detail-widget-item {
    box-sizing: border-box;
    padding: 0.5em;
    border: 1px solid transparent;
    border-radius: 0.3em;
    position: absolute;
  }

  .property-detail-widget-item img {
    width: 100%;
    height: 12em;
  }

  .property-detail-widget-image-container {
    width: 100%;
    border-radius: 0.3em;
    position: relative;
    overflow: hidden;
    margin-bottom: 0.5em;
  }

  .property-detail-widget-offer-banner {
    text-align: center;
    position: absolute;
    width: 12.5em;
    padding: 1.2em;
    top: 2em;
    right: -3.75em;
    transform: rotate(45deg);
    font-weight: 600;
  }

  .property-detail-widget-item-address-secondary {
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

  .property-detail-widget-item-pricing-text {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .property-detail-widget-item-beds-text {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .property-detail-widget-item-description-text {
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    max-width: 700px;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 7em;
    line-height: 1.2em;
  }

  .property-detail-widget-item-icon-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .property-detail-widget-item-icon {
    margin-right: 0.33em;
  }

  .property-detail-widget-item-icon:last-child {
    margin-left: 1em;
  }

  .property-detail-widget-light-box-container {
    width: 1000px;
  }

  .back-link {
    display: block;
    padding-bottom: 1em;
  }
</style>

<div />
{#if loading}
  <Loader />
{:else if !loading && error}
  <a data-testid="btn-back" class="back-link {secondaryHeading}" href="/">Back to results</a>
  <div class={primaryHeading}>No Property Found</div>
{:else}
  <div class="property-detail-widget-item" data-testid="select-property-detail-widget">
    <a data-testid="btn-back" class="back-link {secondaryHeading}" href="/">Back to results</a>
    <div class="property-detail-widget-image-container">
      {#if sellingStatus === 'underOffer'}
        <div class="property-detail-widget-offer-banner {offerBanner}">Under Offer</div>
      {/if}
      {#if lettingStatus === 'underOffer'}
        <div class="property-detail-widget-offer-banner {offerBanner}">Let Agreed</div>
      {/if}

      {#if !transformedPropertyImages || transformedPropertyImages.length === 0}
        <img alt="property-detail-widget" src={INVALID_BACKGROUND_AS_BASE64} on:error={handleImageError} />
      {:else}
        <div class="property-detail-widget-light-box-container">
          <LightBox images={transformedPropertyImages} />
        </div>
      {/if}
    </div>
    <div>
      <div class="{secondaryStrapline} property-detail-widget-item-address-secondary">
        <div class="{secondaryHeading} property-detail-widget-item-address-primary">
          {(property && property.address && property.address.line1) || ''}
        </div>
        {property && combineAddress(property.address)}
      </div>
    </div>
    <div class="{primaryHeading} property-detail-widget-item-pricing-text">{getPrice(property, searchType)}</div>
    <div class="{secondaryStrapline} property-detail-widget-item-beds-text">{combineNumberBedTypeStyle(property)}</div>
    <div class="{bodyText} property-detail-widget-item-description-text">{property.description}</div>
    <div class="{secondaryHeading} property-detail-widget-item-icon-container">
      <div>
        <span class="property-detail-widget-item-icon">
          <Fa icon={faBed} />
        </span>
        {property.bedrooms || 0}
        <span class="property-detail-widget-item-icon">
          <Fa icon={faToilet} />
        </span>
        {property.bathrooms || 0}
      </div>
    </div>
    <div id="appointment-bookings-viewing" />
  </div>
{/if}
