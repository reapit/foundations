<script>
  import { onMount, onDestroy } from 'svelte'
  import Loader from './loader.svelte'

  export let title = 'Modal Title'
  export let isOpen = false
  export let isLoading = false
  export let closeModal = () => {}
  export let className

  let contentEle

  function onClickOutside(evt) {
    if (!contentEle.contains(evt.target)) {
      evt.stopPropagation()
      closeModal()
    }
  }

  onMount(() => {
    document.addEventListener('click', onClickOutside, true)
  })
  onDestroy(() => {
    document.removeEventListener('click', onClickOutside)
  })
</script>

<style>
  @media only screen and (min-width: 48em) {
    .booking-viewing-modal {
      top: 50% !important;
      left: 50% !important;
      width: auto !important;
      height: auto !important;
      transform: translate(-50%, -50%);
      border-radius: 4px;
      overflow: hidden;
      max-width: 80%;
    }
  }

  .booking-viewing-modal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    min-width: 50%;
    font-size: 16px;
    background: #ffffff;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    overflow: hidden;
  }

  .booking-viewing-modal .modal-title {
    font-weight: 600;
    border-bottom: 1px solid #ddd;
    margin: 0;
    text-align: center;
    font-size: 1em;
    padding: 1em 50px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .booking-viewing-modal-overlay {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.2);
  }

  .booking-viewing-modal .modal-close {
    position: absolute;
    top: 0;
    left: 0;
    padding: 1em 1.2em;
    cursor: pointer;
  }
  .booking-viewing-modal .modal-close:hover {
    background: #ddd;
  }

  .booking-viewing-modal .modal-close-btn {
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
    border: solid black;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 4px;
    cursor: pointer;
  }
</style>

{#if isOpen}
  <div class="{className} booking-viewing-modal-overlay">
    <div class="booking-viewing-modal" bind:this={contentEle}>
      <div class="modal-close" on:click={closeModal}>
        <i class="modal-close-btn" />
      </div>

      <h3 class="modal-title" {title}>{title}</h3>
      <div class="modal-content">
        {#if isLoading}
          <Loader />
        {:else}
          <slot />
        {/if}
      </div>
    </div>
  </div>
{/if}
