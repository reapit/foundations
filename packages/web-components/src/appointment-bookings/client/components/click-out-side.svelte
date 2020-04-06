<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte'

  let containerElement

  const dispatch = createEventDispatcher()

  const onClick = event => {
    if (!containerElement.contains(event.target)) {
      dispatch('click-out-side')
    }
  }

  onMount(() => {
    document.addEventListener('click', onClick)
  })

  onDestroy(() => {
    document.removeEventListener('click', onClick)
  })
</script>

<div bind:this={containerElement}>
  <slot />
</div>
