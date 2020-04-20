<script>
  import ClickOutSide from './click-out-side.svelte'
  export let isModalOpen
  export let toggleModal
</script>

<style>
  .reapit-modal-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #00000052;
    z-index: 1;
  }
</style>

{#if isModalOpen}
  <div class="reapit-modal-wrapper">
    <ClickOutSide on:click-out-side={toggleModal}>
      <slot />
    </ClickOutSide>
  </div>
{/if}
