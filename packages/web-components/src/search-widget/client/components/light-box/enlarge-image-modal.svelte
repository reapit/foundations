<script>
  import Modal from '../../../../common/components/modal.svelte'
  import Fa from 'svelte-fa'
  import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

  export let currentDisplayImageIndex
  export let imageQuantity
  export let currentDisplayImage
  export let isModalOpen
  export let toggleModal
  export let widgetNextButton
  export let widgetPrevButton

  let screenWidth
  let screenHeight
</script>

<style>
  .light-box-enlarge-image-modal {
    position: relative;
    z-index: 2;
  }

  .light-box-widget-next-button {
    right: 0px;
  }

  .light-box-enlarge-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  div.light-box-widget-container.light-box-widget-container {
    display: flex;
    justify-content: center;
  }
</style>

<Modal {toggleModal} {isModalOpen}>
  <div style="width: {screenWidth * 0.8}px; height: {screenHeight * 0.8}px" class="light-box-enlarge-image-modal">

    <img class="light-box-enlarge-image" alt="Current carousel display image" src={currentDisplayImage} />
    <div class="light-box-widget-container">
      <div>
        <button class="light-box-widget-prev-button" on:click={widgetPrevButton}>
          <Fa icon={faChevronLeft} />
        </button>
        <span data-testid="light-box-widget-item-quantity">{currentDisplayImageIndex + 1} of {imageQuantity}</span>
        <button class="light-box-widget-next-button" on:click={widgetNextButton}>
          <Fa icon={faChevronRight} />
        </button>
      </div>

    </div>
  </div>
</Modal>

<svelte:window bind:innerWidth={screenWidth} bind:innerHeight={screenHeight} />
