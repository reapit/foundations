<script>
  import Fa from 'svelte-fa'
  import {
    faChevronLeft,
    faChevronRight,
    faSearchPlus,
    faPlayCircle,
    faPauseCircle,
  } from '@fortawesome/free-solid-svg-icons'
  import EnlargeImageModal from './enlarge-image-modal.svelte'

  export let currentDisplayImage
  export let maxCarouselPage
  export let displayItemQuantity
  export let currentCarouselPage
  export let setDisplayImageIndex
  export let currentDisplayImageIndex
  export let imageQuantity
  export let autoPlayInterval = 2000

  let intervalId
  let autoPlay = false
  let isOpenEnlargeImageModal = false

  const toggleEnlargeImageModal = () => {
    isOpenEnlargeImageModal = !isOpenEnlargeImageModal
  }

  const toggleCarouselAutoPlay = () => {
    autoPlay = !autoPlay
  }

  $: {
    if (autoPlay) {
      intervalId = setInterval(widgetNextButton, autoPlayInterval)
    } else {
      clearInterval(intervalId)
    }
  }

  let maxCurrentDisplayImageIndexOfCurrentCarousePage

  $: minCurrentDisplayImageIndexOfCurrentCarousePage = displayItemQuantity * currentCarouselPage
  $: indexOfLastImageInTheCarousel = imageQuantity - 1

  $: {
    maxCurrentDisplayImageIndexOfCurrentCarousePage =
      /*
      -1 because zero based number
    */
      minCurrentDisplayImageIndexOfCurrentCarousePage + displayItemQuantity - 1

    if (maxCurrentDisplayImageIndexOfCurrentCarousePage > imageQuantity - 1) {
      maxCurrentDisplayImageIndexOfCurrentCarousePage = imageQuantity - 1
    }
  }

  export let onCarouselSlideNext
  export let onCarouselSlidePrev

  const widgetPrevButton = () => {
    const currentDisplayImageIndexAfterMovePrev = currentDisplayImageIndex - 1
    if (currentDisplayImageIndexAfterMovePrev >= minCurrentDisplayImageIndexOfCurrentCarousePage) {
      setDisplayImageIndex({
        detail: currentDisplayImageIndexAfterMovePrev,
      })
      return
    }

    // If move to the prev image and
    // Smaller than minCurrentDisplayImageIndexOfCurrentCarousePage (touch the left edge)
    // -> proceed to slide the carousel backward
    // And set currentDisplayImageIndex to the first display item (image) on the carousel
    // For page 0, when move to the prev image -> move to the last page
    if (currentCarouselPage === 0) {
      setDisplayImageIndex({
        detail: indexOfLastImageInTheCarousel,
      })
    } else {
      setDisplayImageIndex({
        detail: currentDisplayImageIndexAfterMovePrev,
      })
    }

    onCarouselSlidePrev()
  }

  const widgetNextButton = () => {
    const currentDisplayImageIndexAfterMoveNext = currentDisplayImageIndex + 1
    if (currentDisplayImageIndexAfterMoveNext <= maxCurrentDisplayImageIndexOfCurrentCarousePage) {
      setDisplayImageIndex({
        detail: currentDisplayImageIndexAfterMoveNext,
      })
      return
    }

    // If move to the next image and
    // touch the right edge
    // -> proceed to slide the carousel backward
    // And set currentDisplayImageIndex to the first display item (image) on the carousel
    // -1 because zero based number
    // For the last page, when move to the next iamge -> move to page 0
    if (currentCarouselPage === maxCarouselPage - 1) {
      setDisplayImageIndex({
        detail: 0,
      })
    } else {
      setDisplayImageIndex({
        detail: currentDisplayImageIndexAfterMoveNext,
      })
    }
    onCarouselSlideNext()
  }
</script>

<style>
  :global(div.light-box-widget-container.light-box-widget-container) {
    background: #00000045;
    display: flex;
    color: white;

    margin-top: -2.5em;
    margin-bottom: 15px;
    z-index: 0;
    position: relative;
    justify-content: space-between;
    padding: 10px;
  }

  :global(.light-box-widget-container button) {
    border: 0;
    appearance: none;
    background: transparent;
    color: white;
    cursor: pointer;
  }

  .light-box-enlarge-image-button {
    margin-right: 20px;
  }
</style>

<EnlargeImageModal
  {widgetNextButton}
  {widgetPrevButton}
  {currentDisplayImage}
  {imageQuantity}
  {currentDisplayImageIndex}
  toggleModal={toggleEnlargeImageModal}
  isModalOpen={isOpenEnlargeImageModal} />
<div class="light-box-widget-container">
  <div class="light-box-widget-left-section">
    <button on:click={toggleCarouselAutoPlay}>
      {#if !autoPlay}
        <Fa icon={faPlayCircle} />
        Start slideshow
      {:else}
        <Fa icon={faPauseCircle} />
        Stop slideshow
      {/if}
    </button>
  </div>
  <div>
    <button class="light-box-widget-prev-button" on:click={widgetPrevButton}>
      <Fa icon={faChevronLeft} />
    </button>
    <span data-testid="light-box-widget-item-quantity">{currentDisplayImageIndex + 1} of {imageQuantity}</span>
    <button class="light-box-widget-next-button" on:click={widgetNextButton}>
      <Fa icon={faChevronRight} />
    </button>
  </div>
  <div class="light-box-widget-right-section">
    <button class="light-box-enlarge-image-button" on:click={toggleEnlargeImageModal}>
      <Fa icon={faSearchPlus} />
      Enlarge
    </button>
    <span>Picture No.{currentDisplayImageIndex}</span>
  </div>

</div>
