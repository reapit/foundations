<script>
  import ClickOutSide from '../../../common/components/click-out-side.svelte'
  export let isModalOpen
  export let toggleModal
  export let title = 'Modal Title'
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
  @media only screen and (min-width: 48rem) {
    .reapit-modal-wrapper .reapit-modal {
      top: 50%;
      left: 50%;
      width: auto;
      height: auto;
      transform: translate(-50%, -50%);
      border-radius: 0.25em;
      overflow: hidden;
      max-width: 80%;
      position: fixed;
    }
  }

  .reapit-modal {
    position: fixed;
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

  .reapit-modal-wrapper .modal-title {
    font-weight: 600;
    border-bottom: 1px solid #ddd;
    margin: 0;
    text-align: center;
    font-size: 1em;
    padding: 1em 3em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .reapit-modal-wrapper .modal-close {
    position: absolute;
    top: 0;
    left: 0;
    padding: 1em 1.2em;
    cursor: pointer;
  }
  .reapit-modal-wrapper .modal-close:hover {
    background: #ddd;
  }

  .reapit-modal-wrapper .modal-close-btn {
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
    border: solid black;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 4px;
    cursor: pointer;
  }
</style>

{#if isModalOpen}
  <div class="reapit-modal-wrapper">
    <ClickOutSide on:click-out-side={toggleModal}>
      <div class="reapit-modal">
        <div class="modal-close" on:click={toggleModal}>
          <i class="modal-close-btn" />
        </div>
        <h3 class="modal-title" {title}>{title}</h3>
        <div class="modal-content">
          <slot />
        </div>
      </div>
    </ClickOutSide>
  </div>
{/if}
