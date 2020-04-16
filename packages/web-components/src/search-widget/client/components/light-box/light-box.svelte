<script>
  import Carousel from './Carousel.svelte'
  import Widget from './Widget.svelte'

  export let displayItemQuantity = 5
  export let images

  let currentDisplayImageIndex = 0

  const setDisplayImageIndex = e => {
    currentDisplayImageIndex = e.detail
  }
</script>

<style>
  .light-box-container {
    width: 100%;
    position: relative;
  }

  .light-box-current-display-image {
    width: 100%;
    height: 400px;
    object-fit: fill;
  }

  .light-box-current-display-image-container {
    position: relative;
  }
</style>

<div class="light-box-container">
  <div class="light-box-current-display-image-container">
    <img
      class="light-box-current-display-image"
      alt="Light box current display image"
      src={images[currentDisplayImageIndex]} />
  </div>
  <Carousel
    let:currentCarouselPage
    let:onCarouselSlideNext
    let:onCarouselSlidePrev
    let:maxCarouselPage
    {displayItemQuantity}
    {currentDisplayImageIndex}
    on:image-click={setDisplayImageIndex}
    {images}>
    <Widget
      currentDisplayImage={images[currentDisplayImageIndex]}
      {maxCarouselPage}
      {displayItemQuantity}
      imageQuantity={images.length}
      {currentDisplayImageIndex}
      {setDisplayImageIndex}
      {onCarouselSlideNext}
      {onCarouselSlidePrev}
      {currentCarouselPage} />
  </Carousel>
</div>
