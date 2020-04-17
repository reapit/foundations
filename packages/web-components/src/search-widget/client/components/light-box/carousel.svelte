<script>
  import { createEventDispatcher } from 'svelte'
  import Fa from 'svelte-fa'
  import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

  export let images
  export let currentDisplayImageIndex
  export let displayItemQuantity

  let currentCarouselPage = 0

  $: maxCarouselPage = Math.floor(images.length / displayItemQuantity)
  $: carouselTranslateOffset = -imageSize * (currentCarouselPage * displayItemQuantity)
  $: imageSize = containerWidth / displayItemQuantity

  /*
    -1 because we are using based zero number
  */
  const onCarouselSlideNext = () => {
    // if reach at the last page and slide next -> move to page 0
    if (currentCarouselPage === maxCarouselPage - 1) {
      currentCarouselPage = 0
      // set the begin item of the next page
      dispatch('image-click', currentCarouselPage * displayItemQuantity)
      return
    }

    currentCarouselPage++
    dispatch('image-click', currentCarouselPage * displayItemQuantity)
  }

  const onCarouselSlidePrev = () => {
    if (currentCarouselPage === 0) {
      currentCarouselPage = maxCarouselPage - 1
      dispatch('image-click', currentCarouselPage * displayItemQuantity)
      return
    }
    currentCarouselPage--
    dispatch('image-click', currentCarouselPage * displayItemQuantity)
  }

  const dispatch = createEventDispatcher()

  let containerWidth

  const onImageClick = i => {
    dispatch('image-click', i)
  }
</script>

<style>
  .light-box-carousel-container {
    overflow: hidden;
    position: relative;
  }

  .light-box-carousel-slider {
    display: flex;
    transition: transform 0.5s;
  }

  .light-box-carousel-image-container {
    padding-left: 5px;
    padding-right: 5px;
    box-sizing: border-box;
    height: 200px;
    width: 200px;
    min-width: 200px;
  }

  .light-box-carousel-image {
    cursor: pointer;
    width: 100%;
    height: 100%;
  }

  .light-box-carousel-prev-button,
  .light-box-carousel-next-button {
    position: absolute;
    color: white;
    height: 100%;
    padding: 15px;
    background: #00000040;
    border: 0;
    top: 0;
    cursor: pointer;
  }

  .light-box-carousel-next-button {
    right: 0px;
  }

  .light-box-carousel-current-display-image {
    border: 2px solid #000000;
    box-sizing: border-box;
  }
</style>

<slot {currentCarouselPage} {maxCarouselPage} {currentDisplayImageIndex} {onCarouselSlideNext} {onCarouselSlidePrev} />

<div class="light-box-carousel-container" bind:clientWidth={containerWidth}>
  <div class="light-box-carousel-slider" style="transform: translateX({carouselTranslateOffset}px);">
    {#each images as image, imageIndex}
      <div class="light-box-carousel-image-container" style="width: {imageSize}px; height: {imageSize}px">
        <img
          alt="image of property {imageIndex}"
          src={image}
          on:click={() => onImageClick(imageIndex)}
          class="light-box-carousel-image {imageIndex === currentDisplayImageIndex && 'light-box-carousel-current-display-image'}" />
      </div>
    {/each}
  </div>
  <button class="light-box-carousel-prev-button" on:click={onCarouselSlidePrev}>
    <Fa icon={faChevronLeft} />
  </button>
  <button class="light-box-carousel-next-button" on:click={onCarouselSlideNext}>
    <Fa icon={faChevronRight} />
  </button>
</div>
